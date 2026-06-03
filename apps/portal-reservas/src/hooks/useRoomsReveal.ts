/**
 * @file useRoomsReveal.ts — Defers the room list while the hero calendar or a
 * data refresh is active.
 *
 * Scrolls to the top immediately so the user sees the calendar / loading state,
 * then hides the rooms once the calendar's entrance animation has finished to
 * avoid a flash underneath. Returns whether the room list should be hidden.
 */

"use client";

import { useEffect, useState } from "react";
import { ROOMS_REVEAL } from "../constants/rooms-reveal.constants";

export function useRoomsReveal(heroCalendarActive: boolean, isSearchingData: boolean): boolean {
  const [roomsHidden, setRoomsHidden] = useState(false);

  useEffect(() => {
    if (heroCalendarActive || isSearchingData) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      const timer = setTimeout(() => setRoomsHidden(true), ROOMS_REVEAL.HIDE_DELAY_MS);
      return () => clearTimeout(timer);
    }
    setRoomsHidden(false);
  }, [heroCalendarActive, isSearchingData]);

  return roomsHidden;
}
