import type { Reservation } from "../../domain/reservation";

export interface ReservationsTableProps {
  reservations: readonly Reservation[];
}
