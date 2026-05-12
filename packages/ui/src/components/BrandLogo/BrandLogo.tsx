/**
 * @file Brand.tsx — Reusable branding component for displaying the logo/name.
 */

"use client";

import { BRAND_LOGO_STYLES as S } from "./BrandLogo.theme";

interface BrandLogoProps {
  name: string;
  highlight: string;
  onClick?: () => void;
  className?: string;
  highlightClassName?: string;
}

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
