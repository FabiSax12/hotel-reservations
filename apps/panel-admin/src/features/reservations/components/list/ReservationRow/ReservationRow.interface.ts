import type { Reservation } from "../../../domain/reservation";

export interface ReservationRowProps {
  reservation: Reservation;
  isExpanded: boolean;
  onToggle: () => void;
}
