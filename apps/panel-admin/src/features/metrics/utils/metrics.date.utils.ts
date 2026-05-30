import { MS_PER_DAY } from "../constants/metrics.constants";
import type { MetricsDateRange } from "../domain/metrics.types";

function toDateIso(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export function getTodayIso(): string {
  return toDateIso(new Date());
}

export function getStartOfMonthIso(): string {
  const d = new Date();
  return toDateIso(new Date(d.getFullYear(), d.getMonth(), 1));
}

export function isInRange(dateIso: string, start: string, end: string): boolean {
  return dateIso >= start && dateIso <= end;
}

export function getISOWeek(dateIso: string): number {
  const d = new Date(dateIso);
  d.setHours(0, 0, 0, 0);
  // Shift to the nearest Thursday to determine the ISO week year
  d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
  const jan4 = new Date(d.getFullYear(), 0, 4);
  return 1 + Math.round(((d.getTime() - jan4.getTime()) / MS_PER_DAY - 3 + ((jan4.getDay() + 6) % 7)) / 7);
}

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function getMondayOfWeek(dateIso: string): Date {
  const d = new Date(dateIso);
  d.setHours(0, 0, 0, 0);
  const dayOfWeek = (d.getDay() + 6) % 7;
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
