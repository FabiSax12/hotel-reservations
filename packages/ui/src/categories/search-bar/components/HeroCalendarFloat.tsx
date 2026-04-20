/**
 * @file HeroCalendarFloat.tsx — Floating calendar wrapper for hero mode.
 *
 * In hero mode, the calendar is not rendered inline below the search bar
 * (like compact mode). Instead, it "floats" above the bar as a separate
 * layer with cinematic entrance/exit animations:
 *
 *  - **Entrance**: Slides down from -40px with an 800ms spring-like ease.
 *  - **Dimming**: When the user switches to "Sede" or "Huéspedes",
 *    the calendar fades to 30% opacity in 200ms so it doesn't compete
 *    visually with the active popover.
 *  - **Interactivity**: `pointerEvents` is set to `none` until the
 *    calendar has been opened, preventing accidental clicks on hidden UI.
 */

"use client";

import { SEARCH_BAR_STYLES as S } from "../theme/search-bar.theme";
import { CalendarPopover } from "./CalendarPopover";
import type { ActiveSection } from "../domain/types";

/** Shared invalid-state shape used by the calendar family of components. */
interface CalendarInvalidState { dayStr: string; isFading: boolean; }

interface HeroCalendarFloatProps {
  /** Which search bar section is currently active. */
  active: ActiveSection;
  /** Whether the hero calendar has been opened at least once. */
  hasHeroCalendarOpened: boolean;
  /** ISO check-in date string. */
  checkIn: string;
  /** ISO check-out date string. */
  checkOut: string;
  /** Active invalid-pick animation state. */
  invalidState: CalendarInvalidState | null;
  /** Callback when a day is picked. */
  onPickDate: (dayStr: string) => void;
}

export function HeroCalendarFloat({ active, hasHeroCalendarOpened, checkIn, checkOut, invalidState, onPickDate }: HeroCalendarFloatProps) {
  /** True when the Sede or Huéspedes popover is open (calendar should dim). */
  const isDimmed = active === "where" || active === "who";

  return (
    <div className={S.heroCalendarFloat}>
      <div
        className={S.heroCalendarInner}
        style={{
          // Transform: spring-like entrance; Opacity: fast dim when non-date popover opens
          transition: `transform 800ms cubic-bezier(0.22, 1, 0.36, 1) 150ms, opacity ${isDimmed ? '200ms ease-out' : '800ms ease 100ms'}`,
          transform: hasHeroCalendarOpened ? 'translateY(0)' : 'translateY(-40px)',
          opacity: hasHeroCalendarOpened ? (isDimmed ? 0.30 : 1) : 0,
          pointerEvents: hasHeroCalendarOpened && !isDimmed ? 'auto' : 'none'
        }}
      >
        <CalendarPopover
          variant="hero"
          activeMode={active}
          checkIn={checkIn}
          checkOut={checkOut}
          invalidState={invalidState}
          onPickDate={onPickDate}
        />
      </div>
    </div>
  );
}
