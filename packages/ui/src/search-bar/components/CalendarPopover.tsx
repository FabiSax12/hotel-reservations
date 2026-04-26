/**
 * @file CalendarPopover.tsx — Dual-month date picker dropdown.
 *
 * Owns the local state for which month pair is currently visible
 * (`currentMonthOffset`) and which day is being hovered (`hoveredDay`).
 *
 * Renders two side-by-side {@link CalendarMonth} columns. In hero mode
 * the calendar is rendered inside a floating panel above the search bar;
 * in compact mode it drops below the bar as an absolute-positioned popover.
 *
 * Check-in/check-out date strings are converted to timestamps via
 * {@link parseDateHelper} and passed down to each month, which in turn
 * computes per-day boolean flags for CalendarDay.
 */

"use client";

import { useState } from "react";
import { parseDateHelper } from "../utils/dateUtils";
import { CALENDAR_STYLES as S } from "../theme/calendar.theme";
import { CalendarMonth } from "./CalendarMonth";
import {
  CALENDAR_MAX_MONTHS,
  CALENDAR_MIN_PAST_OFFSET,
  CALENDAR_DEFAULT_MONTH_COUNT,
} from "../constants/calendar.constants";

/** Shared invalid-state shape used by the calendar family of components. */
interface CalendarInvalidState { dayStr: string; isFading: boolean; }

interface CalendarPopoverProps {
  /** Currently active section in the parent search bar (used for tooltip context). */
  activeMode: string | null;
  /** ISO check-in date string, or "" if unset. */
  checkIn: string;
  /** ISO check-out date string, or "" if unset. */
  checkOut: string;
  /** Active invalid-pick animation state, or null. */
  invalidState: CalendarInvalidState | null;
  /** Callback when a day is clicked. */
  onPickDate: (dayStr: string) => void;
  /** Visual variant controlling padding and sizing. */
  variant?: "compact" | "hero";
  /** Number of months to display side-by-side. Default: 2. */
  monthCount?: number;
  /** Allow selection of dates in the past. Default: false. */
  allowPast?: boolean;
}

export function CalendarPopover({ 
  checkIn, 
  checkOut, 
  invalidState, 
  onPickDate, 
  variant,
  monthCount = CALENDAR_DEFAULT_MONTH_COUNT,
  allowPast = false,
}: CalendarPopoverProps) {
  /** ISO string of the day currently being hovered, or null. */
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);
  /** How many months forward from today the left column starts at. */
  const [currentMonthOffset, setCurrentMonthOffset] = useState(0);

  // Build a "today" with time zeroed to midnight for clean date comparisons
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const inVal = parseDateHelper(checkIn);
  const outVal = parseDateHelper(checkOut);
  const isHero = variant === "hero";
  const isCompactSingleMonth = !isHero && monthCount === 1;

  // Create array of month indices: [0, 1] for 2 months, [0] for 1 month, etc.
  const monthIndices = Array.from({ length: monthCount }, (_, i) => i);

  const wrapperClasses = isCompactSingleMonth
    ? "w-[360px] absolute top-[100%] mt-4 left-1/2 -translate-x-1/2 bg-white rounded-3xl shadow-[0_24px_60px_rgba(0,0,0,0.15)] border border-neutral-200 z-50 animate-in fade-in slide-in-from-top-4 duration-300 p-4"
    : `flex ${S.padding(isHero)} ${S.wrapper(isHero)}`;

  return (
    <div className={wrapperClasses}>
      {monthIndices.map((monthIndexLocal) => (
        <CalendarMonth
          key={monthIndexLocal}
          monthIndexLocal={monthIndexLocal}
          monthCount={monthCount}
          absoluteMonthOffset={currentMonthOffset + monthIndexLocal}
          currentMonthOffset={currentMonthOffset}
          today={today}
          inVal={inVal}
          outVal={outVal}
          invalidState={invalidState}
          hoveredDay={hoveredDay}
          isHero={isHero}
          allowPast={allowPast}
          onPickDate={onPickDate}
          onHoverDay={setHoveredDay}
          onPrev={() => setCurrentMonthOffset(prev => Math.max(allowPast ? CALENDAR_MIN_PAST_OFFSET : 0, prev - 1))}
          onNext={() => setCurrentMonthOffset(prev => Math.min(CALENDAR_MAX_MONTHS - monthCount, prev + 1))}
        />
      ))}
    </div>
  );
}
