import type { ReactNode } from "react";
import type { SupportedLocale } from "../constants/locales";
import type { LocaleStorage } from "../storage/storage";

export interface I18nProviderProps<T> {
  defaultLocale: SupportedLocale;
  translations: Partial<Record<SupportedLocale, T>>;
  storage?: LocaleStorage;
  children: ReactNode;
}
