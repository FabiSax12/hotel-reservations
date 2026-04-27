import type { ReservationFilters } from "../domain/reservation-filters";

export const DEFAULT_FILTERS: ReservationFilters = {
  statuses: [],
  roomName: "",
  dateFrom: "",
  dateTo: "",
};
