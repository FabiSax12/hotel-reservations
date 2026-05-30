import type { ReservationStatus } from "../../../domain/metrics.types";
import type { TooltipState } from "../../../hooks/useWeeklyChart";

export interface ChartTooltipProps {
  tooltip:      TooltipState | null;
  statusLabels: Record<ReservationStatus, string>;
}
