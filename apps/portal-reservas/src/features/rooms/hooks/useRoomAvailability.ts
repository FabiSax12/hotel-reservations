/**
 * @file useRoomAvailability.ts — Mock availability resolver for a room.
 *
 * Simulates the asynchronous DB check that will replace it in future iterations.
 * While both dates are set it reports `isLoading` for a fixed delay, then
 * resolves as available so the user can always reserve with mock data. The
 * timer is fully restarted on every date change (with cleanup), so the loading
 * state can never get stranded. A real implementation will key this on the room.
 */

"use client";

import { useEffect, useState } from "react";
import { ROOM_MOCK } from "../constants/rooms.constants";

export interface RoomAvailabilityResult {
  isAvailable: boolean;
  isLoading: boolean;
}

/**
 * Resolves mock availability for the selected stay dates.
 *
 * @param checkIn - ISO check-in date; when empty the check stays idle.
 * @param checkOut - ISO check-out date; when empty the check stays idle.
 */
export function useRoomAvailability(
  checkIn: string | undefined,
  checkOut: string | undefined,
): RoomAvailabilityResult {
  const [isAvailable, setIsAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!checkIn || !checkOut) {
      setIsLoading(false);
      setIsAvailable(false);
      return;
    }

    setIsLoading(true);
    setIsAvailable(false);
    const timeout = setTimeout(() => {
      setIsAvailable(true);
      setIsLoading(false);
    }, ROOM_MOCK.AVAILABILITY_DELAY_MS);

    return () => clearTimeout(timeout);
  }, [checkIn, checkOut]);

  return { isAvailable, isLoading };
}
