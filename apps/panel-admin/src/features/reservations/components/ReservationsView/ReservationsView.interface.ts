import type { Reservation } from "../../domain/reservation";

export interface ReservationsViewProps {
  reservations: readonly Reservation[];
}
