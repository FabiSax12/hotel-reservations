import type { ReservationStatus } from "../../../domain/metricsTypes";

export interface ChartLegendProps {
  statusLabels: Record<ReservationStatus, string>;
}
