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

import { ModernSearchBar } from "./search-bar";
import { HERO_SEARCH_STYLES as S } from "../../../theme/search.theme";
import { useI18n } from "@/locales";

interface HeroSearchProps {
  /** Callback when the user selects a destination (before full search submission). */
  onDestinationChange?: (dest: string) => void;
  /** Callback when the user submits a search. */
  onSearch: (params: any) => void;
  /** Whether the hero calendar has been expanded (controls title fade-out). */
  heroCalendarActive: boolean;
  /** Setter to mark the calendar as active, triggered by the search bar. */
  setHeroCalendarActive: (active: boolean) => void;
  /** Whether a location has been selected. */
  hasLocation: boolean;
}

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
        {/*
         * Title block: fades out (opacity 0) and slides up (-20px) when
         * the calendar opens, giving the search bar maximum visual focus.
         */}
        <div
          className={S.titleBlock}
          style={{
            transition: "opacity 300ms ease, transform 400ms cubic-bezier(0.22, 1, 0.36, 1)",
            opacity: heroCalendarActive ? 0 : 1,
            transform: heroCalendarActive ? "translateY(-20px)" : "translateY(0)",
          }}
        >
          <h1 className={S.heading}>{t.SEARCH.HERO.TITLE}</h1>
          <p className={S.subtitle}>{t.SEARCH.HERO.SUBTITLE}</p>
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
            transform: heroCalendarActive ? "translateY(-200px)" : "translateY(48px)",
          }}
        >
          <ModernSearchBar
            size="hero"
            onSearch={onSearch}
            onDestinationChange={onDestinationChange}
            className={S.searchBarWidth}
            onHeroCalendarOpen={() => setHeroCalendarActive(true)}
          />
        </div>

        {/* Scroll indicator when destination is selected */}
        {hasLocation && !heroCalendarActive && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-700 delay-300 pointer-events-none">
            <span className="text-xs font-bold text-emerald-900/60 uppercase tracking-widest">
              Explorar habitaciones
            </span>
            <div className="w-8 h-8 rounded-full bg-white/50 backdrop-blur-sm border border-emerald-900/10 flex items-center justify-center animate-bounce">
              <svg className="w-4 h-4 text-emerald-900/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
