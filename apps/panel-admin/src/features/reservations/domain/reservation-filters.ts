import type { ReservationStatus } from "./reservation";

export interface ReservationFilters {
  statuses: ReservationStatus[];
  guestName: string;
  roomName: string;
  dateFrom: string;
  dateTo: string;
}
