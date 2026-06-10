/**
 * @file CheckoutHeader.tsx — Slim sticky header for the checkout pages.
 *
 * A back link to the rooms list plus a step label. Deliberately minimal so the
 * reservation content stays the focus.
 */

"use client";

import Link from "next/link";
import { ROUTES } from "@/config/routes";
import { useI18n } from "@/locales";
import { CHECKOUT_ICON_PATHS } from "../constants/checkout-icons.const";
import type { CheckoutHeaderProps } from "../domain/types";
import { CHECKOUT_STYLES } from "../theme/checkout.theme";
import { CheckoutIcon } from "./CheckoutIcon";

export function CheckoutHeader({ title }: CheckoutHeaderProps) {
  const { t } = useI18n();

  return (
    <header className={CHECKOUT_STYLES.header}>
      <div className={CHECKOUT_STYLES.headerInner}>
        <Link href={ROUTES.HOME} className={CHECKOUT_STYLES.backLink}>
          <CheckoutIcon path={CHECKOUT_ICON_PATHS.back} className={CHECKOUT_STYLES.backIcon} />
          {t.CHECKOUT.BACK_TO_ROOMS}
        </Link>
        <span className={CHECKOUT_STYLES.stepLabel}>{title}</span>
      </div>
    </header>
  );
}
