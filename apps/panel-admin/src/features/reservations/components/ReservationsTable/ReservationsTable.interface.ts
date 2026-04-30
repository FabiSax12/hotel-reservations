import type { Reservation } from "../../domain/reservation";

export interface ReservationsTableProps {
  reservations: readonly Reservation[];
}

export interface ExpandedPanelRowProps {
  reservation: Reservation;
  isExpanded: boolean;
}
