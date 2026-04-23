import type { Reservation } from "../domain/reservation";
import type { ReservationFilters } from "../domain/reservation-filters";

export function filterReservations(
  reservations: readonly Reservation[],
  filters: ReservationFilters,
): readonly Reservation[] {
  return reservations.filter((r) => {
    if (filters.statuses.length > 0 && !filters.statuses.includes(r.status)) return false;
    if (filters.roomName !== "" && r.room.name !== filters.roomName) return false;
    if (filters.dateFrom !== "" && r.checkIn < filters.dateFrom) return false;
    if (filters.dateTo !== "" && r.checkIn > filters.dateTo) return false;
    return true;
  });
}
