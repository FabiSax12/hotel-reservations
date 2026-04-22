/**
 * @file CalendarMonth.tsx — One month column inside the grid.
 */

"use client";

import { CALENDAR_STYLES as S } from "./Calendar.theme";
import { CalendarDay } from "./CalendarDay";

import { UI_PACKAGE_CONSTANTS } from "../../constants/ui.constants";

const C = UI_PACKAGE_CONSTANTS.CALENDAR;
const DAYS_HEADER = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];

interface CalendarInvalidState { dayStr: string; isFading: boolean; }

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
  onPickDate: (dayStr: string) => void;
  onHoverDay: (dayStr: string | null) => void;
  onPrev: () => void;
  onNext: () => void;
  startLabel?: string;
  endLabel?: string;
}

export function CalendarMonth({
  monthIndexLocal, absoluteMonthOffset, currentMonthOffset, today,
  inVal, outVal, invalidState, hoveredDay, isHero,
  onPickDate, onHoverDay, onPrev, onNext,
  startLabel, endLabel,
}: CalendarMonthProps) {
  const targetDate = new Date(today.getFullYear(), today.getMonth() + absoluteMonthOffset, 1);
  const year = targetDate.getFullYear();
  const month = targetDate.getMonth();

  const monthStr = new Intl.DateTimeFormat(C.DEFAULT_LOCALE, { month: UI_PACKAGE_CONSTANTS.DATE_FORMATS.MONTH_LONG as any }).format(targetDate);
  const monthHeader = monthStr.charAt(0).toUpperCase() + monthStr.slice(1);

  const showYear = year !== today.getFullYear() || (absoluteMonthOffset > 0 && month === 0);

  const firstDayOfWeek = targetDate.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className={S.monthCol}>
      <div className={S.monthHeader}>
        {monthIndexLocal === 0 ? (
          <button
            type="button"
            disabled={currentMonthOffset === 0}
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className={S.navBtn}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox={S.icons.prev.viewBox} 
              fill="none" 
              stroke="currentColor" 
              strokeWidth={S.icons.prev.strokeWidth} 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d={S.icons.prev.path}/>
            </svg>
          </button>
        ) : <div className="w-8"></div>}

        <h3 className={S.monthTitle(isHero)}>
          {monthHeader} {showYear ? year : ""}
        </h3>

        {monthIndexLocal === 1 ? (
          <button
            type="button"
            disabled={currentMonthOffset >= C.MAX_MONTHS - 2}
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className={S.navBtn}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox={S.icons.next.viewBox} 
              fill="none" 
              stroke="currentColor" 
              strokeWidth={S.icons.next.strokeWidth} 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d={S.icons.next.path}/>
            </svg>
          </button>
        ) : <div className="w-8"></div>}
      </div>

      <div className={S.daysHeader(isHero)}>
        {DAYS_HEADER.map(d => <div key={d}>{d}</div>)}
      </div>

      <div className={S.daysGrid(isHero)}>
        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {dates.map((d) => {
          const dayStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
          const currDate = new Date(year, month, d);
          const currVal = currDate.getTime();

          const isPast = currDate < today;
          const isStart = currVal === inVal;
          const isEnd = currVal === outVal;
          const isSelected = isStart || isEnd || (inVal > 0 && outVal > 0 && currVal > inVal && currVal < outVal);
          const isToday = currVal === today.getTime();
          const isHovered = hoveredDay === dayStr;
          const isInvalid = invalidState?.dayStr === dayStr;
          const isFading = isInvalid && !!invalidState?.isFading;

          return (
            <CalendarDay
              key={d}
              d={d}
              dayStr={dayStr}
              isPast={isPast}
              isStart={isStart}
              isEnd={isEnd}
              isSelected={isSelected}
              isToday={isToday}
              isHovered={isHovered}
              isInvalid={isInvalid}
              isFading={isFading}
              isHero={isHero}
              inVal={inVal}
              outVal={outVal}
              onPickDate={onPickDate}
              onMouseEnter={() => !isPast && onHoverDay(dayStr)}
              onMouseLeave={() => !isPast && onHoverDay(null)}
              startLabel={startLabel}
              endLabel={endLabel}
            />
          );
        })}
      </div>
    </div>
  );
}
