/**
 * @file HeroExpandTab.tsx — Calendar expansion trigger tab (hero mode only).
 * Important! This file is a placeholder before the next feature (preview of rooms) is implemented.
 */

"use client";

import { SEARCH_SECTIONS } from "../constants/search.constants";
import { useSearchBarContext } from "../hooks/useSearchBarContext";
import { SEARCH_BAR_STYLES as S } from "../theme/search-bar.theme";

export function HeroExpandTab() {
  const { hasHeroCalendarOpened, active, setActive, setHasHeroCalendarOpened, onHeroCalendarOpen } =
    useSearchBarContext();

  const handleExpand = () => {
    setHasHeroCalendarOpened(true);
    if (onHeroCalendarOpen) onHeroCalendarOpen();
    if (active !== SEARCH_SECTIONS.CHECK_IN && active !== SEARCH_SECTIONS.CHECK_OUT) {
      setActive(SEARCH_SECTIONS.CHECK_IN);
    }
  };

  /**
   * Styling here is not moved to constants because this file is subject
   * to change in the future when we implement the "preview of rooms" feature.
   */
  return (
    <button
      type="button"
      style={{
        transition: "opacity 300ms ease, transform 300ms ease",
        opacity: hasHeroCalendarOpened ? 0 : 1,
        transform: hasHeroCalendarOpened ? "translateY(-10px)" : "translateY(0)",
        pointerEvents: hasHeroCalendarOpened ? "none" : "auto",
      }}
      onClick={(e) => {
        e.stopPropagation();
        handleExpand();
      }}
      className={S.expandTab}
    >
      <svg
        className={S.expandTabIcon}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
}
