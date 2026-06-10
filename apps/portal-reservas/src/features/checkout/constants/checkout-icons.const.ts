/**
 * @file checkout-icons.const.ts — SVG path data for the checkout UI icons.
 *
 * Keeps the component files free of inline icon data (architecture-context.md
 * §7). Outline (stroke) icons drawn on a 24x24 viewBox.
 */

export const CHECKOUT_ICON_VIEW_BOX = "0 0 24 24";

export const CHECKOUT_ICON_PATHS = Object.freeze({
  back: "M15 19l-7-7 7-7",
  arrowRight: "M9 5l7 7-7 7",
  calendar:
    "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  clock: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  location:
    "M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z",
  guests:
    "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm6 0h-3v-1a6 6 0 00-3-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
  bed: "M3 7v10m0-4h18m0 4V9a2 2 0 00-2-2H7m12 6H3",
  area: "M4 8V4h4M16 4h4v4M20 16v4h-4M8 20H4v-4",
  check: "M5 13l4 4L19 7",
  lock: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
  amenity: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
} as const);
