/**
 * @file HeroSearch.tsx — Full-viewport hero section with cinematic search.
 *
 * Displayed only in State A (before the user searches). Contains:
 *  - An animated title block (h1 + subtitle) that fades out and slides
 *    upward when the calendar is expanded.
 *  - The `ModernSearchBar` in "hero" size, which slides upward by 200px
 *    when its calendar opens, making room for the floating calendar panel.
 *
 * All animations use inline `style` transitions with a custom cubic-bezier
 * easing (`0.22, 1, 0.36, 1`) for a smooth, cinematic feel.
 */

import { ModernSearchBar } from "@hotel/ui";
import { UI_CONSTANTS } from "../../../shared/constants/ui";
import { HERO_SEARCH_STYLES as S } from "../../../theme/search.theme";

interface HeroSearchProps {
  /** Callback when the user submits a search. */
  onSearch: (params: any) => void;
  /** Whether the hero calendar has been expanded (controls title fade-out). */
  heroCalendarActive: boolean;
  /** Setter to mark the calendar as active, triggered by the search bar. */
  setHeroCalendarActive: (active: boolean) => void;
}

export function HeroSearch({ onSearch, heroCalendarActive, setHeroCalendarActive }: HeroSearchProps) {
  return (
    <section className={S.section}>
       <div className={S.contentWrapper}>
        
        {/*
         * Title block: fades out (opacity 0) and slides up (-20px) when
         * the calendar opens, giving the search bar maximum visual focus.
         */}
        <div 
          className={S.titleBlock}
          style={{
            transition: "opacity 300ms ease, transform 400ms cubic-bezier(0.22, 1, 0.36, 1)",
            opacity: heroCalendarActive ? 0 : 1,
            transform: heroCalendarActive ? 'translateY(-20px)' : 'translateY(0)',
          }}
        >
            <h1 className={S.heading}>
              {UI_CONSTANTS.HERO.TITLE}
            </h1>
            <p className={S.subtitle}>
              {UI_CONSTANTS.HERO.SUBTITLE}
            </p>
        </div>
        
        {/*
         * Search bar wrapper: starts 48px below the title (visual breathing
         * room), then jumps up by -200px when the calendar expands so the
         * floating calendar panel has vertical space beneath the bar.
         */}
        <div 
          className={S.searchWrapper}
          style={{
            transition: "transform 800ms cubic-bezier(0.22, 1, 0.36, 1)",
            transform: heroCalendarActive ? 'translateY(-200px)' : 'translateY(48px)',
          }}
        >
          <ModernSearchBar 
            size="hero" 
            onSearch={onSearch} 
            className={S.searchBarWidth}
            onHeroCalendarOpen={() => setHeroCalendarActive(true)}
          />
        </div>

      </div>
    </section>
  );
}
