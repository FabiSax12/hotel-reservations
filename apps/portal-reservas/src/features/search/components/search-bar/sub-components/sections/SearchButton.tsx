/**
 * @file SearchButton.tsx — Primary "Buscar" action button in the search bar.
 */

"use client";

import { SEARCH_BAR_STYLES as S } from "../../theme/search-bar.theme";
import { useI18n } from "@/locales";

interface SearchButtonProps {
  isSearching: boolean;
  iconClass: string;
  paddingClass: string;
  onTrigger: () => void;
  isShaking?: boolean;
}

export function SearchButton({
  isSearching,
  iconClass,
  paddingClass,
  onTrigger,
  isShaking = false,
}: SearchButtonProps) {
  const shakeClass = isShaking ? S.sectionShake : "";
  const { t } = useI18n();

  return (
    <div className={S.searchBtnWrapper}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onTrigger();
        }}
        className={`${S.searchBtn(paddingClass)} ${shakeClass}`}
      >
        {isSearching ? (
          <svg
            className={`${iconClass} ${S.searchBtnSpinner}`}
            fill="none"
            viewBox={S.icons.spinner.viewBox}
          >
            <circle
              className={S.searchBtnSpinnerCircle}
              cx={S.icons.spinner.circle.cx}
              cy={S.icons.spinner.circle.cy}
              r={S.icons.spinner.circle.r}
              stroke="currentColor"
              strokeWidth={S.icons.spinner.circle.strokeWidth}
            />
            <path className={S.searchBtnSpinnerPath} fill="currentColor" d={S.icons.spinner.path} />
          </svg>
        ) : (
          <svg
            className={iconClass}
            fill="none"
            viewBox={S.icons.search.viewBox}
            stroke="currentColor"
            strokeWidth={S.icons.search.strokeWidth}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d={S.icons.search.path} />
          </svg>
        )}
        <span className={S.searchBtnLabel}>{t.SEARCH.SEARCH_BAR.ACTION.SEARCH_BTN}</span>
      </button>
    </div>
  );
}
