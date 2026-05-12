/**
 * @file useRoomAvailability.ts — Mock availability resolver for a single room.
 *
 * Simulates the asynchronous DB check that will replace it in future iterations.
 * Returns `{ isAvailable, isLoading, error }` given a room ID and the current
 * search dates from RoomsContext.
 *
 * Availability logic: a room is considered available for a date range if its
 * `availableDates` array contains every night in the requested stay interval.
 */

"use client";

import { useState, useEffect, useRef } from "react";
import { ROOM_MOCK } from "../constants/rooms.constants";

export interface RoomAvailabilityResult {
  isAvailable: boolean;
  isLoading: boolean;
  error: string | null;
}

/**
 * Resolves mock availability for a room given its pre-computed available dates.
 *
 * @param roomId - Stable room identifier (used to key the effect).
 * @param checkIn - ISO date string from the search params (e.g. "2026-10-15").
 *   When empty or undefined, `isLoading` stays false and `isAvailable` stays false.
 * @param availableDates - The room's pre-computed available date strings.
 */
export function useRoomAvailability(
  roomId: string,
  checkIn: string | undefined,
  checkOut: string | undefined,
  availableDates: string[],
): RoomAvailabilityResult {
  const [isAvailable, setIsAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Track previous date range to avoid re-triggering when nothing changed
  const prevRangeRef = useRef<string>("");

  useEffect(() => {
    if (!checkIn || !checkOut) return;
    const nextRangeKey = `${checkIn}_${checkOut}`;
    if (prevRangeRef.current === nextRangeKey) return;
    prevRangeRef.current = nextRangeKey;

    setIsLoading(true);
    setError(null);

    const timeout = setTimeout(() => {
      try {
        const availableDateSet = new Set(availableDates);
        const stayNightDates: string[] = [];
        // Walk every night from check-in (inclusive) to check-out (exclusive)
        const cursor = new Date(`${checkIn}T00:00:00`);
        const target = new Date(`${checkOut}T00:00:00`);

        while (cursor < target) {
          stayNightDates.push(cursor.toISOString().slice(0, 10));
          cursor.setDate(cursor.getDate() + 1);
        }

        // The room is available only if EVERY night in the range exists in its availableDates
        const available = stayNightDates.every((isoDay) => availableDateSet.has(isoDay));
        setIsAvailable(available);
        setIsLoading(false);
      } catch {
        // Return an i18n key so the UI layer can translate it
        setError(ROOM_MOCK.AVAILABILITY_ERROR_KEY);
        setIsLoading(false);
      }
    }, ROOM_MOCK.AVAILABILITY_DELAY_MS);

    return () => clearTimeout(timeout);
  }, [roomId, checkIn, checkOut, availableDates]);

  return { isAvailable, isLoading, error };
}
