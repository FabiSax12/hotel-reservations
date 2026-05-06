/**
 * @file MonthHeader.tsx — Navigation header for a single calendar month.
 */

import { CALENDAR_STYLES as S } from "./Calendar.theme";

interface MonthHeaderProps {
  monthIndexLocal: 0 | 1;
  currentMonthOffset: number;
  maxMonths: number;
  monthHeader: string;
  isHero: boolean;
  onPrev: () => void;
  onNext: () => void;
}

export function MonthHeader({
  monthIndexLocal,
  currentMonthOffset,
  maxMonths,
  monthHeader,
  isHero,
  onPrev,
  onNext,
}: MonthHeaderProps) {
  return (
    <div className={S.monthHeader(isHero)}>
      {monthIndexLocal === 0 ? (
        <button type="button" disabled={currentMonthOffset === 0}
          onClick={(e) => { e.stopPropagation(); onPrev(); }} className={S.navBtn}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
            viewBox={S.icons.prev.viewBox} fill="none" stroke="currentColor"
            strokeWidth={S.icons.prev.strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <path d={S.icons.prev.path} />
          </svg>
        </button>
      ) : <div className={S.navSpacer} />}

      <h3 className={S.monthTitle(isHero)}>{monthHeader}</h3>

      {monthIndexLocal === 1 ? (
        <button type="button" disabled={currentMonthOffset >= maxMonths - 2}
          onClick={(e) => { e.stopPropagation(); onNext(); }} className={S.navBtn}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
            viewBox={S.icons.next.viewBox} fill="none" stroke="currentColor"
            strokeWidth={S.icons.next.strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <path d={S.icons.next.path} />
          </svg>
        </button>
      ) : <div className={S.navSpacer} />}
    </div>
  );
}
