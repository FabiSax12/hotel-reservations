/**
 * @file SuccessView.tsx — Post-payment confirmation screen.
 *
 * Shows a success state with a booking reference derived from the gateway
 * session ID. No reservation is persisted (out of scope for US-DM-06), so this
 * is the end of the flow: the guest is invited back to the home page.
 */

"use client";

import Link from "next/link";
import { ROUTES } from "@/config/routes";
import { useI18n } from "@/locales";
import { CHECKOUT_ICON_PATHS } from "../constants/checkout-icons.const";
import { generateConfirmationCode } from "../domain/reservation";
import type { SuccessViewProps } from "../domain/types";
import { CHECKOUT_STYLES } from "../theme/checkout.theme";
import { CheckoutIcon } from "./CheckoutIcon";

export function SuccessView({ sessionId }: SuccessViewProps) {
  const { t } = useI18n();
  const code = generateConfirmationCode(sessionId);

  return (
    <div className={CHECKOUT_STYLES.successPage}>
      <div className={CHECKOUT_STYLES.successCard}>
        <span className={CHECKOUT_STYLES.successIconWrap}>
          <CheckoutIcon path={CHECKOUT_ICON_PATHS.check} className={CHECKOUT_STYLES.successIcon} />
        </span>
        <h1 className={CHECKOUT_STYLES.successTitle}>{t.CHECKOUT.SUCCESS_TITLE}</h1>
        <p className={CHECKOUT_STYLES.successSubtitle}>{t.CHECKOUT.SUCCESS_SUBTITLE}</p>

        <div className={CHECKOUT_STYLES.successCodeBox}>
          <span className={CHECKOUT_STYLES.successCodeLabel}>{t.CHECKOUT.SUCCESS_CODE_LABEL}</span>
          <span className={CHECKOUT_STYLES.successCode}>{code}</span>
        </div>

        <Link href={ROUTES.HOME} className={CHECKOUT_STYLES.successBackBtn}>
          <CheckoutIcon
            path={CHECKOUT_ICON_PATHS.back}
            className={CHECKOUT_STYLES.successBackIcon}
          />
          {t.CHECKOUT.SUCCESS_BACK}
        </Link>
      </div>
    </div>
  );
}
