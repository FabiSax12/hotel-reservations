"use client";

import { useI18n } from "@/locales";
import { formatAmount } from "../../../utils/format-currency";
import { Divider } from "../../shared/Divider/Divider";
import { ReservationDetailCard } from "../ReservationDetailCard/ReservationDetailCard";
import type { ReservationPaymentCardProps } from "./ReservationPaymentCard.interface";
import { RESERVATION_PAYMENT_CARD_STYLES as STYLES } from "./ReservationPaymentCard.styles";

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
      <div className={STYLES.fieldRow}>
        <span className={STYLES.fieldLabel}>{labels.LABEL_PRICE_PER_NIGHT}</span>
        <span className={STYLES.fieldValue}>{formatAmount(pricePerNight)}</span>
      </div>

      <Divider />
      <div className={STYLES.fieldRow}>
        <span className={STYLES.fieldLabel}>{labels.LABEL_NIGHTS}</span>
        <span className={STYLES.fieldValue}>{nights}</span>
      </div>

      <Divider />
      <div className={STYLES.fieldRow}>
        <span className={STYLES.fieldLabel}>{labels.LABEL_CURRENCY}</span>
        <span className={STYLES.fieldValue}>{currency}</span>
      </div>

      <div className={STYLES.totalBox}>
        <p className={STYLES.totalLabel}>{labels.LABEL_SUBTOTAL}</p>
        <p className={STYLES.totalAmount}>{formatAmount(totalUSD)}</p>
      </div>
    </ReservationDetailCard>
  );
};
