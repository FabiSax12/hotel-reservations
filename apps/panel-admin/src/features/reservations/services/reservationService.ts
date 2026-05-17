import { createSupabaseServiceClient } from "@hotel/db/client";
import { RESERVATION_STATUS } from "../constants/reservation-statuses";
import type { Reservation, ReservationStatus } from "../domain/reservation";
import { RESERVATIONS_TEXTS } from "../i18n/reservations.texts";
import {
  type DbReservation,
  mapToReservation,
  type ReservationStatusUpdate,
} from "./reservation.mapper";

const ERRORS = RESERVATIONS_TEXTS.es.ERRORS;

export async function getAllReservations(): Promise<Reservation[]> {
  const supabase = createSupabaseServiceClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase as any)
    .from("reservations")
    .select("*, rooms(name, category)")
    .order("created_at", { ascending: false });

  if (error) throw new Error(`${ERRORS.FETCH_RESERVATIONS}: ${error.message}`);

  return (data as DbReservation[]).map(mapToReservation);
}

export async function updateReservationStatus(
  id: string,
  status: ReservationStatus,
  cancellationReason?: string,
): Promise<void> {
  const supabase = createSupabaseServiceClient();

  const updateData: ReservationStatusUpdate = {
    status,
    updated_at: new Date().toISOString(),
    ...(status === RESERVATION_STATUS.CANCELLED && cancellationReason
      ? { cancellation_reason: cancellationReason }
      : {}),
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase as any).from("reservations").update(updateData).eq("id", id);

  if (error) throw new Error(`${ERRORS.UPDATE_STATUS}: ${error.message}`);
}

export async function getRoomNames(): Promise<string[]> {
  const supabase = createSupabaseServiceClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase as any)
    .from("rooms")
    .select("name")
    .order("name", { ascending: true });

  if (error) throw new Error(`${ERRORS.FETCH_ROOMS}: ${error.message}`);

  const names = (data as { name: string }[]).map((r) => r.name);
  return Array.from(new Set(names));
}
