import { useReducer } from "react";
import { RESERVATION_STATUS_ACTIONS as A } from "./reservations.reducer.constants";
import type { ReservationStatusAction, ReservationStatusState } from "./reservations.reducer.types";

function reservationStatusReducer(
  state: ReservationStatusState,
  action: ReservationStatusAction,
): ReservationStatusState {
  switch (action.type) {
    case A.SELECT_STATUS:
      return {
        ...state,
        pendingStatus: action.payload,
        cancellationReason: "",
      };
    case A.UPDATE_CANCELLATION_REASON:
      return { ...state, cancellationReason: action.payload };
    case A.REVERT_CHANGES:
      return {
        ...state,
        pendingStatus: null,
        cancellationReason: action.payload.originalCancellationReason,
      };
    case A.SAVE_COMMITTED:
      return { ...state, pendingStatus: null };
    default:
      return state;
  }
}

function buildInitialState(originalCancellationReason: string): ReservationStatusState {
  return {
    pendingStatus: null,
    cancellationReason: originalCancellationReason,
  };
}

export function useReservationStatusReducer(originalCancellationReason: string) {
  const [state, dispatch] = useReducer(
    reservationStatusReducer,
    originalCancellationReason,
    buildInitialState,
  );
  return { state, dispatch };
}
