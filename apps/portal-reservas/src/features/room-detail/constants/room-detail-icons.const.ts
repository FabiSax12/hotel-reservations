/**
 * @file room-detail-icons.const.ts — SVG viewBox + path data for the panel icons.
 *
 * Path/viewBox data is kept out of the .tsx files (architecture: no data
 * constants declared in component files). Components reference these by name.
 */

/** viewBox for the 24×24 line icons. */
export const ICON_VIEW_BOX = "0 0 24 24";
/** viewBox for the 20×20 amenity icons. */
export const AMENITY_VIEW_BOX = "0 0 20 20";
/** viewBox for the editorial quote glyph. */
export const QUOTE_VIEW_BOX = "0 0 32 24";

/** SVG path data keyed by semantic name. */
export const ICON_PATHS = Object.freeze({
  close: "M6 18L18 6M6 6l12 12",
  chevronLeft: "M15 19l-7-7 7-7",
  chevronRight: "M9 5l7 7-7 7",
  capacity: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
  area: "M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3",
  type: "M15 7a2 2 0 012 2m4-2a6 6 0 01-7.743 5.743L11 14H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z",
  bed: "M3 11h14M5 11V7a2 2 0 012-2h6a2 2 0 012 2v4M3 11v4M17 11v4M3 15h14",
  clock: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  quote:
    "M0 24V14.4C0 6.48 4.32 1.44 12.96 0l1.44 2.64C9.6 3.84 7.2 6.72 6.48 11.28H12V24H0Zm18 0V14.4C18 6.48 22.32 1.44 30.96 0l1.44 2.64C27.6 3.84 25.2 6.72 24.48 11.28H30V24H18Z",
  calendar: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  package: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
} as const);
