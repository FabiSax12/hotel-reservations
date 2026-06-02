/**
 * @file format.ts — Locale-aware currency + date formatting for checkout.
 *
 * Pure wrappers over the Intl API so components never hardcode a locale or a
 * currency symbol (architecture-context.md §8).
 */

import type { SupportedLocale } from "@hotel/i18n";
import { CHECKOUT_CURRENCY } from "../constants/checkout.constants";

/** Formats a whole-dollar amount as currency in the active locale. */
export function formatCurrency(amount: number, locale: SupportedLocale): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: CHECKOUT_CURRENCY,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Formats an ISO date (YYYY-MM-DD) as a readable weekday + day + month. */
export function formatStayDate(isoDate: string, locale: SupportedLocale): string {
  return new Intl.DateTimeFormat(locale, {
    weekday: "short",
    day: "numeric",
    month: "long",
  }).format(new Date(`${isoDate}T00:00:00`));
}
