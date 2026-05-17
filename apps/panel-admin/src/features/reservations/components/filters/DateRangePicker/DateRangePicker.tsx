"use client";

import { DateField, DateRangePicker as HeroDateRangePicker, RangeCalendar } from "@heroui/react";
import { parseDate } from "@internationalized/date";
import { useI18n } from "@/locales";
import type { DateRange, DateRangePickerProps } from "./DateRangePicker.interface";
import { DATE_RANGE_PICKER_STYLES as S } from "./DateRangePicker.styles";

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
      <DateField.Group fullWidth className={S.group}>
        <DateField.Input slot="start">
          {(segment) => <DateField.Segment segment={segment} className={S.segment} />}
        </DateField.Input>
        <HeroDateRangePicker.RangeSeparator />
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
        <RangeCalendar aria-label={t.RESERVATIONS.FILTERS.DATE_RANGE_PICKER_LABEL}>
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
  );
}
