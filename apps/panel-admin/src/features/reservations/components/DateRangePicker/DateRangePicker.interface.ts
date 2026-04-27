import type { DateValue } from "@internationalized/date";

export type DateRange = { start: DateValue; end: DateValue } | null;

export interface DateRangePickerProps {
  checkIn: string;
  checkOut: string;
  onChange: (checkIn: string, checkOut: string) => void;
}
