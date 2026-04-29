"use client";

import { useI18n } from "@/locales";
import { formatAmount } from "../../utils/format-currency";
import { ReservationDetailCard } from "../ReservationDetailCard/ReservationDetailCard";
import { RESERVATION_PAYMENT_CARD_STYLES as S } from "./ReservationPaymentCard.styles";
import type { ReservationPaymentCardProps } from "./ReservationPaymentCard.interface";

export const ReservationPaymentCard = ({
  pricePerNight,
  nights,
  totalUSD,
  currency,
}: ReservationPaymentCardProps) => {
  const { t } = useI18n();
  const labels = t.RESERVATIONS.DETAIL;

  return (
    <ReservationDetailCard title={labels.SECTION_PAYMENT}>
      <div className={S.fieldRow}>
        <span className={S.fieldLabel}>{labels.LABEL_PRICE_PER_NIGHT}</span>
        <span className={S.fieldValue}>{formatAmount(pricePerNight)}</span>
      </div>

      <div className={S.divider} />
      <div className={S.fieldRow}>
        <span className={S.fieldLabel}>{labels.LABEL_NIGHTS}</span>
        <span className={S.fieldValue}>{nights}</span>
      </div>

      <div className={S.divider} />
      <div className={S.fieldRow}>
        <span className={S.fieldLabel}>{labels.LABEL_CURRENCY}</span>
        <span className={S.fieldValue}>{currency}</span>
      </div>

      <div className={S.totalBox}>
        <p className={S.totalLabel}>{labels.LABEL_SUBTOTAL}</p>
        <p className={S.totalAmount}>{formatAmount(totalUSD)}</p>
      </div>
    </ReservationDetailCard>
  );
};
