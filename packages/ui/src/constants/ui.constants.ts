/**
 * @file ui.constants.ts — Centralized UI strings for the @hotel/ui package.
 */

export const UI_PACKAGE_CONSTANTS = Object.freeze({
  CALENDAR: Object.freeze({
    MAX_MONTHS: 24,
    DEFAULT_LOCALE: "es-CR",
    LABELS: Object.freeze({
      CHECK_IN: "Llegada",
      CHECK_OUT: "Salida",
    } as const),
  } as const),
  DATE_FORMATS: Object.freeze({
    MONTH_LONG: "long",
    DAY_NUMERIC: "numeric",
    MONTH_SHORT: "short",
  } as const),
} as const);

export const UI_VARIANTS = Object.freeze({
  HERO: "hero",
  COMPACT: "compact",
} as const);
