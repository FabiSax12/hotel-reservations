/**
 * @file CalendarMonth.tsx — One month column inside the grid.
 */

"use client";

import { CALENDAR_STYLES as S } from "./Calendar.theme";
import { CalendarDay } from "./CalendarDay";
import { MonthHeader } from "./MonthHeader";
import { UI_PACKAGE_CONSTANTS } from "../../constants/ui.constants";
import { getDayHeaders, getMonthHeader, getDaysInMonth } from "../../utils/calendar.utils";
import { useI18n } from "@hotel/i18n";
import type { CalendarInvalidState } from "../../types/calendar.types";

const C = UI_PACKAGE_CONSTANTS.CALENDAR;

interface CalendarMonthProps {
  monthIndexLocal: 0 | 1;
  absoluteMonthOffset: number;
  currentMonthOffset: number;
  today: Date;
  inVal: number;
  outVal: number;
  invalidState: CalendarInvalidState | null;
  hoveredDay: string | null;
  isHero: boolean;
  hideTooltips?: boolean;
  onPickDate: (dayStr: string) => void;
  onHoverDay: (dayStr: string | null) => void;
  onPrev: () => void;
  onNext: () => void;
  startLabel?: string;
  endLabel?: string;
  availableDates?: string[];
}

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
  const targetDate = new Date(today.getFullYear(), today.getMonth() + absoluteMonthOffset, 1);
  const year = targetDate.getFullYear();
  const month = targetDate.getMonth();

  const { locale } = useI18n();

  const daysHeader = getDayHeaders(locale);
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
        {daysHeader.map((d) => <div key={d}>{d}</div>)}
      </div>

      <div className={S.daysGrid(isHero)}>
        {Array.from({ length: firstDayOfWeek }).map((_, i) => <div key={`empty-${i}`} />)}
        {dates.map((d) => {
          const dayStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
          const currDate = new Date(year, month, d);
          const currVal = currDate.getTime();
          const isPast = currDate < today;
          const isStart = currVal === inVal;
          const isEnd = currVal === outVal;
          const isSelected = isStart || isEnd || (inVal > 0 && outVal > 0 && currVal > inVal && currVal < outVal);
          const isToday = currVal === today.getTime();
          const isHovered = hoveredDay === dayStr;
          const isInvalid = !!invalidState?.dayStrs.includes(dayStr);
          const isFading = isInvalid && !!invalidState?.isFading;

          return (
            <CalendarDay key={d} d={d} dayStr={dayStr}
              isPast={isPast} isStart={isStart} isEnd={isEnd}
              isSelected={isSelected} isToday={isToday} isHovered={isHovered}
              isInvalid={isInvalid} isFading={isFading}
              invalidAnimationKey={isInvalid ? invalidState?.animationKey : undefined}
              isHero={isHero} hideTooltips={hideTooltips}
              inVal={inVal} outVal={outVal} onPickDate={onPickDate}
              onMouseEnter={() => !isPast && onHoverDay(dayStr)}
              onMouseLeave={() => !isPast && onHoverDay(null)}
              startLabel={startLabel} endLabel={endLabel}
              isAvailable={availableDates ? availableDates.includes(dayStr) : true}
            />
          );
        })}
      </div>
    </div>
  );
}
