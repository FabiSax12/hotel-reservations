/**
 * @file HeroExpandTab.tsx — Calendar expansion trigger tab (hero mode only).
 */

"use client";

import { SEARCH_BAR_STYLES as S } from "../theme/search-bar.theme";
import type { ActiveSection } from "../domain/types";

interface HeroExpandTabProps {
  hasHeroCalendarOpened: boolean;
  active: ActiveSection;
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
