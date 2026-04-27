import type { ReservationStatus } from "./reservation";

export interface ReservationFilters {
  statuses: ReservationStatus[];
  roomName: string;
  dateFrom: string;
  dateTo: string;
}
