import type { SupportedLocale } from "../constants/locales";

export function createI18nContext<T>(
  locale: SupportedLocale,
  translations: T,
): { locale: SupportedLocale; t: T } {
  return { locale, t: translations };
}
