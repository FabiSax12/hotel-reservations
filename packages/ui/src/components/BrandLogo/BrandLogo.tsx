/**
 * @file Brand.tsx — Reusable branding component for displaying the logo/name.
 */

"use client";

import type { BrandLogoProps } from "../../types/brand-logo.types";
import { BRAND_LOGO_STYLES as S } from "./BrandLogo.theme";

export function BrandLogo({
  name,
  highlight,
  onClick,
  className = S.root,
  highlightClassName = S.highlight,
}: BrandLogoProps) {
  return (
    <button type="button" className={className} onClick={onClick}>
      {name}
      <span className={highlightClassName}>{highlight}</span>
    </button>
  );
}
