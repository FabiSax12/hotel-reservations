import { MAX_WEEKLY_BARS } from "../constants/metrics.constants";
import { getISOWeek } from "../utils/metrics.date.utils";
import type { MetricsReservation, StatusCounts, WeeklyDataPoint } from "./metrics.types";

export function computeWeeklyData(reservations: MetricsReservation[]): WeeklyDataPoint[] {
  const weekMap = new Map<number, StatusCounts & { weekLabel: string }>();

  for (const r of reservations) {
    const week = getISOWeek(r.checkIn);
    if (!weekMap.has(week)) {
      weekMap.set(week, { weekLabel: `Sem ${week}`, pending: 0, approved: 0, cancelled: 0, completed: 0 });
    }
    const entry = weekMap.get(week)!;
    entry[r.status] += 1;
  }

  return Array.from(weekMap.entries())
    .sort(([a], [b]) => a - b)
    .slice(-MAX_WEEKLY_BARS)
    .map(([, entry]) => ({
      weekLabel: entry.weekLabel,
      pending: entry.pending,
      approved: entry.approved,
      cancelled: entry.cancelled,
      completed: entry.completed,
      total: entry.pending + entry.approved + entry.cancelled + entry.completed,
    }));
}
