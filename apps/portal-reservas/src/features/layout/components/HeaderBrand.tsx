/**
 * @file HeaderBrand.tsx — Clickable brand mark / logo.
 *
 * Displays the resort's name with an accent-colored suffix.
 * Clicking the brand resets the entire page back to the hero search (State A).
 */

import { BrandLogo } from "@hotel/ui";
import { UI_CONSTANTS } from "../../../shared/constants/ui";
import { HEADER_STYLES as S } from "../../../theme/layout.theme";

interface HeaderBrandProps {
  /** Callback invoked on click to reset the page to the hero landing state. */
  onReset: () => void;
}

export function HeaderBrand({ onReset }: HeaderBrandProps) {
  return (
    <BrandLogo
      name={UI_CONSTANTS.HEADER.BRAND}
      highlight={UI_CONSTANTS.HEADER.BRAND_HIGHLIGHT}
      onClick={onReset}
    />
  );
}
