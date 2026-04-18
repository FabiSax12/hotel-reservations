import type { SupportedLocale } from "../constants/locales";

export interface LocaleStorage {
  get(): SupportedLocale | null;
  set(locale: SupportedLocale): void;
}

export const localStorageAdapter = (key = "locale"): LocaleStorage => ({
  get: () =>
    typeof window !== "undefined" ? (localStorage.getItem(key) as SupportedLocale | null) : null,
  set: (locale) => localStorage.setItem(key, locale),
});

export const sessionStorageAdapter = (key = "locale"): LocaleStorage => ({
  get: () =>
    typeof window !== "undefined" ? (sessionStorage.getItem(key) as SupportedLocale | null) : null,
  set: (locale) => sessionStorage.setItem(key, locale),
});

export const cookieAdapter = (key = "locale", maxAgeDays = 365): LocaleStorage => ({
  get: () => {
    if (typeof document === "undefined") return null;
    const match = document.cookie.match(new RegExp(`(?:^|; )${key}=([^;]*)`));
    return match ? (decodeURIComponent(match[1]) as SupportedLocale) : null;
  },
  set: (locale) => {
    const maxAge = maxAgeDays * 24 * 60 * 60;
    document.cookie = `${key}=${encodeURIComponent(locale)}; max-age=${maxAge}; path=/; SameSite=Lax`;
  },
});
