/**
 * @file reservation.server.ts — Persist a checkout to the reservations table.
 *
 * Server-only. The `reservations` table is RLS-protected (no public policy), so
 * the guest checkout writes with the service-role client. One row is inserted
 * per room (a package becomes N rows), stored as pending until an admin or a
 * future payment webhook approves it (US-DM-07).
 */

import { DB_COLUMNS, DB_TABLES } from "@hotel/db";
import { createSupabaseServiceClient } from "@hotel/db/client";
import type { Room } from "@/features/rooms";
import { CHECKOUT_API_ERROR, RESERVATION_PERSIST } from "../constants/checkout.constants";
import { computeNights } from "../domain/reservation";

export interface PersistReservationInput {
  rooms: Room[];
  checkIn: string;
  checkOut: string;
  guests: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
}

/** Inserts one reservation row per room. Throws on failure (no silent nulls). */
export async function persistReservation(input: PersistReservationInput): Promise<void> {
  const supabase = createSupabaseServiceClient();
  const nights = computeNights(input.checkIn, input.checkOut);

  const rows = input.rooms.map((room) => ({
    [DB_COLUMNS.reservations.guest_name]: input.guestName,
    [DB_COLUMNS.reservations.guest_email]: input.guestEmail,
    [DB_COLUMNS.reservations.guest_phone]: input.guestPhone,
    [DB_COLUMNS.reservations.room_id]: room.id,
    [DB_COLUMNS.reservations.check_in]: input.checkIn,
    [DB_COLUMNS.reservations.check_out]: input.checkOut,
    [DB_COLUMNS.reservations.adults]: input.guests,
    [DB_COLUMNS.reservations.children]: RESERVATION_PERSIST.CHILDREN,
    [DB_COLUMNS.reservations.price_per_night]: room.price,
    [DB_COLUMNS.reservations.total_amount]: room.price * nights,
    [DB_COLUMNS.reservations.status]: RESERVATION_PERSIST.STATUS,
  }));

  const { error } = await supabase.from(DB_TABLES.RESERVATIONS).insert(rows);
  if (error) throw new Error(`${CHECKOUT_API_ERROR.PERSIST}: ${error.message}`);
}
