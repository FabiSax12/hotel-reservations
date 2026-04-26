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
          <div className="relative mt-24 flex flex-col items-center gap-2 animate-in fade-in duration-1000 pointer-events-none">
            <style>
              {`
                @keyframes scrollArrow {
                  0% { opacity: 0; transform: translateY(-4px); }
                  50% { opacity: 0.8; }
                  100% { opacity: 0; transform: translateY(4px); }
                }
                .animate-scroll-arrow {
                  animation: scrollArrow 2s infinite;
                }
              `}
            </style>
            
            <span className="px-5 py-2 rounded-full bg-emerald-950/30 backdrop-blur-md border border-white/10 text-[10px] font-black text-white uppercase tracking-[0.2em] shadow-sm mb-4">
              Explorar habitaciones
            </span>
            
            <div className="flex flex-col items-center text-white/70">
              <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <rect x="7" y="3" width="10" height="18" rx="5" ry="5"></rect>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v4" />
              </svg>
              
              <div className="flex flex-col items-center gap-0.5">
                {[0, 1, 2].map((i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 animate-scroll-arrow"
                    style={{ animationDelay: `${i * 400}ms` }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
