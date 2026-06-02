import {
  DAYS_IN_WEEK,
  FIRST_DAY_OF_MONTH,
  ISO_DATE_LENGTH,
  ISO_WEEK1_JAN_DAY,
  ISO_WEEK_START,
  JANUARY_MONTH_IDX,
  LAST_DAY_PREV_MONTH,
  MONDAY_JS_OFFSET,
  MS_PER_DAY,
  THURSDAY_ISO_DAY,
} from "../constants/metricsConfig";
import type { MetricsDateRange } from "../domain/metricsTypes";

function toDateIso(d: Date): string {
  return d.toISOString().slice(0, ISO_DATE_LENGTH);
}

export function getTodayIso(): string {
  return toDateIso(new Date());
}

export function getStartOfMonthIso(): string {
  const d = new Date();
  return toDateIso(new Date(d.getFullYear(), d.getMonth(), FIRST_DAY_OF_MONTH));
}

export function isInRange(dateIso: string, start: string, end: string): boolean {
  return dateIso >= start && dateIso <= end;
}

export function getISOWeek(dateIso: string): number {
  const d = new Date(dateIso);
  d.setHours(0, 0, 0, 0);
  // Shift to nearest Thursday — ISO weeks are identified by their Thursday
  d.setDate(d.getDate() + THURSDAY_ISO_DAY - ((d.getDay() + MONDAY_JS_OFFSET) % DAYS_IN_WEEK));
  const jan4 = new Date(d.getFullYear(), JANUARY_MONTH_IDX, ISO_WEEK1_JAN_DAY);
  return ISO_WEEK_START + Math.round(
    ((d.getTime() - jan4.getTime()) / MS_PER_DAY
      - THURSDAY_ISO_DAY
      + ((jan4.getDay() + MONDAY_JS_OFFSET) % DAYS_IN_WEEK))
    / DAYS_IN_WEEK,
  );
}

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, LAST_DAY_PREV_MONTH).getDate();
}

export function getMondayOfWeek(dateIso: string): Date {
  const d = new Date(dateIso);
  d.setHours(0, 0, 0, 0);
  const dayOfWeek = (d.getDay() + MONDAY_JS_OFFSET) % DAYS_IN_WEEK;
  d.setDate(d.getDate() - dayOfWeek);
  return d;
}

export function buildPeriodLabel(range: MetricsDateRange, monthNames: readonly string[]): string {
  const start = new Date(range.start);
  const end   = new Date(range.end);
  const startMonth = monthNames[start.getUTCMonth()];
  const endMonth   = monthNames[end.getUTCMonth()];
  const startYear  = start.getUTCFullYear();
  const endYear    = end.getUTCFullYear();

  if (startYear === endYear && start.getUTCMonth() === end.getUTCMonth()) {
    return `${startMonth} ${startYear}`;
  }
  if (startYear === endYear) {
    return `${startMonth}–${endMonth} ${startYear}`;
  }
  return `${startMonth} ${startYear}–${endMonth} ${endYear}`;
}
