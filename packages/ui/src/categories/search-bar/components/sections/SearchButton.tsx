/**
 * @file SearchButton.tsx — Primary "Buscar" action button in the search bar.
 *
 * Displays either:
 *  - A magnifying glass icon (idle state), or
 *  - A spinning loading indicator (searching state, 800ms delay).
 *
 * The button uses `e.stopPropagation()` on click to prevent the
 * bar's section-toggle logic from interfering with the search action.
 *
 * The "Buscar" label is hidden on small sizes (via theme responsive
 * classes) and visible at larger breakpoints.
 */

"use client";

import { SEARCH_BAR_STYLES as S } from "../../theme/search-bar.theme";
import { SEARCH_BAR_UI_CONSTANTS } from "../../constants/ui";

const C = SEARCH_BAR_UI_CONSTANTS.ACTION;

interface SearchButtonProps {
  /** Whether the search animation is playing (shows a spinner). */
  isSearching: boolean;
  /** CSS class for the icon sizing (varies by compact/hero). */
  iconClass: string;
  /** CSS class for the button padding (varies by compact/hero). */
  paddingClass: string;
  /** Callback invoked when the button is clicked. */
  onTrigger: () => void;
  /** When true, plays a brief shake animation (cleared by parent after 400 ms). */
  isShaking?: boolean;
}

export function SearchButton({ isSearching, iconClass, paddingClass, onTrigger, isShaking = false }: SearchButtonProps) {
  const shakeClass = isShaking ? S.sectionShake : "";

  return (
    <div className={S.searchBtnWrapper}>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onTrigger(); }}
        className={`${S.searchBtn(paddingClass)} ${shakeClass}`}
      >
        {isSearching ? (
          /* SVG spinner: a faded circle track + a rotating arc segment */
          <svg className={`${iconClass} ${S.searchBtnSpinner}`} fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          /* Static magnifying glass icon */
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        )}
        <span className={S.searchBtnLabel}>{C.SEARCH_BTN}</span>
      </button>
    </div>
  );
}
