/**
 * @file CheckoutIcon.tsx — Decorative outline icon for the checkout UI.
 *
 * Renders an aria-hidden SVG from a path in CHECKOUT_ICON_PATHS, so the rest of
 * the feature never repeats SVG boilerplate or inline path data.
 */

import { CHECKOUT_ICON_VIEW_BOX } from "../constants/checkout-icons.const";
import type { CheckoutIconProps } from "../domain/types";

export function CheckoutIcon({ path, className }: CheckoutIconProps) {
  return (
    <svg
      className={className}
      viewBox={CHECKOUT_ICON_VIEW_BOX}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      aria-hidden="true"
    >
      <path d={path} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
