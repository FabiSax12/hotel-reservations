import type { ReservationFilters } from "../domain/reservation-filters";

export const ROOM_ALL_KEY = "__ALL__" as const;

export const DEFAULT_FILTERS: ReservationFilters = {
  statuses: [],
  guestName: "",
  roomName: "",
  dateFrom: "",
  dateTo: "",
};
