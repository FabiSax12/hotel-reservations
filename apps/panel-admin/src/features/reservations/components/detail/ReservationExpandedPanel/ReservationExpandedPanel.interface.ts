import type { Reservation, ReservationStatus } from "../../../domain/reservation";

export interface ReservationExpandedPanelProps {
  reservation: Reservation;
  isClosing?: boolean;
  onSave?: (status: ReservationStatus, cancellationReason?: string) => void;
  onRequestClose?: () => void;
  onRegisterClose?: (id: string, handler: () => void) => () => void;
}
