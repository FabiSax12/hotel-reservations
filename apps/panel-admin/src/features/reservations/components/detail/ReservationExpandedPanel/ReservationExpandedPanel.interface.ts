import type { Reservation } from "../../../domain/reservation";

export interface ReservationExpandedPanelProps {
  reservation: Reservation;
  isClosing?: boolean;
}
