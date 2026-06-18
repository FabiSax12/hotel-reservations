/**
 * @file useRoomAvailability.ts — Real availability check for a room (US-DM-07).
 *
 * Replaces the former mock delay. Availability is now derived synchronously from
 * the room's available dates (computed server-side from its reservations), so a
 * stay is reservable only when every night falls on a free day. No async state
 * remains — `isLoading` is kept (always false) so callers don't have to change
 * their shape, and is removed once a remote re-check is genuinely needed.
 */

"use client";

import { isStayAvailable } from "../domain/availability";

export interface RoomAvailabilityResult {
  isAvailable: boolean;
  isLoading: boolean;
}

/**
 * Resolves availability for the selected stay dates against the room's free days.
 *
 * @param checkIn - ISO check-in date; when empty the check stays idle.
 * @param checkOut - ISO check-out date; when empty the check stays idle.
 * @param availableDates - The room's available check-in days (ISO YYYY-MM-DD).
 */
export function useRoomAvailability(
  checkIn: string | undefined,
  checkOut: string | undefined,
  availableDates: readonly string[],
): RoomAvailabilityResult {
  if (!checkIn || !checkOut) {
    return { isAvailable: false, isLoading: false };
  }
  return { isAvailable: isStayAvailable(availableDates, checkIn, checkOut), isLoading: false };
}
