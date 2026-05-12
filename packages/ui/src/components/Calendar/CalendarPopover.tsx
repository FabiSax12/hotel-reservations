/**
 * @file CalendarPopover.tsx — Dual-month date picker dropdown.
 */

"use client";

import { useState } from "react";
import { parseDateHelper } from "../../utils/date.utils";
import { CALENDAR_STYLES as S } from "./Calendar.theme";
import { CalendarMonth } from "./CalendarMonth";
import { UI_VARIANTS, UI_PACKAGE_CONSTANTS } from "../../constants/ui.constants";
import type { CalendarPopoverProps } from "../../types/calendar.types";

export function CalendarPopover({
  checkIn,
  checkOut,
  invalidState,
  hideTooltips,
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
          hideTooltips={hideTooltips}
          onPickDate={onPickDate}
          onHoverDay={setHoveredDay}
          onPrev={() => setCurrentMonthOffset((prev) => Math.max(0, prev - 1))}
          onNext={() => setCurrentMonthOffset((prev) => Math.min(UI_PACKAGE_CONSTANTS.CALENDAR.MAX_MONTHS - 2, prev + 1))}
          startLabel={startLabel}
          endLabel={endLabel}
          availableDates={availableDates}
        />
      ))}
      {bottomContent && (
        <div className={S.bottomContentWrapper}>
          {bottomContent}
        </div>
      )}
    </div>
  );
}
