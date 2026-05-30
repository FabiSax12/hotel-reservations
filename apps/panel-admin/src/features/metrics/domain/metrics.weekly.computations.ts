import { DAYS_TO_SUNDAY, STATUS_ORDER } from "../constants/metrics.constants";
import { getISOWeek, getMondayOfWeek } from "../utils/metrics.date.utils";
import type { MetricsReservation, StatusCounts, WeeklyDataPoint, WeeklyLabel } from "./metrics.types";

export function computeWeeklyData(
  reservations: MetricsReservation[],
  monthNames: readonly string[],
): WeeklyDataPoint[] {
  const weekMap = new Map<number, StatusCounts & { weekLabel: WeeklyLabel }>();

  for (const r of reservations) {
    const week = getISOWeek(r.checkIn);
    if (!weekMap.has(week)) {
      const monday = getMondayOfWeek(r.checkIn);
      const sunday = new Date(monday);
      sunday.setDate(monday.getDate() + DAYS_TO_SUNDAY);
      const label: WeeklyLabel = {
        range: `${monday.getDate()} - ${sunday.getDate()}`,
        month: monthNames[monday.getMonth()],
      };
      const statusInit = Object.fromEntries(
        STATUS_ORDER.map((s) => [s, 0]),
      ) as unknown as StatusCounts;
      weekMap.set(week, { weekLabel: label, ...statusInit });
    }
    const entry = weekMap.get(week)!;
    entry[r.status] += 1;
  }

  return Array.from(weekMap.entries())
    .sort(([a], [b]) => a - b)
    .map(([, entry]) => ({
      weekLabel: entry.weekLabel,
      pending:   entry.pending,
      approved:  entry.approved,
      cancelled: entry.cancelled,
      completed: entry.completed,
      total: STATUS_ORDER.reduce((sum, s) => sum + entry[s], 0),
    }));
}
