/**
 * @file ProceedToPayment.tsx — Payment summary + secure pay button.
 *
 * Shows the per-room price breakdown, the total, the secure-payment note and
 * the button that hands off to the gateway. Card data never touches this app.
 */

"use client";

import { useI18n } from "@/locales";
import { CHECKOUT_ICON_PATHS } from "../constants/checkout-icons.const";
import { formatCurrency } from "../domain/format";
import type { ProceedToPaymentProps } from "../domain/types";
import { CHECKOUT_STYLES } from "../theme/checkout.theme";
import { CheckoutIcon } from "./CheckoutIcon";
import { PriceBreakdown } from "./PriceBreakdown";

export function ProceedToPayment({ draft, isSubmitting, error, onSubmit }: ProceedToPaymentProps) {
  const { t, locale } = useI18n();

  return (
    <div className={CHECKOUT_STYLES.payCard}>
      <p className={CHECKOUT_STYLES.summaryTitle}>{t.CHECKOUT.SUMMARY_TITLE}</p>
      <PriceBreakdown draft={draft} />

      <div className={CHECKOUT_STYLES.totalRow}>
        <span className={CHECKOUT_STYLES.totalLabel}>{t.CHECKOUT.TOTAL_LABEL}</span>
        <span className={CHECKOUT_STYLES.totalAmount}>{formatCurrency(draft.total, locale)}</span>
      </div>
      <p className={CHECKOUT_STYLES.taxesNote}>{t.CHECKOUT.TAXES_NOTE}</p>

      {error ? (
        <p className={CHECKOUT_STYLES.payError} role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="button"
        className={CHECKOUT_STYLES.payBtn}
        onClick={onSubmit}
        disabled={isSubmitting}
        aria-busy={isSubmitting}
      >
        <CheckoutIcon
          path={CHECKOUT_ICON_PATHS.lock}
          className={isSubmitting ? CHECKOUT_STYLES.payBtnSpinner : CHECKOUT_STYLES.payBtnIcon}
        />
        {isSubmitting ? t.CHECKOUT.PAY_PENDING : t.CHECKOUT.PAY_BUTTON}
      </button>

      <p className={CHECKOUT_STYLES.secureNote}>
        <CheckoutIcon path={CHECKOUT_ICON_PATHS.lock} className={CHECKOUT_STYLES.secureIcon} />
        {t.CHECKOUT.SECURE_NOTE}
      </p>
    </div>
  );
}
