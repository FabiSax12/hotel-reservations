/**
 * @file GuestsPopover.tsx — Dropdown panel for selecting guest counts.
 */

"use client";

import { Stepper } from "@hotel/ui";
import { GUESTS_POPOVER_STYLES } from "../theme/guests.theme";
import { SEARCH_VARIANTS } from "../constants/search.constants";
import { useI18n } from "@/locales";
import { useSearchBarContext } from "../hooks/useSearchBarContext";

export function GuestsPopover() {
  const {
    adults,
    setAdults,
    children,
    setChildren,
    pets,
    setPets,
    size,
    hasHeroCalendarOpened,
  } = useSearchBarContext();

  const isHero = size === SEARCH_VARIANTS.HERO;
  const { t } = useI18n();
  const C = t.SEARCH.SEARCH_BAR.GUESTS;

  return (
    <div className={GUESTS_POPOVER_STYLES.panel(isHero, !!hasHeroCalendarOpened)} onClick={(e) => e.stopPropagation()}>
      <Stepper
        title={C.ADULTS_TITLE}
        subtitle={C.ADULTS_SUBTITLE}
        value={adults}
        setter={setAdults}
        min={1}
      />
      <Stepper
        title={C.CHILDREN_TITLE}
        subtitle={C.CHILDREN_SUBTITLE}
        value={children}
        setter={setChildren}
      />
      <Stepper title={C.PETS_TITLE} subtitle={C.PETS_SUBTITLE} value={pets} setter={setPets} />
    </div>
  );
}
