import { AUDIT_ACTIONS, AUDIT_ENTITIES } from "@hotel/core/audit";
import { getAuditRequestContext, logAuditEvent } from "@hotel/core/audit/server";
import { getVerifiedSession } from "@hotel/core/auth";
import { createSupabaseServerClient, DB_COLUMNS, DB_TABLES } from "@hotel/db";
import { createSupabaseServiceClient } from "@hotel/db/client";
import { cookies } from "next/headers";
import { requirePermission } from "@/shared/auth/requirePermission";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { RESERVATION_STATUS } from "../constants/reservation-statuses";
import type { Reservation, ReservationStatus } from "../domain/reservation";
import {
  InvalidStatusTransitionError,
  isReservationStatus,
  isValidStatusTransition,
  ReservationNotFoundError,
} from "../domain/reservation-rules";
import { RESERVATIONS_TEXTS } from "../i18n/reservations.texts";
import {
  type DbReservation,
  mapToReservation,
  type ReservationStatusUpdate,
} from "./reservation.mapper";

const ERRORS = RESERVATIONS_TEXTS.es.ERRORS;

export async function getAllReservations(): Promise<Reservation[]> {
  await requirePermission(PERMISSIONS.RESERVATIONS.VIEW);

  const supabase = createSupabaseServiceClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await supabase
    .from(DB_TABLES.RESERVATIONS)
    .select(`*, ${DB_TABLES.ROOMS}(${DB_COLUMNS.rooms.name}, ${DB_COLUMNS.rooms.category})`) //"*, rooms(name, category)")
    .order(DB_COLUMNS.reservations.code, { ascending: false });

  if (error) throw new Error(`${ERRORS.FETCH_RESERVATIONS}: ${error.message}`);

  return (data as DbReservation[]).map(mapToReservation);
}

export async function updateReservationStatus(
  id: string,
  status: ReservationStatus,
  cancellationReason?: string,
): Promise<void> {
  await requirePermission(PERMISSIONS.RESERVATIONS.EDIT);

  // OP-R05: the Server Action receives the status from the client; check it
  // against the enum before touching the database.
  if (!isReservationStatus(status)) throw new InvalidStatusTransitionError(null, String(status));

  const supabase = createSupabaseServiceClient();

  // A3.4: read the current status first so the audit event records from → to.
  const { data: previous, error: readError } = await supabase
    .from(DB_TABLES.RESERVATIONS)
    .select(DB_COLUMNS.reservations.status)
    .eq(DB_COLUMNS.reservations.id, id)
    .maybeSingle();

  if (readError) throw new Error(`${ERRORS.UPDATE_STATUS}: ${readError.message}`);
  if (!previous) throw new ReservationNotFoundError();

  // OP-R05: enforce the state machine on the server (e.g. cancelled → approved
  // is rejected even if the request is replayed outside the UI).
  const from = (previous as { status: ReservationStatus }).status;
  if (!isValidStatusTransition(from, status)) throw new InvalidStatusTransitionError(from, status);

  const updateData: ReservationStatusUpdate = {
    status,
    updated_at: new Date().toISOString(),
    ...(status === RESERVATION_STATUS.CANCELLED && cancellationReason
      ? { cancellation_reason: cancellationReason }
      : {}),
  };

  // Compare-and-set on the status read above: if another request changed it in
  // between, no row matches and the transition is rejected instead of applied
  // on top of a state that was never validated.
  const { data: updated, error } = await supabase
    .from(DB_TABLES.RESERVATIONS)
    .update(updateData)
    .eq(DB_COLUMNS.reservations.id, id)
    .eq(DB_COLUMNS.reservations.status, from)
    .select(DB_COLUMNS.reservations.id);

  if (error) throw new Error(`${ERRORS.UPDATE_STATUS}: ${error.message}`);
  if (!updated || updated.length === 0) throw new InvalidStatusTransitionError(from, status);

  // A3.4 / OP-POC-6: audit the change with the verified admin as actor.
  const { user } = await getVerifiedSession(createSupabaseServerClient(await cookies()));
  const { ipAddress, userAgent } = await getAuditRequestContext();
  const isCancellation = status === RESERVATION_STATUS.CANCELLED;

  await logAuditEvent({
    actorId: user?.id ?? null,
    actorEmail: user?.email ?? null,
    action: isCancellation
      ? AUDIT_ACTIONS.RESERVATION_CANCELLED
      : AUDIT_ACTIONS.RESERVATION_UPDATED,
    entity: AUDIT_ENTITIES.RESERVATION,
    entityId: id,
    metadata: {
      from,
      to: status,
      ...(isCancellation && cancellationReason ? { cancellation_reason: cancellationReason } : {}),
    },
    ipAddress,
    userAgent,
  });
}

export async function getReservationById(id: string): Promise<Reservation | null> {
  await requirePermission(PERMISSIONS.RESERVATIONS.VIEW);

  const supabase = createSupabaseServiceClient();

  const { data, error } = await (supabase as any)
    .from("reservations")
    .select("*, rooms(name, category)")
    .eq("id", id)
    .single();

  if (error) return null;

  return mapToReservation(data as DbReservation);
}

export async function getRoomNames(): Promise<string[]> {
  const supabase = createSupabaseServiceClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await supabase
    .from(DB_TABLES.ROOMS)
    .select(DB_COLUMNS.rooms.name)
    .order(DB_COLUMNS.rooms.name, { ascending: true });

  if (error) throw new Error(`${ERRORS.FETCH_ROOMS}: ${error.message}`);

  const names = (data as { name: string }[]).map((r) => r.name);
  return Array.from(new Set(names));
}
