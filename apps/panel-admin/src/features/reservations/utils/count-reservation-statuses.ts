import type { Reservation, ReservationStatus } from "../domain/reservation";

export function countReservationStatuses(
  reservations: readonly Reservation[],
): Record<ReservationStatus, number> {
  const counts: Record<ReservationStatus, number> = {
    pending: 0,
    approved: 0,
    cancelled: 0,
    completed: 0,
  };
  for (const r of reservations) counts[r.status]++;
  return counts;
}
