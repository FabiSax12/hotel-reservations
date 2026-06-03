"use client";

import { useState } from "react";
import { useI18n } from "@/locales";
import type { ReservationStatusFooterProps } from "../components/status/ReservationStatusFooter/ReservationStatusFooter.interface";
import { RESERVATION_STATUS as CONSTANTS } from "../constants/reservation-statuses";
import type { ReservationStatus } from "../domain/reservation";
import { useReservationStatusReducer } from "../reducer/reservations.reducer";
import { RESERVATION_STATUS_ACTIONS as ACTIONS } from "../reducer/reservations.reducer.constants";
import { useGuardedClose } from "./useGuardedClose";

export function useReservationStatusFooter({
  reservationId,
  currentSavedStatus,
  originalCancellationReason,
  onRequestClose,
  onRegisterClose,
  onSave,
  onPendingChangesChange,
}: ReservationStatusFooterProps) {
  const { t } = useI18n();
  const { state, dispatch } = useReservationStatusReducer(originalCancellationReason);
  const [isSaveConfirmDialogOpen, setIsSaveConfirmDialogOpen] = useState(false);
  const [isUnsavedChangesModalOpen, setIsUnsavedChangesModalOpen] = useState(false);

  const currentStatus: ReservationStatus = state.pendingStatus ?? currentSavedStatus;
  const hasPendingChanges = state.pendingStatus !== null;
  const isAlreadySaved = currentSavedStatus === CONSTANTS.CANCELLED && state.pendingStatus === null;
  const showCancellationField = currentStatus === CONSTANTS.CANCELLED;
  const cancellationFieldIsReadOnly = isAlreadySaved;
  const isSaveDisabled =
    !hasPendingChanges ||
    (state.pendingStatus === CONSTANTS.CANCELLED && !state.cancellationReason.trim());

  useGuardedClose({
    reservationId,
    hasPendingChanges,
    onRequestClose,
    onRegisterClose,
    onPendingChangesChange,
    openUnsavedChangesModal: () => setIsUnsavedChangesModalOpen(true),
  });

  const handleApprove = () => {
    dispatch({ type: ACTIONS.SELECT_STATUS, payload: CONSTANTS.APPROVED });
  };

  const handleCancelReservation = () => {
    dispatch({ type: ACTIONS.SELECT_STATUS, payload: CONSTANTS.CANCELLED });
  };

  const handleComplete = () => {
    dispatch({ type: ACTIONS.SELECT_STATUS, payload: CONSTANTS.COMPLETED });
  };

  const handleRevertChanges = () => {
    dispatch({ type: ACTIONS.REVERT_CHANGES, payload: { originalCancellationReason } });
    setIsSaveConfirmDialogOpen(false);
    setIsUnsavedChangesModalOpen(false);
  };

  const handleOpenSaveDialog = () => setIsSaveConfirmDialogOpen(true);
  const handleCloseSaveDialog = () => setIsSaveConfirmDialogOpen(false);
  const handleCloseUnsavedChangesModal = () => setIsUnsavedChangesModalOpen(false);

  const handleReasonChange = (value: string) => {
    dispatch({ type: ACTIONS.UPDATE_CANCELLATION_REASON, payload: value });
  };

  const handleConfirmSave = () => {
    const statusToSave = state.pendingStatus;
    const reasonToSave = state.cancellationReason;
    dispatch({ type: ACTIONS.SAVE_COMMITTED });
    setIsSaveConfirmDialogOpen(false);
    if (statusToSave !== null) {
      // TODO: implementar comunicacion con la pasarela de pagos
      if (currentSavedStatus === CONSTANTS.PENDING && statusToSave === CONSTANTS.APPROVED) {
        console.log(`${t.RESERVATIONS.STATUS_MANAGEMENT.LOG_PAYMENT_PROCESSED} ${reservationId}.`);
      }
      const cancellationReason = statusToSave === CONSTANTS.CANCELLED ? reasonToSave : undefined;
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
