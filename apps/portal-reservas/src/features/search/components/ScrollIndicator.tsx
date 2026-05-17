"use client";

/**
 * @file ScrollIndicator.tsx — Animated scroll hint shown below the hero.
 */

import { useI18n } from "@/locales";
import { HERO_SEARCH_STYLES as S } from "../../../theme/search.theme";
import type { ScrollIndicatorProps } from "../domain/types";

export function ScrollIndicator({ heroCalendarActive }: ScrollIndicatorProps) {
  const { t } = useI18n();

  return (
    <div className={S.scrollIndicator.container(heroCalendarActive)}>
      <span className={S.scrollIndicator.badge}>{t.SEARCH.HERO.BROWSE_ROOMS}</span>

      <div className={S.scrollIndicator.iconWrapper}>
        <svg
          className={S.scrollIndicator.mouseIcon}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <rect x="7" y="3" width="10" height="18" rx="5" ry="5"></rect>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v4" />
        </svg>

        <div className={S.scrollIndicator.arrowsWrapper}>
          {[0, 1, 2].map((i) => (
            <svg
              key={i}
              className={S.scrollIndicator.arrowIcon}
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
  );
}
