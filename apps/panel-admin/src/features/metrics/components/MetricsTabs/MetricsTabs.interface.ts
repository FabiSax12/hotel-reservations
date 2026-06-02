import type { DashboardMetrics } from "../../domain/metricsTypes";
import type { MetricsTexts } from "../../i18n/metricsTextsType";

export interface MetricsTabsProps {
  metrics: DashboardMetrics;
  periodLabel: string;
  texts: MetricsTexts;
}
