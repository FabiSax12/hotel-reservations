import {
  CURRENCY_CODE,
  CURRENCY_LOCALE,
  MONTH_NAMES_ES,
  OCCUPANCY_COLORS,
  OCCUPANCY_THRESHOLDS,
  PERCENTAGE_SCALE,
} from "../constants/metrics.constants";
import type { MetricsDateRange } from "../domain/metrics.types";

type ProgressBarColor = "success" | "warning" | "accent" | "default" | "danger";

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat(CURRENCY_LOCALE, {
    style: "currency",
    currency: CURRENCY_CODE,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function computePct(count: number, total: number): number {
  if (total === 0) return 0;
  return parseFloat(((count / total) * PERCENTAGE_SCALE).toFixed(1));
}

export function resolveOccupancyColor(pct: number): ProgressBarColor {
  if (pct < OCCUPANCY_THRESHOLDS.LOW) return OCCUPANCY_COLORS.LOW;
  if (pct < OCCUPANCY_THRESHOLDS.MEDIUM) return OCCUPANCY_COLORS.MEDIUM;
  if (pct < OCCUPANCY_THRESHOLDS.HIGH) return OCCUPANCY_COLORS.HIGH;
  return OCCUPANCY_COLORS.FULL;
}

export function buildPeriodLabel(range: MetricsDateRange): string {
  const start = new Date(range.start);
  const end = new Date(range.end);
  const startMonthName = MONTH_NAMES_ES[start.getUTCMonth()];
  const endMonthName = MONTH_NAMES_ES[end.getUTCMonth()];
  const startYear = start.getUTCFullYear();
  const endYear = end.getUTCFullYear();

  if (startYear === endYear && start.getUTCMonth() === end.getUTCMonth()) {
    return `${startMonthName} ${startYear}`;
  }
  if (startYear === endYear) {
    return `${startMonthName}–${endMonthName} ${startYear}`;
  }
  return `${startMonthName} ${startYear}–${endMonthName} ${endYear}`;
}
