import type { ReactNode } from "react";
import type { SupportedLocale } from "../constants/locales";

export interface I18nProviderProps<T> {
  defaultLocale: SupportedLocale;
  translations: Record<SupportedLocale, T>;
  children: ReactNode;
}
