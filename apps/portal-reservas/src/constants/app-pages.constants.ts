/**
 * @file app-pages.constants.ts — User-visible strings for route-level error/loading pages.
 *
 * These pages render outside the I18nProvider boundary, so strings are
 * centralized here instead of being hardcoded inline.
 */

export const APP_PAGE_STRINGS = Object.freeze({
  ERROR_TITLE: "Algo salió mal",
  ERROR_MESSAGE: "No pudimos cargar la página. Por favor, intentá de nuevo.",
  ERROR_RETRY: "Intentar de nuevo",
  LOADING_TEXT: "Cargando...",
} as const);
