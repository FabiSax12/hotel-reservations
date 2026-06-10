import { parseDate } from "@internationalized/date";
import type { MetricsDateRange } from "../domain/metricsTypes";

export type HeroDateRange = {
  start: ReturnType<typeof parseDate>;
  end: ReturnType<typeof parseDate>;
} | null;

export function useDashboardDatePicker(
  dateRange: MetricsDateRange,
  onDateRangeChange: (next: MetricsDateRange) => void,
) {
  const pickerValue: HeroDateRange =
    dateRange.start && dateRange.end
      ? { start: parseDate(dateRange.start), end: parseDate(dateRange.end) }
      : null;

  const handleDateChange = (range: HeroDateRange) => {
    if (!range) return;
    onDateRangeChange({
      start: range.start.toString(),
      end: range.end.toString(),
    });
  };

  return { pickerValue, handleDateChange };
}
