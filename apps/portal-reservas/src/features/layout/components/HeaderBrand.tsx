/**
 * @file HeaderBrand.tsx — Clickable brand mark / logo.
 *
 * Displays the resort's name with an accent-colored suffix.
 * Clicking the brand resets the entire page back to the hero search (State A).
 */

import { UI_CONSTANTS } from "../../../shared/constants/ui";
import { HEADER_STYLES as S } from "../../../theme/layout.theme";

interface HeaderBrandProps {
  /** Callback invoked on click to reset the page to the hero landing state. */
  onReset: () => void;
}

export function HeaderBrand({ onReset }: HeaderBrandProps) {
  return (
    <div className={S.brand} onClick={onReset}>
      {UI_CONSTANTS.HEADER.BRAND}
      <span className={S.brandHighlight}>{UI_CONSTANTS.HEADER.BRAND_HIGHLIGHT}</span>
    </div>
  );
}
