/**
 * @file reservationUrl.ts — Build and parse the /reservar query string.
 *
 * Pure functions shared across features: the rooms reserve CTA builds the href,
 * the checkout route reads it back. No React, no side effects.
 */

import { ROUTES } from "@/config/routes";
import { RESERVATION_PARAMS, RESERVATION_ROOMS_SEPARATOR } from "@/constants/reservation.constants";

export interface ReservationLinkInput {
  /** Room IDs to reserve (one for a single room, many for a package). */
  roomIds: string[];
  /** ISO check-in date (YYYY-MM-DD). */
  checkIn: string;
  /** ISO check-out date (YYYY-MM-DD). */
  checkOut: string;
  /** Total guest count. */
  guests: number;
}

/** Builds the `/reservar?...` href for a reservation selection. */
export function buildReservationHref(input: ReservationLinkInput): string {
  const params = new URLSearchParams({
    [RESERVATION_PARAMS.ROOMS]: input.roomIds.join(RESERVATION_ROOMS_SEPARATOR),
    [RESERVATION_PARAMS.CHECK_IN]: input.checkIn,
    [RESERVATION_PARAMS.CHECK_OUT]: input.checkOut,
    [RESERVATION_PARAMS.GUESTS]: String(input.guests),
  });
  return `${ROUTES.RESERVE}?${params.toString()}`;
}

/** Parsed, still-untrusted reservation parameters read back from the URL. */
export interface ParsedReservationParams {
  roomIds: string[];
  checkIn: string;
  checkOut: string;
  guests: number;
}

/**
 * Reads reservation parameters from a URLSearchParams-like record. Returns null
 * when the required fields are missing or malformed, so the page can redirect.
 */
export function parseReservationParams(
  source: Record<string, string | string[] | undefined>,
): ParsedReservationParams | null {
  const rawRooms = firstValue(source[RESERVATION_PARAMS.ROOMS]);
  const checkIn = firstValue(source[RESERVATION_PARAMS.CHECK_IN]);
  const checkOut = firstValue(source[RESERVATION_PARAMS.CHECK_OUT]);
  const rawGuests = firstValue(source[RESERVATION_PARAMS.GUESTS]);

  if (!rawRooms || !checkIn || !checkOut) return null;

  const roomIds = rawRooms.split(RESERVATION_ROOMS_SEPARATOR).filter(Boolean);
  if (roomIds.length === 0) return null;

  const guests = Number.parseInt(rawGuests ?? "", 10);

  return {
    roomIds,
    checkIn,
    checkOut,
    guests: Number.isFinite(guests) && guests > 0 ? guests : roomIds.length,
  };
}

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}
