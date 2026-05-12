/**
 * @file HeaderBrand.tsx — Clickable brand mark / logo.
 *
 * Displays the resort's name with an accent-colored suffix.
 * Clicking the brand resets the entire page back to the hero search (State A).
 */

import { BrandLogo } from "@hotel/ui";
import { useI18n } from "@/locales";
import { HEADER_STYLES as S } from "../../../theme/layout.theme";

interface HeaderBrandProps {
  /** Callback invoked on click to reset the page to the hero landing state. */
  onReset: () => void;
}

export function HeaderBrand({ onReset }: HeaderBrandProps) {
  const { t } = useI18n();

  return (
    <BrandLogo
      name={t.LAYOUT.HEADER.BRAND}
      highlight={t.LAYOUT.HEADER.BRAND_HIGHLIGHT}
      onClick={onReset}
    />
  );
}
