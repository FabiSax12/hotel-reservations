"use client";

import { useState } from "react";
import type { Locale } from "../types";
import { I18nContext } from "./I18nContext";
import type { I18nProviderProps } from "./I18nProvider.interface";

export function I18nProvider<T>({ defaultLocale, translations, children }: I18nProviderProps<T>) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const t = translations[locale] ?? translations[defaultLocale];

  return <I18nContext.Provider value={{ locale, t, setLocale }}>{children}</I18nContext.Provider>;
}
