/**
 * @file CalendarDay.tsx — A single day button inside the calendar grid.
 */

"use client";

import { CALENDAR_STYLES as S } from "./Calendar.theme";
import type { CalendarDayProps } from "../../types/calendar.types";

export function CalendarDay({
  d,
  dayStr,
  isPast,
  isStart,
  isEnd,
  hasRange,
  isSelected,
  isToday,
  isHovered,
  isInvalid,
  isFading,
  invalidAnimationKey,
  isHero,
  hideTooltips,
  onPickDate,
  onMouseEnter,
  onMouseLeave,
  startLabel,
  endLabel,
  isAvailable = true,
}: CalendarDayProps) {
  return (
    <button
      key={d}
      disabled={isPast || !isAvailable}
      onClick={(e) => {
        e.stopPropagation();
        onPickDate(dayStr);
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`${S.dayBtn(isHero, isPast, isStart, isEnd, hasRange, isSelected, isToday, isHovered)} ${!isAvailable && !isPast ? "opacity-30 cursor-not-allowed" : ""}`}
      type="button"
    >
      {/* Visual stacking order (bottom → top): hoverRing < selectedStart/End < invalidDot < tooltip < dayNumber */}

      {/* 1. Hover ring — only visible when the day is not already selected or past */}
      {!isSelected && !isStart && !isEnd && !isPast && <div className={S.hoverRing}></div>}

      {/* 2. Start / end selection circles — rendered for every day but only visible when active */}
      <div
        className={`${S.selectedStart} ${isStart && !isEnd ? "bg-gold-500 ring-gold-500 ring-offset-forest-900" : "bg-transparent ring-transparent ring-offset-transparent"}`}
      ></div>
      <div
        className={`${S.selectedEnd} ${isEnd && !isStart ? "bg-gold-500 ring-gold-500 ring-offset-forest-900" : "bg-transparent ring-transparent ring-offset-transparent"}`}
      ></div>

      {/* 3. Invalid indicator — red dot with shake animation when the user picks a blocked date */}
      {isInvalid && (
        <div key={`invalid-${invalidAnimationKey}`} className={S.invalidDot(isFading)}></div>
      )}

      {/* 4. Tooltip — appears on hover for the start or end of the selected range */}
      {!hideTooltips && isStart && isHovered && !isInvalid && (
        <div className={S.tooltip(isHero)}>
          {startLabel}
          <div className={S.tooltipArrow}></div>
        </div>
      )}
      {!hideTooltips && isEnd && !isStart && isHovered && !isInvalid && (
        <div className={S.tooltip(isHero)}>
          {endLabel}
          <div className={S.tooltipArrow}></div>
        </div>
      )}

      {/* 5. Day number — highest z-index so it sits above all decorative layers */}
      <span className={S.dayNumber(isInvalid)}>{d}</span>
    </button>
  );
}
