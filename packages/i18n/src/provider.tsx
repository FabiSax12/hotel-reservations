"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useState,
} from "react";
import type { Locale, TranslationMap } from "./types";

interface I18nState {
  locale: Locale;
  t: (key: string) => string;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nState | null>(null);

function resolve(map: TranslationMap, path: string): string {
  const segments = path.split(".");
  let node: string | TranslationMap = map;
  for (const segment of segments) {
    if (typeof node !== "object" || node === null) return path;
    node = node[segment];
    if (node === undefined) return path;
  }
  return typeof node === "string" ? node : path;
}

interface I18nProviderProps {
  defaultLocale: Locale;
  translations: Record<Locale, TranslationMap>;
  children: ReactNode;
}

export function I18nProvider({
  defaultLocale,
  translations,
  children,
}: I18nProviderProps) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  const t = (key: string) => resolve(translations[locale] ?? {}, key);

  return (
    <I18nContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nState {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}
