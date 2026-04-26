"use client";

import { DateField, DateRangePicker as HeroDateRangePicker, RangeCalendar } from "@heroui/react";
import { parseDate } from "@internationalized/date";
import type { DateValue } from "@internationalized/date";
import { useI18n } from "@/locales";
import { DATE_RANGE_PICKER_STYLES as S } from "./DateRangePicker.styles";

type DateRange = { start: DateValue; end: DateValue } | null;

interface DateRangePickerProps {
  checkIn: string;
  checkOut: string;
  onChange: (checkIn: string, checkOut: string) => void;
}

export function DateRangePicker({ checkIn, checkOut, onChange }: DateRangePickerProps) {
  const { t } = useI18n();

  const value: DateRange =
    checkIn && checkOut ? { start: parseDate(checkIn), end: parseDate(checkOut) } : null;

  const handleChange = (range: DateRange) => {
    onChange(range?.start.toString() ?? "", range?.end.toString() ?? "");
  };

  return (
    <HeroDateRangePicker value={value} onChange={handleChange}>
      <DateField.Group fullWidth className={S.group}>
        <DateField.Input slot="start">
          {(segment) => <DateField.Segment segment={segment} />}
        </DateField.Input>
        <HeroDateRangePicker.RangeSeparator />
        <DateField.Input slot="end">
          {(segment) => <DateField.Segment segment={segment} />}
        </DateField.Input>
        <DateField.Suffix>
          <HeroDateRangePicker.Trigger>
            <HeroDateRangePicker.TriggerIndicator />
          </HeroDateRangePicker.Trigger>
        </DateField.Suffix>
      </DateField.Group>
      <HeroDateRangePicker.Popover>
        <RangeCalendar aria-label={t.RESERVATIONS.FILTERS.DATE_RANGE_PICKER_LABEL}>
          <RangeCalendar.Header>
            <RangeCalendar.YearPickerTrigger>
              <RangeCalendar.YearPickerTriggerHeading />
              <RangeCalendar.YearPickerTriggerIndicator />
            </RangeCalendar.YearPickerTrigger>
            <RangeCalendar.NavButton slot="previous" />
            <RangeCalendar.NavButton slot="next" />
          </RangeCalendar.Header>
          <RangeCalendar.Grid>
            <RangeCalendar.GridHeader>
              {(day) => <RangeCalendar.HeaderCell>{day}</RangeCalendar.HeaderCell>}
            </RangeCalendar.GridHeader>
            <RangeCalendar.GridBody>
              {(date) => <RangeCalendar.Cell date={date} className={S.calendarCell} />}
            </RangeCalendar.GridBody>
          </RangeCalendar.Grid>
        </RangeCalendar>
      </HeroDateRangePicker.Popover>
    </HeroDateRangePicker>
  );
}