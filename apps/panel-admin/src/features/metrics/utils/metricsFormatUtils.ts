import {
  CURRENCY_CODE,
  CURRENCY_FRACTION_DIGITS,
  CURRENCY_LOCALE,
  PCT_DECIMAL_PLACES,
  PERCENTAGE_SCALE,
} from "../constants/metricsConfig";

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat(CURRENCY_LOCALE, {
    style:                "currency",
    currency:             CURRENCY_CODE,
    maximumFractionDigits: CURRENCY_FRACTION_DIGITS,
  }).format(amount);
}

export function computePct(count: number, total: number): number {
  if (total === 0) return 0;
  return parseFloat(((count / total) * PERCENTAGE_SCALE).toFixed(PCT_DECIMAL_PLACES));
}

export function formatPct(value: number): string {
  return `${value.toFixed(PCT_DECIMAL_PLACES)}%`;
}
