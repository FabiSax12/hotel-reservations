import {
  MONTH_NAMES_ES,
  PCT_DECIMAL_PLACES,
} from "../constants/metrics.constants";
import { isInRange } from "../utils/metrics.date.utils";
import { isActive, computeStatusCounts } from "./metrics.status.computations";
import { computeWeeklyData } from "./metrics.weekly.computations";
import { computeRoomOccupancies } from "./metrics.occupancy.computations";
import { computeRanking } from "./metrics.ranking.computations";
import type {
  DashboardMetrics,
  MetricsDateRange,
  MetricsReservation,
  MetricsRoom,
} from "./metrics.types";

export function computeMetrics(
  reservations: MetricsReservation[],
  rooms: MetricsRoom[],
  dateRange: MetricsDateRange,
): DashboardMetrics {
  const inRange = reservations.filter((r) =>
    isInRange(r.checkIn, dateRange.start, dateRange.end),
  );
  const activeInRange = inRange.filter((r) => isActive(r.status));

  const activeRooms = rooms.filter((r) => r.isActive);
  const roomOccupancies = computeRoomOccupancies(
    activeInRange,
    activeRooms,
    dateRange,
  );

  const averageOccupancy =
    roomOccupancies.length > 0
      ? parseFloat(
          (
            roomOccupancies.reduce((sum, r) => sum + r.occupancyPct, 0) /
            roomOccupancies.length
          ).toFixed(PCT_DECIMAL_PLACES),
        )
      : 0;

  return {
    totalReservations: inRange.length,
    totalRevenue: activeInRange.reduce((sum, r) => sum + r.totalAmount, 0),
    averageOccupancy,
    activeRooms: activeRooms.length,
    totalRooms: rooms.length,
    statusCounts: computeStatusCounts(inRange),
    weeklyData: computeWeeklyData(inRange, MONTH_NAMES_ES),
    roomOccupancies,
    ranking: computeRanking(activeInRange, activeRooms),
  };
}
