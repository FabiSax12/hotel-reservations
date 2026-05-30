import type { ReservationStatus } from "../../../domain/metrics.types";
import type { WeeklyDataPoint } from "../../../domain/metrics.types";

export interface WeeklyStackedBarChartProps {
  data: WeeklyDataPoint[];
  statusLabels: Record<ReservationStatus, string>;
  emptyText: string;
  ariaLabel: string;
}
