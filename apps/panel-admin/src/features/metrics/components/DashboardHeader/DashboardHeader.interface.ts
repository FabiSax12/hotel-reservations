import type { MetricsDateRange } from "../../domain/metrics.types";

export interface DashboardHeaderProps {
  dateRange: MetricsDateRange;
  onDateRangeChange: (range: MetricsDateRange) => void;
  titlePrefix: string;
  titleAccent: string;
  subtitle: string;
  ariaDateRange: string;
}
