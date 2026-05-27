import { FILTERED_RESULTS } from "../constants/filtered-results";
import { DEFAULT_FILTERS } from "../constants/reservation-filters";
import type { Reservation } from "../domain/reservation";
import type { ReservationFilters } from "../domain/reservation-filters";

export function filterReservations(
  reservations: readonly Reservation[],
  filters: ReservationFilters,
): readonly Reservation[] {
  return reservations.filter((r) => {
    if (filters.statuses.length > FILTERED_RESULTS.EMPTY && !filters.statuses.includes(r.status))
      return false;
    if (
      filters.guestName !== DEFAULT_FILTERS.guestName &&
      !r.guest.name.toLowerCase().includes(filters.guestName.toLowerCase())
    )
      return false;
    if (filters.roomName !== DEFAULT_FILTERS.roomName && r.room.name !== filters.roomName)
      return false;
    if (filters.dateFrom !== DEFAULT_FILTERS.dateFrom && r.checkIn < filters.dateFrom) return false;
    if (filters.dateTo !== DEFAULT_FILTERS.dateTo && r.checkIn > filters.dateTo) return false;
    return true;
  });
}
