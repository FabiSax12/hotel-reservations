import { getMetricsReservations, getMetricsRooms } from "@/features/metrics/services/metricsService";
import { MetricsDashboardView } from "@/features/metrics/components/MetricsDashboardView/MetricsDashboardView";

export default async function MetricsDashboardPage() {
  const [reservations, rooms] = await Promise.all([
    getMetricsReservations(),
    getMetricsRooms(),
  ]);

  return <MetricsDashboardView reservations={reservations} rooms={rooms} />;
}
