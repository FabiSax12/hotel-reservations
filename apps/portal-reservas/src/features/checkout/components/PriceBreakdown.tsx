/**
 * @file PriceBreakdown.tsx — Per-room price lines for the payment summary.
 *
 * Mirrors the room cards' pricing rule: nightly price times nights, one line
 * per room. The total + taxes note live in ProceedToPayment.
 */

"use client";

import { useI18n } from "@/locales";
import { formatCurrency } from "../domain/format";
import type { PriceBreakdownProps } from "../domain/types";
import { CHECKOUT_STYLES } from "../theme/checkout.theme";

export function PriceBreakdown({ draft }: PriceBreakdownProps) {
  const { t, locale } = useI18n();

  return (
    <div className={CHECKOUT_STYLES.priceList}>
      {draft.rooms.map((room) => (
        <div key={room.id} className={CHECKOUT_STYLES.priceLine}>
          <span className={CHECKOUT_STYLES.priceLineLabel}>
            <span className={CHECKOUT_STYLES.priceLineTitle}>{room.title}</span>
            <span className={CHECKOUT_STYLES.priceLineSub}>
              {t.CHECKOUT.LINE_NIGHTS.replace(
                "{price}",
                formatCurrency(room.price, locale),
              ).replace("{nights}", String(draft.nights))}
            </span>
          </span>
          <span className={CHECKOUT_STYLES.priceLineAmount}>
            {formatCurrency(room.price * draft.nights, locale)}
          </span>
        </div>
      ))}
    </div>
  );
}
