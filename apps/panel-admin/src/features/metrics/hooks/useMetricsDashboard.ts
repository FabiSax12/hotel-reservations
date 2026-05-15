import { useMemo, useState } from "react";
import type {
  DashboardMetrics,
  MetricsDateRange,
  MetricsReservation,
  MetricsRoom,
  RankingEntry,
  RoomOccupancy,
  StatusCounts,
  WeeklyDataPoint,
} from "../domain/metrics.types";
import {
  ACTIVE_STATUSES,
  MAX_WEEKLY_BARS,
  PERCENTAGE_SCALE,
} from "../constants/metrics.constants";

function getTodayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

function getStartOfMonthIso(): string {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), 1).toISOString().slice(0, 10);
}

function isInRange(dateIso: string, start: string, end: string): boolean {
  return dateIso >= start && dateIso <= end;
}

function isActive(status: MetricsReservation["status"]): boolean {
  return (ACTIVE_STATUSES as readonly string[]).includes(status);
}

function getISOWeek(dateIso: string): number {
  const d = new Date(dateIso);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
  const jan4 = new Date(d.getFullYear(), 0, 4);
  return 1 + Math.round(((d.getTime() - jan4.getTime()) / 86_400_000 - 3 + ((jan4.getDay() + 6) % 7)) / 7);
}

function computeStatusCounts(reservations: MetricsReservation[]): StatusCounts {
  return reservations.reduce<StatusCounts>(
    (acc, r) => {
      acc[r.status] = (acc[r.status] ?? 0) + 1;
      return acc;
    },
    { pending: 0, approved: 0, cancelled: 0, completed: 0 },
  );
}

function computeWeeklyData(reservations: MetricsReservation[]): WeeklyDataPoint[] {
  const weekMap = new Map<number, StatusCounts & { weekLabel: string }>();

  for (const r of reservations) {
    const week = getISOWeek(r.checkIn);
    if (!weekMap.has(week)) {
      weekMap.set(week, { weekLabel: `Sem ${week}`, pending: 0, approved: 0, cancelled: 0, completed: 0 });
    }
    const entry = weekMap.get(week)!;
    entry[r.status] += 1;
  }

  const sorted = Array.from(weekMap.entries())
    .sort(([a], [b]) => a - b)
    .slice(-MAX_WEEKLY_BARS);

  return sorted.map(([, entry]) => ({
    weekLabel: entry.weekLabel,
    pending: entry.pending,
    approved: entry.approved,
    cancelled: entry.cancelled,
    completed: entry.completed,
    total: entry.pending + entry.approved + entry.cancelled + entry.completed,
  }));
}

// NOTE: The occupancy formula uses total nights of each FULL calendar month that overlaps the
// selected range as the denominator — not just the days within the range itself. For example,
// if the range is April 5–May 14, the denominator is 30 (all of April) + 31 (all of May) = 61.
function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function computeTotalMonthNights(start: string, end: string): number {
  const s = new Date(start);
  const e = new Date(end);
  let total = 0;
  const cursor = new Date(s.getFullYear(), s.getMonth(), 1);
  while (cursor <= e) {
    total += getDaysInMonth(cursor.getFullYear(), cursor.getMonth());
    cursor.setMonth(cursor.getMonth() + 1);
  }
  return total;
}

function computeRoomOccupancies(
  activeReservations: MetricsReservation[],
  rooms: MetricsRoom[],
  dateRange: MetricsDateRange,
): RoomOccupancy[] {
  const totalMonthNights = computeTotalMonthNights(dateRange.start, dateRange.end);

  return rooms.map((room) => {
    const roomReservations = activeReservations.filter((r) => r.roomId === room.id);
    const nights = roomReservations.reduce((sum, r) => sum + r.nights, 0);
    const revenue = roomReservations.reduce((sum, r) => sum + r.totalAmount, 0);
    const occupancyPct =
      totalMonthNights > 0
        ? Math.min(PERCENTAGE_SCALE, parseFloat(((nights / totalMonthNights) * PERCENTAGE_SCALE).toFixed(1)))
        : 0;

    return {
      roomId: room.id,
      roomName: room.name,
      occupancyPct,
      revenue,
      reservationCount: roomReservations.length,
    };
  });
}

function computeRanking(
  activeReservations: MetricsReservation[],
  rooms: MetricsRoom[],
): RankingEntry[] {
  const counts = new Map<string, { count: number; revenue: number; name: string }>();

  for (const room of rooms) {
    counts.set(room.id, { count: 0, revenue: 0, name: room.name });
  }
  for (const r of activeReservations) {
    const entry = counts.get(r.roomId);
    if (entry) {
      entry.count += 1;
      entry.revenue += r.totalAmount;
    }
  }

  const maxCount = Math.max(...Array.from(counts.values()).map((e) => e.count), 1);

  return Array.from(counts.entries())
    .sort(([, a], [, b]) => b.count - a.count)
    .map(([id, entry], index) => ({
      rank: index + 1,
      roomId: id,
      roomName: entry.name,
      reservationCount: entry.count,
      revenue: entry.revenue,
      proportionPct: Math.round((entry.count / maxCount) * PERCENTAGE_SCALE),
    }));
}

function computeMetrics(
  reservations: MetricsReservation[],
  rooms: MetricsRoom[],
  dateRange: MetricsDateRange,
): DashboardMetrics {
  const inRange = reservations.filter((r) => isInRange(r.checkIn, dateRange.start, dateRange.end));
  const activeInRange = inRange.filter((r) => isActive(r.status));

  const statusCounts = computeStatusCounts(inRange);
  const totalRevenue = activeInRange.reduce((sum, r) => sum + r.totalAmount, 0);
  const weeklyData = computeWeeklyData(inRange);

  const activeRooms = rooms.filter((r) => r.isActive);
  const roomOccupancies = computeRoomOccupancies(activeInRange, activeRooms, dateRange);
  const ranking = computeRanking(activeInRange, activeRooms);

  const averageOccupancy =
    roomOccupancies.length > 0
      ? parseFloat(
          (roomOccupancies.reduce((sum, r) => sum + r.occupancyPct, 0) / roomOccupancies.length).toFixed(1),
        )
      : 0;

  return {
    totalReservations: inRange.length,
    totalRevenue,
    averageOccupancy,
    activeRooms: activeRooms.length,
    totalRooms: rooms.length,
    statusCounts,
    weeklyData,
    roomOccupancies,
    ranking,
  };
}

export function useMetricsDashboard(reservations: MetricsReservation[], rooms: MetricsRoom[]) {
  const [dateRange, setDateRange] = useState<MetricsDateRange>({
    start: getStartOfMonthIso(),
    end: getTodayIso(),
  });

  const metrics = useMemo(
    () => computeMetrics(reservations, rooms, dateRange),
    [reservations, rooms, dateRange],
  );

  return { dateRange, setDateRange, metrics };
}
