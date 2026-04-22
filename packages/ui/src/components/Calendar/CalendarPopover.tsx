/**
 * @file CalendarPopover.tsx — Dual-month date picker dropdown.
 */

"use client";

import { useState } from "react";
import { parseDateHelper } from "../../utils/date.utils";
import { CALENDAR_STYLES as S } from "./Calendar.theme";
import { CalendarMonth } from "./CalendarMonth";

interface CalendarInvalidState {
  dayStr: string;
  isFading: boolean;
}

interface CalendarPopoverProps {
  checkIn: string;
  checkOut: string;
  invalidState: CalendarInvalidState | null;
  onPickDate: (dayStr: string) => void;
  variant?: "compact" | "hero";
  startLabel?: string;
  endLabel?: string;
}

export function CalendarPopover({
  checkIn,
  checkOut,
  invalidState,
  onPickDate,
  variant,
  startLabel,
  endLabel,
}: CalendarPopoverProps) {
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);
  const [currentMonthOffset, setCurrentMonthOffset] = useState(0);

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
          onPrev={() => setCurrentMonthOffset((prev) => Math.max(0, prev - 1))}
          onNext={() => setCurrentMonthOffset((prev) => Math.min(22, prev + 1))}
          startLabel={startLabel}
          endLabel={endLabel}
        />
      ))}
    </div>
  );
}
