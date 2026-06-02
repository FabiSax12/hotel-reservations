/**
 * @file reservation.ts — Pure reservation math + confirmation codes.
 *
 * Deterministic, side-effect free. The stay total mirrors the room cards:
 * sum of nightly room prices times the number of nights.
 */

import type { Room } from "@/features/rooms";
import type { ParsedReservationParams } from "@/lib/reservationUrl";
import { CONFIRMATION_CODE, STAY } from "../constants/checkout.constants";
import type { ReservationDraft } from "./types";

/** Number of nights between two ISO dates (minimum 1). */
export function computeNights(checkIn: string, checkOut: string): number {
  const start = new Date(`${checkIn}T00:00:00`).getTime();
  const end = new Date(`${checkOut}T00:00:00`).getTime();
  const nights = Math.round((end - start) / STAY.MS_PER_DAY);
  return nights > 0 ? nights : 1;
}

/** Total stay price: combined nightly room prices times the night count. */
export function computeStayTotal(rooms: Room[], nights: number): number {
  const perNight = rooms.reduce((sum, room) => sum + room.price, 0);
  return perNight * nights;
}

/** Assembles a confirmed-ready reservation draft from resolved rooms + params. */
export function buildReservationDraft(
  rooms: Room[],
  parsed: ParsedReservationParams,
): ReservationDraft {
  const nights = computeNights(parsed.checkIn, parsed.checkOut);
  return {
    rooms,
    isPackage: rooms.length > 1,
    checkIn: parsed.checkIn,
    checkOut: parsed.checkOut,
    guests: parsed.guests,
    nights,
    total: computeStayTotal(rooms, nights),
  };
}

/**
 * Derives a stable, human-readable booking reference from a gateway session ID.
 * Deterministic (no randomness) so the same session always yields the same code.
 */
export function generateConfirmationCode(sessionId: string): string {
  let hash = 0;
  for (let i = 0; i < sessionId.length; i++) {
    hash = (hash * 31 + sessionId.charCodeAt(i)) >>> 0;
  }
  const body = hash.toString(36).toUpperCase().padStart(CONFIRMATION_CODE.LENGTH, "0");
  return `${CONFIRMATION_CODE.PREFIX}${body.slice(0, CONFIRMATION_CODE.LENGTH)}`;
}
