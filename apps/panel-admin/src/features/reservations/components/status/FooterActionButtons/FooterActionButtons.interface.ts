import type { ReservationStatus } from "../../../domain/reservation";

export interface FooterActionButtonsProps {
  currentStatus: ReservationStatus;
  onApprove: () => void;
  onCancelReservation: () => void;
  onComplete: () => void;
}
