import type { ReservationStatus } from "../../../domain/metricsTypes";
import type { WeeklyDataPoint } from "../../../domain/metricsTypes";

export interface WeeklyStackedBarChartProps {
  data: WeeklyDataPoint[];
  statusLabels: Record<ReservationStatus, string>;
  emptyText: string;
  ariaLabel: string;
}
