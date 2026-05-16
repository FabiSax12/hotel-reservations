"use client";

import { useState } from "react";
import { useI18n } from "@/locales";
import { useReservationStatusReducer } from "../reducer/reservations.reducer";
import { useGuardedClose } from "./useGuardedClose";
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
  onPendingChangesChange,
}: ReservationStatusFooterProps) {
  const { t } = useI18n();
  const { state, dispatch } = useReservationStatusReducer(originalCancellationReason);
  const [isSaveConfirmDialogOpen, setIsSaveConfirmDialogOpen] = useState(false);
  const [isUnsavedChangesModalOpen, setIsUnsavedChangesModalOpen] = useState(false);

  const currentStatus: ReservationStatus = state.pendingStatus ?? currentSavedStatus;
  const hasPendingChanges = state.pendingStatus !== null;
  const isAlreadySaved = currentSavedStatus === S.CANCELLED && state.pendingStatus === null;
  const showCancellationField = currentStatus === S.CANCELLED;
  const cancellationFieldIsReadOnly = isAlreadySaved;
  const isSaveDisabled =
    !hasPendingChanges ||
    (state.pendingStatus === S.CANCELLED && !state.cancellationReason.trim());

  useGuardedClose({
    reservationId,
    hasPendingChanges,
    onRequestClose,
    onRegisterClose,
    onPendingChangesChange,
    openUnsavedChangesModal: () => setIsUnsavedChangesModalOpen(true),
  });

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
    dispatch({ type: A.REVERT_CHANGES, payload: { originalCancellationReason } });
    setIsSaveConfirmDialogOpen(false);
    setIsUnsavedChangesModalOpen(false);
  };

  const handleOpenSaveDialog = () => setIsSaveConfirmDialogOpen(true);
  const handleCloseSaveDialog = () => setIsSaveConfirmDialogOpen(false);
  const handleCloseUnsavedChangesModal = () => setIsUnsavedChangesModalOpen(false);

  const handleReasonChange = (value: string) => {
    dispatch({ type: A.UPDATE_CANCELLATION_REASON, payload: value });
  };

  const handleConfirmSave = () => {
    const statusToSave = state.pendingStatus;
    const reasonToSave = state.cancellationReason;
    dispatch({ type: A.SAVE_COMMITTED });
    setIsSaveConfirmDialogOpen(false);
    if (statusToSave !== null) {
      // TODO: implementar comunicacion con la pasarela de pagos
      if (currentSavedStatus === S.PENDING && statusToSave === S.APPROVED) {
        console.log(
          `${t.RESERVATIONS.STATUS_MANAGEMENT.LOG_PAYMENT_PROCESSED} ${reservationId}.`,
        );
      }
      const cancellationReason = statusToSave === S.CANCELLED ? reasonToSave : undefined;
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
