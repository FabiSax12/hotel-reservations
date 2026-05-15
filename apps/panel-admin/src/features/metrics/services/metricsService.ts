import { createSupabaseServiceClient } from "@hotel/db/client";
import type { MetricsReservation, MetricsRoom } from "../domain/metrics.types";
import { METRICS_TEXTS } from "../i18n/metrics.texts";

const ERRORS = METRICS_TEXTS.es.ERRORS;

type DbMetricsReservation = {
  id: string;
  check_in: string;
  check_out: string;
  price_per_night: number;
  total_amount: number;
  status: string;
  room_id: string;
  rooms: { name: string } | null;
};

type DbMetricsRoom = {
  id: string;
  name: string;
  is_active: boolean;
};

function computeNights(checkIn: string, checkOut: string): number {
  const msPerDay = 86_400_000;
  return Math.max(0, Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / msPerDay));
}

function mapToMetricsReservation(row: DbMetricsReservation): MetricsReservation {
  return {
    id: row.id,
    checkIn: row.check_in,
    checkOut: row.check_out,
    nights: computeNights(row.check_in, row.check_out),
    totalAmount: Number(row.total_amount),
    status: row.status as MetricsReservation["status"],
    roomName: row.rooms?.name ?? "",
    roomId: row.room_id,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getMetricsReservations(): Promise<MetricsReservation[]> {
  const supabase = createSupabaseServiceClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase as any)
    .from("reservations")
    .select("id, check_in, check_out, price_per_night, total_amount, status, room_id, rooms(name)")
    .order("check_in", { ascending: false });

  if (error) throw new Error(`${ERRORS.FETCH_RESERVATIONS}: ${error.message}`);

  return (data as DbMetricsReservation[]).map(mapToMetricsReservation);
}

export async function getMetricsRooms(): Promise<MetricsRoom[]> {
  const supabase = createSupabaseServiceClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase as any)
    .from("rooms")
    .select("id, name, is_active")
    .order("name", { ascending: true });

  if (error) throw new Error(`${ERRORS.FETCH_ROOMS}: ${error.message}`);

  return (data as DbMetricsRoom[]).map((r) => ({
    id: r.id,
    name: r.name,
    isActive: r.is_active,
  }));
}
