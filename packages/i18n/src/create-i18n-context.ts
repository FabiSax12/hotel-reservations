import type { Locale, TranslationMap } from "./types";

export interface I18nContext<T extends TranslationMap> {
  locale: Locale;
  translations: T;
  t: (key: string) => string;
}

function resolvePath(map: TranslationMap, path: string): string {
  const segments = path.split(".");
  let current: string | TranslationMap = map;

  for (const segment of segments) {
    if (typeof current !== "object" || current === null) return path;
    current = current[segment];
    if (current === undefined) return path;
  }

  return typeof current === "string" ? current : path;
}

export function createI18nContext<T extends TranslationMap>(
  locale: Locale,
  translations: T,
): I18nContext<T> {
  return {
    locale,
    translations,
    t: (key: string) => resolvePath(translations, key),
  };
}
