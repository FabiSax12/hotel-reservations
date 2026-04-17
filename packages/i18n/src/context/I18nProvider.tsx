"use client";

import { useState } from "react";
import type { SupportedLocale } from "../constants/locales";
import { I18nContext } from "./I18nContext";
import type { I18nProviderProps } from "./I18nProvider.interface";

export function I18nProvider<T>({ defaultLocale, translations, storage, children }: I18nProviderProps<T>) {
  const [locale, setLocale] = useState<SupportedLocale>(() => storage?.get() ?? defaultLocale);
  const t = translations[locale] ?? translations[defaultLocale];

  function handleSetLocale(next: SupportedLocale) {
    storage?.set(next);
    setLocale(next);
  }

  return <I18nContext.Provider value={{ locale, t, setLocale: handleSetLocale }}>{children}</I18nContext.Provider>;
}
