import type { ReservationStatus } from "../domain/reservation";
import type { RESERVATION_STATUS_ACTIONS as A } from "./reservations.reducer.constants";

export interface ReservationStatusState {
  pendingStatus: ReservationStatus | null;
  cancellationReason: string;
}

export type ReservationStatusAction =
  | { type: typeof A.SELECT_STATUS; payload: ReservationStatus }
  | { type: typeof A.UPDATE_CANCELLATION_REASON; payload: string }
  | { type: typeof A.REVERT_CHANGES; payload: { originalCancellationReason: string } }
  | { type: typeof A.SAVE_COMMITTED };
