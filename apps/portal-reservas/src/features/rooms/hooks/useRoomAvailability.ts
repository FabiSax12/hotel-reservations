/**
 * @file useRoomAvailability.ts — Mock availability resolver for a single room.
 *
 * Simulates the asynchronous DB check that will replace it in future iterations.
 * Returns `{ isAvailable, isLoading, error }` given a room ID and the current
 * search dates from RoomsContext.
 *
 * Availability logic: a room is considered available for a date range if its
 * `availableDates` array contains the requested checkIn date.
 * (Simplified mock — real implementation would check the full range.)
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
  availableDates: string[],
): RoomAvailabilityResult {
  const [isAvailable, setIsAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Track the previous checkIn to avoid re-triggering when nothing changed
  const prevCheckInRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (!checkIn || prevCheckInRef.current === checkIn) return;
    prevCheckInRef.current = checkIn;

    setIsLoading(true);
    setError(null);

    const timeout = setTimeout(() => {
      try {
        const available = availableDates.includes(checkIn);
        setIsAvailable(available);
        setIsLoading(false);
      } catch {
        setError("No se pudo verificar la disponibilidad. Intenta de nuevo.");
        setIsLoading(false);
      }
    }, ROOM_MOCK.AVAILABILITY_DELAY_MS);

    return () => clearTimeout(timeout);
  }, [roomId, checkIn, availableDates]);

  return { isAvailable, isLoading, error };
}
