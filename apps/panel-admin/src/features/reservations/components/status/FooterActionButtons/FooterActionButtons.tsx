"use client";

import { Button } from "@heroui/react";
import { DB_ENUMS } from "@hotel/db";
import { useI18n } from "@/locales";
import { PermissionGuard } from "@/shared/components/PermissionGuard/PermissionGuard";
import { RESERVATION_STATUS } from "../../../constants/reservation-statuses";
import type { FooterActionButtonsProps } from "./FooterActionButtons.interface";
import { FOOTER_ACTION_BUTTONS_STYLES as STYLES } from "./FooterActionButtons.styles";

export const FooterActionButtons = ({
  currentStatus,
  onApprove,
  onCancelReservation,
  onComplete,
}: FooterActionButtonsProps) => {
  const { t } = useI18n();
  const texts = t.RESERVATIONS.STATUS_MANAGEMENT;

  if (currentStatus === RESERVATION_STATUS.PENDING) {
    return (
      <PermissionGuard permissions={[DB_ENUMS.user_permission.reservations_edit]}>
        <Button variant="outline" size="sm" className={STYLES.approveButton} onPress={onApprove}>
          {texts.BTN_APPROVE}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className={STYLES.cancelButton}
          onPress={onCancelReservation}
        >
          {texts.BTN_CANCEL_RESERVATION}
        </Button>
      </PermissionGuard>
    );
  }

  if (currentStatus === RESERVATION_STATUS.APPROVED) {
    return (
      <PermissionGuard permissions={[DB_ENUMS.user_permission.reservations_edit]}>
        <Button variant="outline" size="sm" className={STYLES.completeButton} onPress={onComplete}>
          {texts.BTN_COMPLETE_RESERVATION}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className={STYLES.cancelButton}
          onPress={onCancelReservation}
        >
          {texts.BTN_CANCEL_RESERVATION}
        </Button>
      </PermissionGuard>
    );
  }

  return null;
};
