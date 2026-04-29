"use client";

import { useI18n } from "@/locales";
import { ReservationDetailCard } from "../ReservationDetailCard/ReservationDetailCard";
import { RESERVATION_GUEST_CARD_STYLES as S } from "./ReservationGuestCard.styles";
import type { ReservationGuestCardProps } from "./ReservationGuestCard.interface";

export const ReservationGuestCard = ({ guest }: ReservationGuestCardProps) => {
  const { t } = useI18n();
  const labels = t.RESERVATIONS.DETAIL;

  return (
    <ReservationDetailCard title={labels.SECTION_CLIENT}>
      <p className={S.guestName}>{guest.name}</p>

      <div className={S.divider} />
      <div className={S.fieldRow}>
        <span className={S.fieldLabel}>{labels.LABEL_EMAIL}</span>
        <span className={S.fieldValue}>{guest.email}</span>
      </div>

      <div className={S.divider} />
      <div className={S.fieldRow}>
        <span className={S.fieldLabel}>{labels.LABEL_PHONE}</span>
        <span className={S.fieldValue}>{guest.phone}</span>
      </div>
    </ReservationDetailCard>
  );
};
