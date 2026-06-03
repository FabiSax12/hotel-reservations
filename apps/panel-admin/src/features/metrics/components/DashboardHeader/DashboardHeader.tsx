"use client";

import { DateField, DateRangePicker as HeroDateRangePicker, RangeCalendar } from "@heroui/react";
import { DASHBOARD_HEADER_STYLES as STYLES } from "./DashboardHeader.styles";
import type { DashboardHeaderProps } from "./DashboardHeader.interface";
import { useDashboardDatePicker } from "../../hooks/useDashboardDatePicker";

export function DashboardHeader({
  dateRange,
  onDateRangeChange,
  titlePrefix,
  titleAccent,
  subtitle,
  ariaDateRange,
}: DashboardHeaderProps) {
  const { pickerValue, handleDateChange } = useDashboardDatePicker(dateRange, onDateRangeChange);

  return (
    <div className={STYLES.wrapper}>
      <div className={STYLES.left}>
        <div className={STYLES.titleRow}>
          <h1 className={STYLES.titlePrefix}>{titlePrefix}</h1>
          <span className={STYLES.titleAccent}>{titleAccent}</span>
        </div>
        <p className={STYLES.subtitle}>{subtitle}</p>
      </div>

      <div className={STYLES.controls}>
        <HeroDateRangePicker
          value={pickerValue}
          onChange={handleDateChange}
          aria-label={ariaDateRange}
        >
          <DateField.Group fullWidth className={STYLES.group}>
            <DateField.Input slot="start">
              {(segment) => <DateField.Segment segment={segment} className={STYLES.segment} />}
            </DateField.Input>
            <HeroDateRangePicker.RangeSeparator />
            <DateField.Input slot="end">
              {(segment) => <DateField.Segment segment={segment} className={STYLES.segment} />}
            </DateField.Input>
            <DateField.Suffix>
              <HeroDateRangePicker.Trigger>
                <HeroDateRangePicker.TriggerIndicator className={STYLES.triggerIndicator} />
              </HeroDateRangePicker.Trigger>
            </DateField.Suffix>
          </DateField.Group>
          <HeroDateRangePicker.Popover>
            <RangeCalendar aria-label={ariaDateRange}>
              <RangeCalendar.Header>
                <RangeCalendar.YearPickerTrigger className={STYLES.yearPickerTrigger}>
                  <RangeCalendar.YearPickerTriggerHeading className={STYLES.yearPickerTriggerHeading} />
                  <RangeCalendar.YearPickerTriggerIndicator className={STYLES.yearPickerTriggerIndicator} />
                </RangeCalendar.YearPickerTrigger>
                <RangeCalendar.NavButton slot="previous" className={STYLES.navButton} />
                <RangeCalendar.NavButton slot="next" className={STYLES.navButton} />
              </RangeCalendar.Header>
              <RangeCalendar.Grid>
                <RangeCalendar.GridHeader>
                  {(day) => <RangeCalendar.HeaderCell>{day}</RangeCalendar.HeaderCell>}
                </RangeCalendar.GridHeader>
                <RangeCalendar.GridBody>
                  {(date) => <RangeCalendar.Cell date={date} className={STYLES.calendarCell} />}
                </RangeCalendar.GridBody>
              </RangeCalendar.Grid>
              <RangeCalendar.YearPickerGrid>
                <RangeCalendar.YearPickerGridBody>
                  {({ year, formattedYear }) => (
                    <RangeCalendar.YearPickerCell year={year} className={STYLES.yearPickerCell}>
                      {formattedYear}
                    </RangeCalendar.YearPickerCell>
                  )}
                </RangeCalendar.YearPickerGridBody>
              </RangeCalendar.YearPickerGrid>
            </RangeCalendar>
          </HeroDateRangePicker.Popover>
        </HeroDateRangePicker>
      </div>
    </div>
  );
}
