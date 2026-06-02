/**
 * @file cta-icons.const.ts — SVG path data for the room/package CTA buttons.
 *
 * Centralizes the icon paths so the CTA component files stay free of inline data
 * constants (architecture-context.md §7).
 */

export const CTA_ICON_VIEW_BOX = "0 0 24 24";

export const CTA_ICON_PATHS = Object.freeze({
  calendar:
    "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  chevronRight: "M9 5l7 7-7 7",
} as const);
