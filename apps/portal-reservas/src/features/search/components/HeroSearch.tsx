/**
 * @file HeroSearch.tsx — Full-viewport hero section with cinematic search.
 *
 * Displayed only in State A (before the user searches). Contains:
 *  - An animated title block (h1 + subtitle) that fades out and slides
 *    upward when the calendar is expanded.
 *  - The `ModernSearchBar` in "hero" size.
 */

import { ModernSearchBar } from "./search-bar";
import { HERO_SEARCH_STYLES } from "../../../theme/search.theme";
import { HERO_SEARCH_ANIMATIONS } from "../../../theme/search.animations";
import { useI18n } from "@/locales";
import { ScrollIndicator } from "./ScrollIndicator";

import type { HeroSearchProps } from "../domain/types";

export function HeroSearch({
  onSearch,
  onDestinationChange,
  heroCalendarActive,
  setHeroCalendarActive,
  hasLocation,
}: HeroSearchProps) {
  const { t } = useI18n();

  return (
    <section className={HERO_SEARCH_STYLES.section(hasLocation)}>
      <div className={HERO_SEARCH_STYLES.contentWrapper}>
        <div className={HERO_SEARCH_STYLES.titleBlock}>
          <h1
            className={HERO_SEARCH_STYLES.heading}
            style={HERO_SEARCH_ANIMATIONS.title(heroCalendarActive)}
          >
            {t.SEARCH.HERO.TITLE}
          </h1>
          <p
            className={HERO_SEARCH_STYLES.subtitle}
            style={HERO_SEARCH_ANIMATIONS.subtitle(heroCalendarActive)}
          >
            {t.SEARCH.HERO.SUBTITLE}
          </p>
        </div>

        <div
          className={HERO_SEARCH_STYLES.searchWrapper}
          style={HERO_SEARCH_ANIMATIONS.searchWrapper(heroCalendarActive)}
        >
          <ModernSearchBar
            size="hero"
            onSearch={onSearch}
            onDestinationChange={onDestinationChange}
            className={HERO_SEARCH_STYLES.searchBarWidth}
            onHeroCalendarOpen={() => setHeroCalendarActive(true)}
          />
        </div>

        {hasLocation && <ScrollIndicator heroCalendarActive={heroCalendarActive} />}
      </div>
    </section>
  );
}
