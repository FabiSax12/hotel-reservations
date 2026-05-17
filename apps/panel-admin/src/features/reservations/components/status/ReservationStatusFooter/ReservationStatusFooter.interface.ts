import type { ReservationStatus } from "../../../domain/reservation";

export interface ReservationStatusFooterProps {
  reservationId: string;
  currentSavedStatus: ReservationStatus;
  originalCancellationReason: string;
  onRequestClose: () => void;
  onRegisterClose: (id: string, handler: () => void) => () => void;
  onSave?: (status: ReservationStatus, cancellationReason?: string) => void;
  onPendingChangesChange?: (hasPending: boolean) => void;
}
