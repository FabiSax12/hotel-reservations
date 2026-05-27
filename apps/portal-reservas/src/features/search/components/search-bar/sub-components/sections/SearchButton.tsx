/**
 * @file SearchButton.tsx — Primary "Buscar" action button in the search bar.
 */

"use client";

import { SEARCH_BAR_STYLES } from "../../theme/search-bar.theme";
import { useI18n } from "@/locales";
import type { SearchButtonProps } from "../../domain/types";

export function SearchButton({
  isSearching,
  iconClass,
  paddingClass,
  onTrigger,
  isShaking = false,
}: SearchButtonProps) {
  const shakeClass = isShaking ? SEARCH_BAR_STYLES.sectionShake : "";
  const { t } = useI18n();

  return (
    <div className={SEARCH_BAR_STYLES.searchBtnWrapper}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onTrigger();
        }}
        className={`${SEARCH_BAR_STYLES.searchBtn(paddingClass)} ${shakeClass}`}
      >
        {isSearching ? (
          <svg
            className={`${iconClass} ${SEARCH_BAR_STYLES.searchBtnSpinner}`}
            fill="none"
            viewBox={SEARCH_BAR_STYLES.icons.spinner.viewBox}
          >
            <circle
              className={SEARCH_BAR_STYLES.searchBtnSpinnerCircle}
              cx={SEARCH_BAR_STYLES.icons.spinner.circle.cx}
              cy={SEARCH_BAR_STYLES.icons.spinner.circle.cy}
              r={SEARCH_BAR_STYLES.icons.spinner.circle.r}
              stroke="currentColor"
              strokeWidth={SEARCH_BAR_STYLES.icons.spinner.circle.strokeWidth}
            />
            <path className={SEARCH_BAR_STYLES.searchBtnSpinnerPath} fill="currentColor" d={SEARCH_BAR_STYLES.icons.spinner.path} />
          </svg>
        ) : (
          <svg
            className={iconClass}
            fill="none"
            viewBox={SEARCH_BAR_STYLES.icons.search.viewBox}
            stroke="currentColor"
            strokeWidth={SEARCH_BAR_STYLES.icons.search.strokeWidth}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d={SEARCH_BAR_STYLES.icons.search.path} />
          </svg>
        )}
        <span className={SEARCH_BAR_STYLES.searchBtnLabel}>{t.SEARCH.SEARCH_BAR.ACTION.SEARCH_BTN}</span>
      </button>
    </div>
  );
}
