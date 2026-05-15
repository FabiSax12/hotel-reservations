import type { MetricsReservation, MetricsRoom } from "../../domain/metrics.types";

export interface MetricsDashboardViewProps {
  reservations: MetricsReservation[];
  rooms: MetricsRoom[];
}
