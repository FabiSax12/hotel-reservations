/**
 * @file CalendarMonth.tsx — One month column inside the grid.
 */

"use client";

import { useI18n } from "@hotel/i18n";
import { UI_PACKAGE_CONSTANTS } from "../../constants/ui.constants";
import type { CalendarMonthProps } from "../../types/calendar.types";
import { getDayHeaders, getDaysInMonth, getMonthHeader } from "../../utils/calendar.utils";
import { CALENDAR_STYLES as S } from "./Calendar.theme";
import { CalendarDay } from "./CalendarDay";
import { MonthHeader } from "./MonthHeader";

const C = UI_PACKAGE_CONSTANTS.CALENDAR;

export function CalendarMonth({
  monthIndexLocal,
  absoluteMonthOffset,
  currentMonthOffset,
  today,
  inVal,
  outVal,
  invalidState,
  hoveredDay,
  isHero,
  hideTooltips,
  onPickDate,
  onHoverDay,
  onPrev,
  onNext,
  startLabel,
  endLabel,
  availableDates,
}: CalendarMonthProps) {
  // Compute the month this column should display based on the global offset
  const targetDate = new Date(today.getFullYear(), today.getMonth() + absoluteMonthOffset, 1);
  const year = targetDate.getFullYear();
  const month = targetDate.getMonth();

  const { locale } = useI18n();

  const daysHeader = getDayHeaders(locale);
  // Show the year in the header when we're not in the current year, or when
  // January is displayed as the second month (visual clarity for year boundaries)
  const showYear = year !== today.getFullYear() || (absoluteMonthOffset > 0 && month === 0);
  const monthHeader = getMonthHeader(year, month, locale, showYear);
  const firstDayOfWeek = targetDate.getDay();
  const daysInMonth = getDaysInMonth(year, month);
  const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className={S.monthCol(isHero)}>
      <MonthHeader
        monthIndexLocal={monthIndexLocal}
        currentMonthOffset={currentMonthOffset}
        maxMonths={C.MAX_MONTHS}
        monthHeader={monthHeader}
        isHero={isHero}
        onPrev={onPrev}
        onNext={onNext}
      />

      <div className={S.daysHeader(isHero)}>
        {daysHeader.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className={S.daysGrid(isHero)}>
        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: empty spacers have no state
          <div key={`empty-${i}`} />
        ))}
        {dates.map((d) => {
          // Build ISO date string used as the canonical identifier throughout the calendar
          const dayStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
          const currDate = new Date(year, month, d);
          const currVal = currDate.getTime();
          const isPast = currDate < today;
          const isStart = currVal === inVal;
          const isEnd = currVal === outVal;
          const hasRange = inVal > 0 && outVal > 0 && inVal !== outVal;
          // A day is "selected" if it's the start, end, or any day inside the range
          const isSelected = isStart || isEnd || (hasRange && currVal > inVal && currVal < outVal);
          const isToday = currVal === today.getTime();
          const isHovered = hoveredDay === dayStr;
          const isInvalid = !!invalidState?.dayStrs.includes(dayStr);
          const isFading = isInvalid && !!invalidState?.isFading;

          return (
            <CalendarDay
              key={d}
              d={d}
              dayStr={dayStr}
              isPast={isPast}
              isStart={isStart}
              isEnd={isEnd}
              hasRange={hasRange}
              isSelected={isSelected}
              isToday={isToday}
              isHovered={isHovered}
              isInvalid={isInvalid}
              isFading={isFading}
              invalidAnimationKey={isInvalid ? invalidState?.animationKey : undefined}
              isHero={isHero}
              hideTooltips={hideTooltips}
              onPickDate={onPickDate}
              onMouseEnter={() => !isPast && onHoverDay(dayStr)}
              onMouseLeave={() => !isPast && onHoverDay(null)}
              startLabel={startLabel}
              endLabel={endLabel}
              isAvailable={availableDates ? availableDates.includes(dayStr) : true}
            />
          );
        })}
      </div>
    </div>
  );
}
