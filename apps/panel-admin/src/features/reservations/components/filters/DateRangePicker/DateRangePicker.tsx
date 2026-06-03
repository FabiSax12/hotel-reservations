"use client";

import { DateField, DateRangePicker as HeroDateRangePicker, RangeCalendar } from "@heroui/react";
import { parseDate } from "@internationalized/date";
import { useI18n } from "@/locales";
import type { DateRange, DateRangePickerProps } from "./DateRangePicker.interface";
import { DATE_RANGE_PICKER_STYLES as STYLES } from "./DateRangePicker.styles";

export function DateRangePicker({ checkIn, checkOut, onChange }: DateRangePickerProps) {
  const { t } = useI18n();

  const value: DateRange =
    checkIn && checkOut ? { start: parseDate(checkIn), end: parseDate(checkOut) } : null;

  const handleChange = (range: DateRange) => {
    onChange(range?.start.toString() ?? "", range?.end.toString() ?? "");
  };

  return (
    <HeroDateRangePicker
      value={value}
      onChange={handleChange}
      aria-label={t.RESERVATIONS.FILTERS.ARIA_LABEL_DATE_RANGE}
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
        <RangeCalendar aria-label={t.RESERVATIONS.FILTERS.DATE_RANGE_PICKER_LABEL}>
          <RangeCalendar.Header>
            <RangeCalendar.YearPickerTrigger className={STYLES.yearPickerTrigger}>
              <RangeCalendar.YearPickerTriggerHeading className={STYLES.yearPickerTriggerHeading} />
              <RangeCalendar.YearPickerTriggerIndicator
                className={STYLES.yearPickerTriggerIndicator}
              />
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
  );
}
