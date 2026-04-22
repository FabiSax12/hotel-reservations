/**
 * @file CalendarDay.tsx — A single day button inside the calendar grid.
 */

"use client";

import { CALENDAR_STYLES as S } from "../theme/calendar.theme";
import { SEARCH_BAR_UI_CONSTANTS } from "../constants/ui";

const C = SEARCH_BAR_UI_CONSTANTS.DATES;

interface CalendarInvalidState { dayStr: string; isFading: boolean; }

interface CalendarDayProps {
  d: number;
  dayStr: string;
  isPast: boolean;
  isStart: boolean;
  isEnd: boolean;
  isSelected: boolean;
  isToday: boolean;
  isHovered: boolean;
  isInvalid: boolean;
  isFading: boolean;
  isHero: boolean;
  inVal: number;
  outVal: number;
  onPickDate: (dayStr: string) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function CalendarDay({
  d, dayStr, isPast, isStart, isEnd, isSelected, isToday,
  isHovered, isInvalid, isFading, isHero,
  inVal, outVal,
  onPickDate, onMouseEnter, onMouseLeave,
}: CalendarDayProps) {
  return (
    <button
      key={d}
      disabled={isPast}
      onClick={(e) => { e.stopPropagation(); onPickDate(dayStr); }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={S.dayBtn(isHero, isPast, isStart, isEnd, isSelected, isToday, isHovered)}
    >
      {isStart && outVal > 0 && outVal !== inVal && <div className={S.rangeHighlightStart}></div>}
      {isEnd && inVal > 0 && outVal !== inVal && <div className={S.rangeHighlightEnd}></div>}
      {isSelected && !isStart && !isEnd && <div className={S.rangeHighlightMid}></div>}

      {!isSelected && !isStart && !isEnd && !isPast && (
        <div className={S.hoverRing}></div>
      )}

      {isStart && <div className={S.selectedStart}></div>}
      {isEnd && !isStart && <div className={S.selectedEnd}></div>}
      {isStart && isEnd && <div className={S.selectedStart}></div>}

      {isInvalid && (
        <div className={S.invalidDot(isFading)}></div>
      )}

      {isStart && isHovered && !isInvalid && (
        <div className={S.tooltip(isHero)}>
          {C.CHECK_IN_LABEL}
          <div className={S.tooltipArrow}></div>
        </div>
      )}
      {isEnd && !isStart && isHovered && !isInvalid && (
        <div className={S.tooltip(isHero)}>
          {C.CHECK_OUT_LABEL}
          <div className={S.tooltipArrow}></div>
        </div>
      )}

      <span className={S.dayNumber(isInvalid)}>{d}</span>
    </button>
  );
}
