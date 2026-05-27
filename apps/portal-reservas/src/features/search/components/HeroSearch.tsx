/**
 * @file HeroSearch.tsx — Full-viewport hero section with cinematic search.
 *
 * Displayed only in State A (before the user searches). Contains:
 *  - An animated title block (h1 + subtitle) that fades out and slides
 *    upward when the calendar is expanded.
 *  - The `ModernSearchBar` in "hero" size.
 */

import { useI18n } from "@/locales";
import { HERO_SEARCH_ANIMATIONS } from "../../../theme/search.animations";
import { HERO_SEARCH_STYLES as S } from "../../../theme/search.theme";
import type { HeroSearchProps } from "../domain/types";
import { ScrollIndicator } from "./ScrollIndicator";
import { ModernSearchBar } from "./search-bar";

export function HeroSearch({
  onSearch,
  onDestinationChange,
  heroCalendarActive,
  setHeroCalendarActive,
  hasLocation,
}: HeroSearchProps) {
  const { t } = useI18n();

  return (
    <section className={S.section(hasLocation)}>
      <div className={S.contentWrapper}>
        <div className={S.titleBlock}>
          <h1 className={S.heading} style={HERO_SEARCH_ANIMATIONS.title(heroCalendarActive)}>
            {t.SEARCH.HERO.TITLE}
          </h1>
          <p className={S.subtitle} style={HERO_SEARCH_ANIMATIONS.subtitle(heroCalendarActive)}>
            {t.SEARCH.HERO.SUBTITLE}
          </p>
        </div>

        <div
          className={S.searchWrapper}
          style={HERO_SEARCH_ANIMATIONS.searchWrapper(heroCalendarActive)}
        >
          <ModernSearchBar
            size="hero"
            onSearch={onSearch}
            onDestinationChange={onDestinationChange}
            className={S.searchBarWidth}
            onHeroCalendarOpen={() => setHeroCalendarActive(true)}
          />
        </div>

        {hasLocation && <ScrollIndicator heroCalendarActive={heroCalendarActive} />}
      </div>
    </section>
  );
}
