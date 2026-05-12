import type { Reservation, ReservationStatus } from "../../../domain/reservation";

export interface ReservationsTableProps {
  reservations: readonly Reservation[];
  onSaveReservationStatus?: (
    id: string,
    status: ReservationStatus,
    cancellationReason?: string,
  ) => void;
}

export interface ExpandedPanelRowProps {
  reservation: Reservation;
  isExpanded: boolean;
  onClose: () => void;
  onRegisterClose: (id: string, handler: () => void) => () => void;
  onSave?: (status: ReservationStatus, cancellationReason?: string) => void;
}
