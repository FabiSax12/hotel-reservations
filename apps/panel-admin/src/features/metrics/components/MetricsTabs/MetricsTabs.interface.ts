import type { DashboardMetrics } from "../../domain/metrics.types";
import type { MetricsTexts } from "../../i18n/metricsTexts.type";

export interface MetricsTabsProps {
  metrics: DashboardMetrics;
  periodLabel: string;
  texts: MetricsTexts;
}
