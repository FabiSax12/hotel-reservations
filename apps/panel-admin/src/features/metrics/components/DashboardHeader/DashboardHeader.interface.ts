import type { MetricsDateRange } from "../../domain/metricsTypes";

export interface DashboardHeaderProps {
  dateRange: MetricsDateRange;
  onDateRangeChange: (range: MetricsDateRange) => void;
  titlePrefix: string;
  titleAccent: string;
  subtitle: string;
  ariaDateRange: string;
}
