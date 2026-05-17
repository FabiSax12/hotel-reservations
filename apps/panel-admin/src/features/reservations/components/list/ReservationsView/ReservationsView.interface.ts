import type { Reservation } from "../../../domain/reservation";

export interface ReservationsViewProps {
  reservations: readonly Reservation[];
  rooms: readonly string[];
  initialPage?: number;
}
