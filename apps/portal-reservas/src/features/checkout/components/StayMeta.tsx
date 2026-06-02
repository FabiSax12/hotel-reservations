/**
 * @file StayMeta.tsx — Check-in / check-out dates, nights and guests.
 *
 * The four headline facts of the stay, shown as a compact stat grid above the
 * room details. Per-room check-in/out times live in each SummaryRoomCard.
 */

"use client";

import { useI18n } from "@/locales";
import { CHECKOUT_ICON_PATHS } from "../constants/checkout-icons.const";
import { formatStayDate } from "../domain/format";
import type { StayMetaProps } from "../domain/types";
import { CHECKOUT_STYLES } from "../theme/checkout.theme";
import { CheckoutIcon } from "./CheckoutIcon";

export function StayMeta({ draft }: StayMetaProps) {
  const { t, locale } = useI18n();

  const cards = [
    {
      key: "in",
      icon: CHECKOUT_ICON_PATHS.calendar,
      label: t.CHECKOUT.CHECK_IN_LABEL,
      value: formatStayDate(draft.checkIn, locale),
    },
    {
      key: "out",
      icon: CHECKOUT_ICON_PATHS.calendar,
      label: t.CHECKOUT.CHECK_OUT_LABEL,
      value: formatStayDate(draft.checkOut, locale),
    },
    {
      key: "nights",
      icon: CHECKOUT_ICON_PATHS.clock,
      label: t.CHECKOUT.NIGHTS_LABEL,
      value: String(draft.nights),
    },
    {
      key: "guests",
      icon: CHECKOUT_ICON_PATHS.guests,
      label: t.CHECKOUT.GUESTS_LABEL,
      value: String(draft.guests),
    },
  ];

  return (
    <div className={CHECKOUT_STYLES.stayGrid}>
      {cards.map((card) => (
        <div key={card.key} className={CHECKOUT_STYLES.stayCard}>
          <span className={CHECKOUT_STYLES.stayIconWrap}>
            <CheckoutIcon path={card.icon} className={CHECKOUT_STYLES.stayIcon} />
          </span>
          <span className={CHECKOUT_STYLES.stayLabel}>{card.label}</span>
          <span className={CHECKOUT_STYLES.stayValue}>{card.value}</span>
        </div>
      ))}
    </div>
  );
}
