"use client";

import { useEffect, useRef, useState } from "react";
import { useReservationStatusReducer } from "../reducer/reservations.reducer";
import { RESERVATION_STATUS_ACTIONS as A } from "../reducer/reservations.reducer.constants";
import { RESERVATION_STATUS as S } from "../constants/reservation-statuses";
import type { ReservationStatus } from "../domain/reservation";
import type { ReservationStatusFooterProps } from "../components/status/ReservationStatusFooter/ReservationStatusFooter.interface";

export function useReservationStatusFooter({
  reservationId,
  currentSavedStatus,
  originalCancellationReason,
  onRequestClose,
  onRegisterClose,
  onSave,
}: ReservationStatusFooterProps) {
  const { state, dispatch } = useReservationStatusReducer(
    originalCancellationReason,
  );
  const [isSaveConfirmDialogOpen, setIsSaveConfirmDialogOpen] = useState(false);
  const [isUnsavedChangesModalOpen, setIsUnsavedChangesModalOpen] =
    useState(false);

  const currentStatus: ReservationStatus =
    state.pendingStatus ?? currentSavedStatus;
  const hasPendingChanges = state.pendingStatus !== null;
  const isAlreadySaved =
    currentSavedStatus === S.CANCELLED && state.pendingStatus === null;
  const showCancellationField = currentStatus === S.CANCELLED;
  const cancellationFieldIsReadOnly = isAlreadySaved;
  const isSaveDisabled =
    !hasPendingChanges ||
    (state.pendingStatus === S.CANCELLED && !state.cancellationReason.trim());

  const guardedCloseRef = useRef<() => void>(() => {});
  guardedCloseRef.current = () => {
    if (hasPendingChanges) {
      setIsUnsavedChangesModalOpen(true);
    } else {
      onRequestClose();
    }
  };

  useEffect(() => {
    const stableClose = () => guardedCloseRef.current();
    return onRegisterClose(reservationId, stableClose);
  }, [onRegisterClose, reservationId]);

  const handleApprove = () => {
    dispatch({ type: A.SELECT_STATUS, payload: S.APPROVED });
  };

  const handleCancelReservation = () => {
    dispatch({ type: A.SELECT_STATUS, payload: S.CANCELLED });
  };

  const handleComplete = () => {
    dispatch({ type: A.SELECT_STATUS, payload: S.COMPLETED });
  };

  const handleRevertChanges = () => {
    dispatch({
      type: A.REVERT_CHANGES,
      payload: { originalCancellationReason },
    });
    setIsSaveConfirmDialogOpen(false);
    setIsUnsavedChangesModalOpen(false);
  };

  const handleOpenSaveDialog = () => {
    setIsSaveConfirmDialogOpen(true);
  };

  const handleCloseSaveDialog = () => {
    setIsSaveConfirmDialogOpen(false);
  };

  const handleCloseUnsavedChangesModal = () => {
    setIsUnsavedChangesModalOpen(false);
  };

  const handleReasonChange = (value: string) => {
    dispatch({ type: A.UPDATE_CANCELLATION_REASON, payload: value });
  };

  const handleConfirmSave = () => {
    const statusToSave = state.pendingStatus;
    const reasonToSave = state.cancellationReason;
    dispatch({ type: A.SAVE_COMMITTED });
    setIsSaveConfirmDialogOpen(false);
    if (statusToSave !== null) {
      const cancellationReason =
        statusToSave === S.CANCELLED ? reasonToSave : undefined;
      onSave?.(statusToSave, cancellationReason);
    }
  };

  return {
    currentStatus,
    cancellationReason: state.cancellationReason,
    hasPendingChanges,
    isSaveDisabled,
    showCancellationField,
    cancellationFieldIsReadOnly,
    isSaveConfirmDialogOpen,
    isUnsavedChangesModalOpen,
    handleApprove,
    handleCancelReservation,
    handleComplete,
    handleRevertChanges,
    handleOpenSaveDialog,
    handleCloseSaveDialog,
    handleCloseUnsavedChangesModal,
    handleReasonChange,
    handleConfirmSave,
  };
}
