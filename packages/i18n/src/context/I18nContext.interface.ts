import type { SupportedLocale } from "../constants/locales";

export interface I18nContextValue<T> {
  locale: SupportedLocale;
  t: T;
  setLocale: (locale: SupportedLocale) => void;
}
