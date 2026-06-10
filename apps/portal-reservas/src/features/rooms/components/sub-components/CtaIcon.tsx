/**
 * @file CtaIcon.tsx — Decorative outline icon for the room/package CTA buttons.
 *
 * Renders an aria-hidden SVG from a path in CTA_ICON_PATHS so the CTA components
 * don't repeat SVG boilerplate (shared by RoomCardCTA, PackageCardCTA and the
 * room-detail panel CTA).
 */

import { CTA_ICON_VIEW_BOX } from "../../constants/cta-icons.const";
import type { CtaIconProps } from "../../domain/types";

export function CtaIcon({ path, className, strokeWidth }: CtaIconProps) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox={CTA_ICON_VIEW_BOX}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
}
