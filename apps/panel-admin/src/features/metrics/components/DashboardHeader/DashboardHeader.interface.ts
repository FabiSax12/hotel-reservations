import type { MetricsDateRange } from "../../domain/metrics.types";

export interface DashboardHeaderProps {
  dateRange: MetricsDateRange;
  onDateRangeChange: (range: MetricsDateRange) => void;
  titlePrefix: string;
  titleAccent: string;
  subtitle: string;
  exportLabel: string;
  ariaDateRange: string;
}
