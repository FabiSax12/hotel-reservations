import { MONTH_NAMES_ES } from "../constants/metricsConstants";
import { PCT_DECIMAL_PLACES } from "../constants/metricsConfig";
import { isInRange } from "../utils/metricsDateUtils";
import { isActive, computeStatusCounts } from "./metricsStatusComputations";
import { computeWeeklyData } from "./metricsWeeklyComputations";
import { computeRoomOccupancies } from "./metricsOccupancyComputations";
import { computeRanking } from "./metricsRankingComputations";
import type {
  DashboardMetrics,
  MetricsDateRange,
  MetricsReservation,
  MetricsRoom,
} from "./metricsTypes";

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
