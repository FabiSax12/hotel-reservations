/**
 * @file search.constants.ts — Logic-related constants for the search feature.
 */

export const SEARCH_SECTIONS = Object.freeze({
  WHERE: "where",
  CHECK_IN: "checkIn",
  CHECK_OUT: "checkOut",
  WHO: "who",
} as const);

export const SEARCH_VARIANTS = Object.freeze({
  HERO: "hero",
  COMPACT: "compact",
} as const);

export const SEARCH_VALS = Object.freeze({
  DESTINATION_ALL: "Todos",
} as const);

export const TIMEOUTS = Object.freeze({
  ERROR_DISMISS: 4000,
  SHAKE_RESET: 400,
  DESTINATION_HOVER_IN: 400,
  DESTINATION_HOVER_OUT: 200,
  SEARCH_TRIGGER_DELAY: 800,
} as const);

export const LOCALES = Object.freeze({
  DEFAULT: "es-CR",
} as const);
