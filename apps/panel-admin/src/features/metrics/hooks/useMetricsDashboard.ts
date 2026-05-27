import { useMemo, useState } from "react";
import { computeMetrics } from "../domain/metrics.computations";
import { getTodayIso, getStartOfMonthIso } from "../utils/metrics.date.utils";
import type { MetricsDateRange, MetricsReservation, MetricsRoom } from "../domain/metrics.types";

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
