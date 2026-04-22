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
        style={{
          transition: `transform 800ms cubic-bezier(0.22, 1, 0.36, 1) 150ms, opacity ${isDimmed ? '200ms ease-out' : '800ms ease 100ms'}`,
          transform: hasHeroCalendarOpened ? 'translateY(0)' : 'translateY(-40px)',
          opacity: hasHeroCalendarOpened ? (isDimmed ? 0.30 : 1) : 0,
          pointerEvents: hasHeroCalendarOpened && !isDimmed ? 'auto' : 'none'
        }}
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
