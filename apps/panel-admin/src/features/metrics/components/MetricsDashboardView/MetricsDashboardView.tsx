"use client";

import { useI18n } from "@/locales";
import { useMetricsDashboard } from "../../hooks/useMetricsDashboard";
import { MONTH_NAMES_ES } from "../../constants/metricsConstants";
import { buildPeriodLabel } from "../../utils/metricsDateUtils";
import { DashboardHeader } from "../DashboardHeader/DashboardHeader";
import { StatCards } from "../StatCards/StatCards";
import { MetricsTabs } from "../MetricsTabs/MetricsTabs";
import { METRICS_DASHBOARD_VIEW_STYLES as STYLES } from "./MetricsDashboardView.styles";
import type { MetricsDashboardViewProps } from "./MetricsDashboardView.interface";

export function MetricsDashboardView({ reservations, rooms }: MetricsDashboardViewProps) {
  const { t } = useI18n();
  const { dateRange, setDateRange, metrics } = useMetricsDashboard(reservations, rooms);

  const periodLabel = buildPeriodLabel(dateRange, MONTH_NAMES_ES);

  return (
    <main className={STYLES.page}>
      <div className={STYLES.headerCard}>
        <DashboardHeader
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          titlePrefix={t.METRICS.PAGE.TITLE_PREFIX}
          titleAccent={t.METRICS.PAGE.TITLE_ACCENT}
          subtitle={t.METRICS.PAGE.SUBTITLE}
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
      </div>

      <MetricsTabs
        metrics={metrics}
        periodLabel={periodLabel}
        texts={t.METRICS}
      />
    </main>
  );
}
