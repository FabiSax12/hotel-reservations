/**
 * @file HeroCalendarFloat.tsx — Floating calendar wrapper for hero mode.
 */

"use client";

import { SEARCH_BAR_STYLES as S } from "../theme/search-bar.theme";
import { CalendarPopover } from "@hotel/ui";
import type { ActiveSection } from "../domain/types";

interface CalendarInvalidState { dayStr: string; isFading: boolean; }

interface HeroCalendarFloatProps {
  active: ActiveSection;
  hasHeroCalendarOpened: boolean;
  checkIn: string;
  checkOut: string;
  invalidState: CalendarInvalidState | null;
  onPickDate: (dayStr: string) => void;
}

export function HeroCalendarFloat({ active, hasHeroCalendarOpened, checkIn, checkOut, invalidState, onPickDate }: HeroCalendarFloatProps) {
  const isDimmed = active === "where" || active === "who";

  return (
    <div className={S.heroCalendarFloat}>
      <div
        className={S.heroCalendarInner}
        style={S.transitions.heroCalendar(hasHeroCalendarOpened, isDimmed)}
      >
        <CalendarPopover
          variant="hero"
          checkIn={checkIn}
          checkOut={checkOut}
          invalidState={invalidState}
          onPickDate={onPickDate}
        />
      </div>
    </div>
  );
}
