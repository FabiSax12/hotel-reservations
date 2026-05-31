import {
  MS_PER_DAY,
  OCCUPANCY_COLORS,
  OCCUPANCY_THRESHOLDS,
  PCT_DECIMAL_PLACES,
  PERCENTAGE_SCALE,
} from "../constants/metrics.constants";
import type { ProgressColor } from "../constants/metrics.constants";
import type { MetricsDateRange, MetricsReservation, MetricsRoom, RoomOccupancy } from "./metrics.types";

export function resolveOccupancyColor(pct: number): ProgressColor {
  if (pct < OCCUPANCY_THRESHOLDS.LOW)    return OCCUPANCY_COLORS.LOW;
  if (pct < OCCUPANCY_THRESHOLDS.MEDIUM) return OCCUPANCY_COLORS.MEDIUM;
  if (pct < OCCUPANCY_THRESHOLDS.HIGH)   return OCCUPANCY_COLORS.HIGH;
  return OCCUPANCY_COLORS.FULL;
}

function computeRangeDays(start: string, end: string): number {
  const s = new Date(start);
  const e = new Date(end);
  return Math.round((e.getTime() - s.getTime()) / MS_PER_DAY) + 1;
}

export function computeRoomOccupancies(
  activeReservations: MetricsReservation[],
  rooms: MetricsRoom[],
  dateRange: MetricsDateRange,
): RoomOccupancy[] {
  const totalMonthNights = computeRangeDays(dateRange.start, dateRange.end);

  return rooms.map((room) => {
    const roomReservations = activeReservations.filter((r) => r.roomId === room.id);
    const nights  = roomReservations.reduce((sum, r) => sum + r.nights, 0);
    const revenue = roomReservations.reduce((sum, r) => sum + r.totalAmount, 0);
    const occupancyPct =
      totalMonthNights > 0
        ? Math.min(PERCENTAGE_SCALE, parseFloat(((nights / totalMonthNights) * PERCENTAGE_SCALE).toFixed(PCT_DECIMAL_PLACES)))
        : 0;

    return { roomId: room.id, roomName: room.name, occupancyPct, revenue, reservationCount: roomReservations.length, nights };
  });
}
