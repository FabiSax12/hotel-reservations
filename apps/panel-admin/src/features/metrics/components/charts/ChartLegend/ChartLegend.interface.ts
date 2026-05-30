import type { ReservationStatus } from "../../../domain/metrics.types";

export interface ChartLegendProps {
  statusLabels: Record<ReservationStatus, string>;
}
