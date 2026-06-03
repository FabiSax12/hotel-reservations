import { DB_COLUMNS, DB_TABLES } from "@hotel/db";
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
  const supabase = createSupabaseServiceClient();

  const updateData: ReservationStatusUpdate = {
    status,
    updated_at: new Date().toISOString(),
    ...(status === RESERVATION_STATUS.CANCELLED && cancellationReason
      ? { cancellation_reason: cancellationReason }
      : {}),
  };

  const { error } = await supabase
    .from(DB_TABLES.RESERVATIONS)
    .update(updateData)
    .eq(DB_COLUMNS.reservations.id, id);

  if (error) throw new Error(`${ERRORS.UPDATE_STATUS}: ${error.message}`);
}

export async function getReservationById(id: string): Promise<Reservation | null> {
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
