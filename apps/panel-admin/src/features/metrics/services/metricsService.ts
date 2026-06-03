import { createSupabaseServiceClient, DB_COLUMNS, DB_TABLES } from "@hotel/db";
import type { MetricsReservation, MetricsRoom } from "../domain/metricsTypes";
import { METRICS_TEXTS } from "../i18n/metricsTexts";
import { MS_PER_DAY } from "../constants/metricsConfig";

const ERRORS = METRICS_TEXTS.es.ERRORS;

const RESERVATIONS = DB_COLUMNS.reservations;
const ROOMS = DB_COLUMNS.rooms;

function computeNights(checkIn: string, checkOut: string): number {
  return Math.max(
    0,
    Math.round(
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / MS_PER_DAY,
    ),
  );
}

export async function getMetricsReservations(): Promise<MetricsReservation[]> {
  const supabase = createSupabaseServiceClient();

  const { data, error } = await supabase
    .from(DB_TABLES.RESERVATIONS)
    .select(
      `${RESERVATIONS.id}, ${RESERVATIONS.check_in}, ${RESERVATIONS.check_out}, ${RESERVATIONS.price_per_night}, ${RESERVATIONS.total_amount}, ${RESERVATIONS.status}, ${RESERVATIONS.room_id}, rooms(${ROOMS.name})`,
    )
    .order(RESERVATIONS.check_in, { ascending: false });

  if (error) throw new Error(`${ERRORS.FETCH_RESERVATIONS}: ${error.message}`);

  return data.map((row) => ({
    id: row.id,
    checkIn: row.check_in,
    checkOut: row.check_out,
    nights: computeNights(row.check_in, row.check_out),
    totalAmount: Number(row.total_amount),
    status: row.status as MetricsReservation["status"],
    roomName: (row.rooms as { name: string } | null)?.name ?? "",
    roomId: row.room_id,
  }));
}

export async function getMetricsRooms(): Promise<MetricsRoom[]> {
  const supabase = createSupabaseServiceClient();

  const { data, error } = await supabase
    .from(DB_TABLES.ROOMS)
    .select(`${ROOMS.id}, ${ROOMS.name}, ${ROOMS.is_active}`)
    .order(ROOMS.name, { ascending: true });

  if (error) throw new Error(`${ERRORS.FETCH_ROOMS}: ${error.message}`);

  return data.map((r) => ({
    id: r.id,
    name: r.name,
    isActive: r.is_active,
  }));
}
