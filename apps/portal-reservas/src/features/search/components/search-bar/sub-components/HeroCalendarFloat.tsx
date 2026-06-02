/**
 * @file HeroCalendarFloat.tsx — Floating calendar wrapper for hero mode.
 */

"use client";

import { SEARCH_BAR_STYLES } from "../theme/search-bar.theme";
import { SEARCH_SECTIONS, SEARCH_VARIANTS } from "../constants/search.constants";
import { CalendarPopover } from "@hotel/ui";
import { useI18n } from "@/locales";
import { useSearchBarContext } from "../hooks/useSearchBarContext";

export function HeroCalendarFloat() {
  const {
    active,
    hasHeroCalendarOpened,
    checkIn,
    checkOut,
    invalidState,
    handlePickDate,
  } = useSearchBarContext();

  const isDimmed = active === SEARCH_SECTIONS.WHERE || active === SEARCH_SECTIONS.WHO;
  const { t } = useI18n();
  const C = t.SEARCH.SEARCH_BAR;

  return (
    <div className={SEARCH_BAR_STYLES.heroCalendarFloat}>
      <div
        className={SEARCH_BAR_STYLES.heroCalendarInner}
        style={SEARCH_BAR_STYLES.transitions.heroCalendar(hasHeroCalendarOpened, isDimmed)}
      >
        <CalendarPopover
          variant={SEARCH_VARIANTS.HERO}
          checkIn={checkIn}
          checkOut={checkOut}
          invalidState={invalidState}
          onPickDate={handlePickDate}
          startLabel={C.DATES.CHECK_IN_LABEL}
          endLabel={C.DATES.CHECK_OUT_LABEL}
        />
      </div>
    </div>
  );
}
