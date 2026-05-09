"use client";

import { Button } from "@heroui/react";
import { Save, X } from "lucide-react";
import { useI18n } from "@/locales";
import { StatusBadge } from "../../shared/StatusBadge/StatusBadge";
import { Divider } from "../../shared/Divider/Divider";
import { FooterActionButtons } from "../FooterActionButtons/FooterActionButtons";
import { CancellationReasonField } from "../CancellationReasonModal/CancellationReasonModal";
import { SaveConfirmDialog } from "../SaveConfirmDialog/SaveConfirmDialog";
import { UnsavedChangesModal } from "../UnsavedChangesModal/UnsavedChangesModal";
import { useReservationStatusFooter } from "../../../hooks/useReservationStatusFooter";
import { RESERVATION_STATUS_FOOTER_STYLES as S } from "./ReservationStatusFooter.styles";
import type { ReservationStatusFooterProps } from "./ReservationStatusFooter.interface";

export const ReservationStatusFooter = (props: ReservationStatusFooterProps) => {
  const { t } = useI18n();
  const texts = t.RESERVATIONS.STATUS_MANAGEMENT;
  const {
    currentStatus,
    cancellationReason,
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
  } = useReservationStatusFooter(props);

  const leftActionsClassName = showCancellationField ? S.leftActionsWithField : S.leftActions;

  return (
    <div className={S.wrapper}>
      <div className={S.statusLine}>
        <span className={S.statusLabel}>{texts.LABEL_CURRENT_STATUS}</span>
        <StatusBadge status={currentStatus} />
      </div>

      <Divider />

      <div className={S.actionsLine}>
        <div className={leftActionsClassName}>
          {showCancellationField ? (
            <CancellationReasonField
              reason={cancellationReason}
              isReadOnly={cancellationFieldIsReadOnly}
              onChange={handleReasonChange}
            />
          ) : !hasPendingChanges ? (
            <FooterActionButtons
              currentStatus={currentStatus}
              onApprove={handleApprove}
              onCancelReservation={handleCancelReservation}
              onComplete={handleComplete}
            />
          ) : null}
        </div>

        <div className={S.rightActions}>
          <Button
            className={S.revertButton}
            isDisabled={!hasPendingChanges}
            onPress={handleRevertChanges}
          >
            <X size={15} />
            {texts.BTN_REVERT}
          </Button>
          <Button
            className={S.saveButton}
            isDisabled={isSaveDisabled}
            onPress={handleOpenSaveDialog}
          >
            <Save size={15} />
            {texts.BTN_SAVE_CHANGES}
          </Button>
        </div>
      </div>

      <SaveConfirmDialog
        isOpen={isSaveConfirmDialogOpen}
        onConfirm={handleConfirmSave}
        onCancel={handleCloseSaveDialog}
      />

      <UnsavedChangesModal
        isOpen={isUnsavedChangesModalOpen}
        onStay={handleCloseUnsavedChangesModal}
      />
    </div>
  );
};
