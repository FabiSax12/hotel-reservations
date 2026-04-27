/**
 * @file CalendarPopover.tsx — Dual-month date picker dropdown.
 */

"use client";

import { useState } from "react";
import { parseDateHelper } from "../../utils/date.utils";
import { CALENDAR_STYLES as S } from "./Calendar.theme";
import { CalendarMonth } from "./CalendarMonth";
import { UI_VARIANTS } from "../../constants/ui.constants";

interface CalendarInvalidState {
  dayStr: string;
  isFading: boolean;
}

interface CalendarPopoverProps {
  checkIn: string;
  checkOut: string;
  invalidState: CalendarInvalidState | null;
  onPickDate: (dayStr: string) => void;
  variant?: (typeof UI_VARIANTS)[keyof typeof UI_VARIANTS];
  startLabel?: string;
  endLabel?: string;
  /** Optional array of allowed ISO dates. If provided, all other dates are unselectable. */
  availableDates?: string[];
  /** Optional content to render below the calendar (e.g., a confirm button). */
  bottomContent?: React.ReactNode;
  /** Optional override for the root container classes */
  className?: string;
  /** Whether to render inline in the normal document flow. */
  isInline?: boolean;
}

export function CalendarPopover({
  checkIn,
  checkOut,
  invalidState,
  onPickDate,
  variant,
  startLabel,
  endLabel,
  availableDates,
  bottomContent,
  className,
  isInline = false,
}: CalendarPopoverProps) {
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);
  const [currentMonthOffset, setCurrentMonthOffset] = useState(0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const inVal = parseDateHelper(checkIn);
  const outVal = parseDateHelper(checkOut);
  const isHero = variant === UI_VARIANTS.HERO;
  const wrapperClasses = isInline ? S.inlineWrapper(isHero) : S.wrapper(isHero);

  return (
    <div className={`${S.frame(isHero)} ${S.padding(isHero)} ${wrapperClasses} ${className ?? ""}`}>
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
          onPrev={() => setCurrentMonthOffset((prev) => Math.max(0, prev - 1))}
          onNext={() => setCurrentMonthOffset((prev) => Math.min(22, prev + 1))}
          startLabel={startLabel}
          endLabel={endLabel}
          availableDates={availableDates}
        />
      ))}
      {bottomContent && (
        <div className="w-full mt-4 pt-4 border-t border-neutral-100">
          {bottomContent}
        </div>
      )}
    </div>
  );
}
