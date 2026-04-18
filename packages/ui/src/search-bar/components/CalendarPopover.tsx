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
}

export function CalendarPopover({ checkIn, checkOut, invalidState, onPickDate, variant }: CalendarPopoverProps) {
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

  return (
    <div className={`flex ${S.padding(isHero)} ${S.wrapper(isHero)}`}>
      {([0, 1] as const).map((monthIndexLocal) => (
        <CalendarMonth
          key={monthIndexLocal}
          monthIndexLocal={monthIndexLocal}
          absoluteMonthOffset={currentMonthOffset + monthIndexLocal}
          currentMonthOffset={currentMonthOffset}
          today={today}
          inVal={inVal}
          outVal={outVal}
          invalidState={invalidState}
          hoveredDay={hoveredDay}
          isHero={isHero}
          onPickDate={onPickDate}
          onHoverDay={setHoveredDay}
          onPrev={() => setCurrentMonthOffset(prev => Math.max(0, prev - 1))}
          onNext={() => setCurrentMonthOffset(prev => Math.min(22, prev + 1))}
        />
      ))}
    </div>
  );
}
