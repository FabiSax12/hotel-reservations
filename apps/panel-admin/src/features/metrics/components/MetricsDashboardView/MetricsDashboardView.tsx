"use client";

import { useI18n } from "@/locales";
import { useMetricsDashboard } from "../../hooks/useMetricsDashboard";
import { DashboardHeader } from "../DashboardHeader/DashboardHeader";
import { StatCards } from "../StatCards/StatCards";
import { MetricsTabs } from "../MetricsTabs/MetricsTabs";
import { METRICS_DASHBOARD_VIEW_STYLES as S } from "./MetricsDashboardView.styles";
import type { MetricsDashboardViewProps } from "./MetricsDashboardView.interface";
import type { MetricsDateRange } from "../../domain/metrics.types";

const MONTH_NAMES_ES = [
  "Ene", "Feb", "Mar", "Abr", "May", "Jun",
  "Jul", "Ago", "Sep", "Oct", "Nov", "Dic",
] as const;

function buildPeriodLabel(range: MetricsDateRange): string {
  const start = new Date(range.start);
  const end = new Date(range.end);
  const startMonthName = MONTH_NAMES_ES[start.getUTCMonth()];
  const endMonthName   = MONTH_NAMES_ES[end.getUTCMonth()];
  const startYear = start.getUTCFullYear();
  const endYear   = end.getUTCFullYear();

  if (startYear === endYear && start.getUTCMonth() === end.getUTCMonth()) {
    return `${startMonthName} ${startYear}`;
  }
  if (startYear === endYear) {
    return `${startMonthName}–${endMonthName} ${startYear}`;
  }
  return `${startMonthName} ${startYear}–${endMonthName} ${endYear}`;
}

export function MetricsDashboardView({ reservations, rooms }: MetricsDashboardViewProps) {
  const { t } = useI18n();
  const { dateRange, setDateRange, metrics } = useMetricsDashboard(reservations, rooms);

  const periodLabel = buildPeriodLabel(dateRange);

  return (
    <main className={S.page}>
      <DashboardHeader
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        titlePrefix={t.METRICS.PAGE.TITLE_PREFIX}
        titleAccent={t.METRICS.PAGE.TITLE_ACCENT}
        subtitle={t.METRICS.PAGE.SUBTITLE}
        exportLabel={t.METRICS.PAGE.EXPORT_BUTTON}
        ariaDateRange={t.METRICS.PAGE.ARIA_DATE_RANGE}
      />

      <StatCards
        totalReservations={metrics.totalReservations}
        totalRevenue={metrics.totalRevenue}
        averageOccupancy={metrics.averageOccupancy}
        activeRooms={metrics.activeRooms}
        totalRooms={metrics.totalRooms}
        labels={t.METRICS.STATS}
      />

      <MetricsTabs
        metrics={metrics}
        periodLabel={periodLabel}
        texts={t.METRICS}
      />
    </main>
  );
}
