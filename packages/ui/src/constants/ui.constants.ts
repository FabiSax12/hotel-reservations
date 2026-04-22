/**
 * @file ui.constants.ts — Centralized UI strings for the @hotel/ui package.
 */

export const UI_PACKAGE_CONSTANTS = {
  CALENDAR: {
    MAX_MONTHS: 24,
    DEFAULT_LOCALE: "es-CR",
    LABELS: {
      CHECK_IN: "Llegada",
      CHECK_OUT: "Salida",
    },
  },
  DATE_FORMATS: {
    MONTH_LONG: "long",
    DAY_NUMERIC: "numeric",
    MONTH_SHORT: "short",
  },
} as const;
