"use client";

import { DateField, DateRangePicker as HeroDateRangePicker, RangeCalendar } from "@heroui/react";
import { parseDate } from "@internationalized/date";
import { Download } from "lucide-react";
import { DASHBOARD_HEADER_STYLES as S } from "./DashboardHeader.styles";
import type { DashboardHeaderProps } from "./DashboardHeader.interface";
import type { MetricsDateRange } from "../../domain/metrics.types";

type HeroDateRange = { start: ReturnType<typeof parseDate>; end: ReturnType<typeof parseDate> } | null;

export function DashboardHeader({
  dateRange,
  onDateRangeChange,
  titlePrefix,
  titleAccent,
  subtitle,
  exportLabel,
  ariaDateRange,
}: DashboardHeaderProps) {
  const pickerValue: HeroDateRange =
    dateRange.start && dateRange.end
      ? { start: parseDate(dateRange.start), end: parseDate(dateRange.end) }
      : null;

  const handleDateChange = (range: HeroDateRange) => {
    if (!range) return;
    const next: MetricsDateRange = {
      start: range.start.toString(),
      end: range.end.toString(),
    };
    onDateRangeChange(next);
  };

  return (
    <div className={S.wrapper}>
      <div className={S.left}>
        <div className={S.titleRow}>
          <h1 className={S.titlePrefix}>{titlePrefix}</h1>
          <span className={S.titleAccent}>{titleAccent}</span>
        </div>
        <p className={S.subtitle}>{subtitle}</p>
      </div>

      <div className={S.controls}>
        <HeroDateRangePicker
          value={pickerValue}
          onChange={handleDateChange}
          aria-label={ariaDateRange}
        >
          <DateField.Group className={S.dateGroup}>
            <DateField.Input slot="start">
              {(segment) => <DateField.Segment segment={segment} className={S.segment} />}
            </DateField.Input>
            <HeroDateRangePicker.RangeSeparator className={S.separator} />
            <DateField.Input slot="end">
              {(segment) => <DateField.Segment segment={segment} className={S.segment} />}
            </DateField.Input>
            <DateField.Suffix>
              <HeroDateRangePicker.Trigger>
                <HeroDateRangePicker.TriggerIndicator className={S.triggerIndicator} />
              </HeroDateRangePicker.Trigger>
            </DateField.Suffix>
          </DateField.Group>
          <HeroDateRangePicker.Popover>
            <RangeCalendar aria-label={ariaDateRange}>
              <RangeCalendar.Header>
                <RangeCalendar.YearPickerTrigger className={S.yearPickerTrigger}>
                  <RangeCalendar.YearPickerTriggerHeading className={S.yearPickerTriggerHeading} />
                  <RangeCalendar.YearPickerTriggerIndicator className={S.yearPickerTriggerIndicator} />
                </RangeCalendar.YearPickerTrigger>
                <RangeCalendar.NavButton slot="previous" className={S.navButton} />
                <RangeCalendar.NavButton slot="next" className={S.navButton} />
              </RangeCalendar.Header>
              <RangeCalendar.Grid>
                <RangeCalendar.GridHeader>
                  {(day) => <RangeCalendar.HeaderCell>{day}</RangeCalendar.HeaderCell>}
                </RangeCalendar.GridHeader>
                <RangeCalendar.GridBody>
                  {(date) => <RangeCalendar.Cell date={date} className={S.calendarCell} />}
                </RangeCalendar.GridBody>
              </RangeCalendar.Grid>
              <RangeCalendar.YearPickerGrid>
                <RangeCalendar.YearPickerGridBody>
                  {({ year, formattedYear }) => (
                    <RangeCalendar.YearPickerCell year={year} className={S.yearPickerCell}>
                      {formattedYear}
                    </RangeCalendar.YearPickerCell>
                  )}
                </RangeCalendar.YearPickerGridBody>
              </RangeCalendar.YearPickerGrid>
            </RangeCalendar>
          </HeroDateRangePicker.Popover>
        </HeroDateRangePicker>

        <button type="button" className={S.exportButton} aria-label={exportLabel}>
          <Download className={S.exportIcon} aria-hidden="true" />
          {exportLabel}
        </button>
      </div>
    </div>
  );
}
