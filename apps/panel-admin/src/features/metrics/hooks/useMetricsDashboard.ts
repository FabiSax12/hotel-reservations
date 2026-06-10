import { useMemo, useState } from "react";
import { computeMetrics } from "../domain/metricsComputations";
import { getTodayIso, getStartOfMonthIso } from "../utils/metricsDateUtils";
import type { MetricsDateRange, MetricsReservation, MetricsRoom } from "../domain/metricsTypes";

export function useMetricsDashboard(reservations: MetricsReservation[], rooms: MetricsRoom[]) {
  const [dateRange, setDateRange] = useState<MetricsDateRange>({
    start: getStartOfMonthIso(),
    end: getTodayIso(),
  });

  const metrics = useMemo(
    () => computeMetrics(reservations, rooms, dateRange),
    [reservations, rooms, dateRange],
  );

  return { dateRange, setDateRange, metrics };
}
