/**
 * @file page.tsx — Reservation confirmation route (/reserve).
 *
 * Server component: reads the reservation from the URL, resolves the rooms, and
 * composes the confirmation view. Invalid or unknown selections fall back to
 * the home page. No inline logic beyond wiring (architecture-context.md §2.3).
 */

import { redirect } from "next/navigation";
import { ROUTES } from "@/config/routes";
import { buildReservationDraft, ConfirmationView } from "@/features/checkout";
import { findRoomsByIds } from "@/features/rooms";
import { parseReservationParams } from "@/lib/reservationUrl";
import type { ReservePageProps } from "./page.interface";

export default async function ReservePage({ searchParams }: ReservePageProps) {
  const parsed = parseReservationParams(await searchParams);
  if (!parsed) {
    redirect(ROUTES.HOME);
  }

  const rooms = findRoomsByIds(parsed.roomIds);
  if (rooms.length === 0) {
    redirect(ROUTES.HOME);
  }

  return <ConfirmationView draft={buildReservationDraft(rooms, parsed)} />;
}
