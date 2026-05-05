import { createSupabaseServiceClient } from "@hotel/db/client";
import type { Reservation, ReservationStatus } from "../domain/reservation";
import { MS_PER_DAY } from "../constants/timing";
import { RESERVATIONS_TEXTS } from "../i18n/reservations.texts";

const ERRORS = RESERVATIONS_TEXTS.es.ERRORS;

type DbReservation = {
  id: string;
  code: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  check_in: string;
  check_out: string;
  adults: number;
  children: number;
  pets: number;
  price_per_night: number;
  total_amount: number;
  currency: string;
  status: string;
  rooms: { name: string; category: string } | null;
};

function getInitials(name: string): string {
  const parts = name.trim().split(" ");
  if (parts.length >= 2) return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  return parts[0][0].toUpperCase();
}

function computeNights(checkIn: string, checkOut: string): number {
  return Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / MS_PER_DAY);
}

function mapToReservation(row: DbReservation): Reservation {
  return {
    id: row.id,
    code: row.code,
    guest: {
      name: row.guest_name,
      email: row.guest_email,
      phone: row.guest_phone,
      initials: getInitials(row.guest_name),
    },
    room: {
      name: row.rooms?.name ?? "",
      location: "",
      category: row.rooms?.category ?? "",
    },
    guests: {
      adults: row.adults,
      ...(row.children > 0 && { children: row.children }),
      ...(row.pets > 0 && { pets: row.pets }),
    },
    checkIn: row.check_in,
    checkOut: row.check_out,
    nights: computeNights(row.check_in, row.check_out),
    pricePerNight: Number(row.price_per_night),
    totalUSD: Number(row.total_amount),
    currency: row.currency,
    status: row.status as ReservationStatus,
  };
}

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

export async function getRoomNames(): Promise<string[]> {
  const supabase = createSupabaseServiceClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase as any)
    .from("rooms")
    .select("name")
    .order("name", { ascending: true });

  if (error) throw new Error(`${ERRORS.FETCH_ROOMS}: ${error.message}`);

  return (data as { name: string }[]).map((r) => r.name);
}
