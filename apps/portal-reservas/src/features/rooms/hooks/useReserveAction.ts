/**
 * @file useReserveAction.ts — Navigates from a reserve CTA to the /reservar flow.
 *
 * Replaces the former mock "reserving" delay: clicking reserve now builds the
 * reservation link from the current search dates + guests and routes to the
 * confirmation page. Uses a transition so the button can show a pending state
 * while the navigation is in flight.
 */

"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { buildReservationHref } from "@/lib/reservationUrl";
import { useRoomsContext } from "../context/RoomsContext";
import type { Room } from "../domain/types";

export interface ReserveAction {
  /** Routes to the confirmation page for the given rooms (1 = room, N = package). */
  reserve: (rooms: Room[]) => void;
  /** True while the navigation transition is pending. */
  isReserving: boolean;
}

export function useReserveAction(): ReserveAction {
  const router = useRouter();
  const { searchDates, guestCount } = useRoomsContext();
  const [isReserving, startReserving] = useTransition();

  const reserve = (rooms: Room[]) => {
    if (!searchDates || rooms.length === 0) return;
    const href = buildReservationHref({
      roomIds: rooms.map((room) => room.id),
      checkIn: searchDates.checkIn,
      checkOut: searchDates.checkOut,
      guests: guestCount,
    });
    startReserving(() => router.push(href));
  };

  return { reserve, isReserving };
}
