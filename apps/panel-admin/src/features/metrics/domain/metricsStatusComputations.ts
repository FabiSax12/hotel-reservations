import { ACTIVE_STATUSES } from "../constants/metricsConstants";
import type { MetricsReservation, StatusCounts } from "./metricsTypes";

export function isActive(status: MetricsReservation["status"]): boolean {
  return (ACTIVE_STATUSES as readonly string[]).includes(status);
}

export function computeStatusCounts(reservations: MetricsReservation[]): StatusCounts {
  return reservations.reduce<StatusCounts>(
    (acc, r) => {
      acc[r.status] = (acc[r.status] ?? 0) + 1;
      return acc;
    },
    { pending: 0, approved: 0, cancelled: 0, completed: 0 },
  );
}
