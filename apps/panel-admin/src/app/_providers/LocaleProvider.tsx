"use client";

import { I18nProvider, localStorageAdapter } from "@hotel/i18n";
import type { ReactNode } from "react";
import { defaultLocale, TRANSLATIONS } from "@/locales";
import { LOCAL_STORAGE_KEYS } from "@/shared/constants/localStorageKeys";

const storage = localStorageAdapter(LOCAL_STORAGE_KEYS.LOCALE);

export function LocaleProvider({ children }: { children: ReactNode }) {
  return (
    <I18nProvider defaultLocale={defaultLocale} translations={TRANSLATIONS} storage={storage}>
      {children}
    </I18nProvider>
  );
}
