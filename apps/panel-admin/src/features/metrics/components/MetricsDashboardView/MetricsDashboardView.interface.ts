import type { MetricsReservation, MetricsRoom } from "../../domain/metricsTypes";

export interface MetricsDashboardViewProps {
  reservations: MetricsReservation[];
  rooms: MetricsRoom[];
}
