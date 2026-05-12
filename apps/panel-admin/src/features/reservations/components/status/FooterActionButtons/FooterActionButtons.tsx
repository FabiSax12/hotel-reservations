"use client";

import { Button } from "@heroui/react";
import { useI18n } from "@/locales";
import { RESERVATION_STATUS as RS } from "../../../constants/reservation-statuses";
import { FOOTER_ACTION_BUTTONS_STYLES as S } from "./FooterActionButtons.styles";
import type { FooterActionButtonsProps } from "./FooterActionButtons.interface";

export const FooterActionButtons = ({
  currentStatus,
  onApprove,
  onCancelReservation,
  onComplete,
}: FooterActionButtonsProps) => {
  const { t } = useI18n();
  const texts = t.RESERVATIONS.STATUS_MANAGEMENT;

  if (currentStatus === RS.PENDING) {
    return (
      <>
        <Button variant="outline" size="sm" className={S.approveButton} onPress={onApprove}>
          {texts.BTN_APPROVE}
        </Button>
        <Button variant="outline" size="sm" className={S.cancelButton} onPress={onCancelReservation}>
          {texts.BTN_CANCEL_RESERVATION}
        </Button>
      </>
    );
  }

  if (currentStatus === RS.APPROVED) {
    return (
      <>
        <Button variant="outline" size="sm" className={S.completeButton} onPress={onComplete}>
          {texts.BTN_COMPLETE_RESERVATION}
        </Button>
        <Button variant="outline" size="sm" className={S.cancelButton} onPress={onCancelReservation}>
          {texts.BTN_CANCEL_RESERVATION}
        </Button>
      </>
    );
  }

  return null;
};
