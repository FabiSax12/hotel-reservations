/**
 * @file HeroExpandTab.tsx — Calendar expansion trigger tab (hero mode only).
 *
 * Renders a small downward-chevron button anchored to the outer bottom edge
 * of the hero search bar. Clicking it opens the floating calendar for the
 * first time and activates the "checkIn" section.
 *
 * Once the calendar has been opened, this tab fades out and becomes
 * non-interactive (via `pointerEvents: 'none'`), because the calendar
 * can then be toggled by clicking the date fields directly.
 */

"use client";

import { SEARCH_BAR_STYLES as S } from "../theme/search-bar.theme";
import type { ActiveSection } from "../domain/types";

interface HeroExpandTabProps {
  /** Whether the calendar has been opened at least once. */
  hasHeroCalendarOpened: boolean;
  /** Currently active section (unused directly, but required for type consistency). */
  active: ActiveSection;
  /** Callback to trigger the first calendar expansion. */
  onExpand: () => void;
}

export function HeroExpandTab({ hasHeroCalendarOpened, active, onExpand }: HeroExpandTabProps) {
  return (
    <button
      type="button"
      style={{
        transition: "opacity 300ms ease, transform 300ms ease",
        opacity: hasHeroCalendarOpened ? 0 : 1,
        transform: hasHeroCalendarOpened ? 'translateY(-10px)' : 'translateY(0)',
        pointerEvents: hasHeroCalendarOpened ? 'none' : 'auto'
      }}
      onClick={(e) => { e.stopPropagation(); onExpand(); }}
      className={S.expandTab}
    >
      <svg className={S.expandTabIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
}
