/**
 * @file CalendarDay.tsx — A single day button inside the calendar grid.
 *
 * Renders the day number along with several overlay layers that indicate
 * the current visual state of the day:
 *
 *  - **Range highlight** (`rangeHighlightStart` / `End` / `Mid`) —
 *    Colored background strips that connect the start and end dates
 *    visually across the grid.
 *  - **Hover ring** — A subtle ring that appears on mouse-over for
 *    available dates, giving tactile feedback.
 *  - **Selected indicator** (`selectedStart` / `selectedEnd`) —
 *    Prominent circular backgrounds marking the chosen check-in/out days.
 *  - **Invalid dot** — A red pulsing dot that flashes when the user
 *    tries to pick an invalid date (e.g. check-in after check-out).
 *  - **Tooltip** — "Llegada" or "Salida" label shown on hover over
 *    the selected start/end date.
 *
 * All styling classes come from the calendar theme; this component has
 * no hardcoded class strings.
 */

"use client";

import { CALENDAR_STYLES as S } from "../theme/calendar.theme";
import { SEARCH_BAR_UI_CONSTANTS } from "../constants/ui";

const C = SEARCH_BAR_UI_CONSTANTS.DATES;

/** Shared invalid-state shape used by the calendar family of components. */
interface CalendarInvalidState { dayStr: string; isFading: boolean; }

interface CalendarDayProps {
  /** Day-of-month number (1-31). */
  d: number;
  /** ISO date string for this day (e.g. "2026-10-15"). */
  dayStr: string;
  /** Whether this date is in the past (disabled). */
  isPast: boolean;
  /** Whether this is the selected check-in date. */
  isStart: boolean;
  /** Whether this is the selected check-out date. */
  isEnd: boolean;
  /** Whether this day falls within the selected range (inclusive of endpoints). */
  isSelected: boolean;
  /** Whether this is today's date. */
  isToday: boolean;
  /** Whether the mouse is currently over this day. */
  isHovered: boolean;
  /** Whether this day just received an invalid-pick animation. */
  isInvalid: boolean;
  /** Whether the invalid dot animation is in its fade-out phase. */
  isFading: boolean;
  /** Hero vs compact sizing. */
  isHero: boolean;
  /** Timestamp of the current check-in date (0 if unset). */
  inVal: number;
  /** Timestamp of the current check-out date (0 if unset). */
  outVal: number;
  /** Callback when this day is clicked. */
  onPickDate: (dayStr: string) => void;
  /** Callback on mouse-enter. */
  onMouseEnter: () => void;
  /** Callback on mouse-leave. */
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
      {/* Range highlight strips: left-half for start, right-half for end, full for mid */}
      {isStart && outVal > 0 && outVal !== inVal && <div className={S.rangeHighlightStart}></div>}
      {isEnd && inVal > 0 && outVal !== inVal && <div className={S.rangeHighlightEnd}></div>}
      {isSelected && !isStart && !isEnd && <div className={S.rangeHighlightMid}></div>}

      {/* Hover ring (only for available, non-selected days) */}
      {!isSelected && !isStart && !isEnd && !isPast && (
        <div className={S.hoverRing}></div>
      )}

      {/* Prominent circular selection indicator */}
      {isStart && <div className={S.selectedStart}></div>}
      {isEnd && !isStart && <div className={S.selectedEnd}></div>}
      {isStart && isEnd && <div className={S.selectedStart}></div>}

      {/* Flash-and-fade invalid pick animation */}
      {isInvalid && (
        <div className={S.invalidDot(isFading)}></div>
      )}

      {/* Tooltips on hover over selected start/end dates */}
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
