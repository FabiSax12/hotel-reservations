import { useContext } from "react";
import type { SupportedLocale } from "../constants/locales";
import { I18nContext } from "../context/I18nContext";

export function useI18n<T>(): {
  locale: SupportedLocale;
  t: T;
  setLocale: (locale: SupportedLocale) => void;
} {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return { locale: ctx.locale, t: ctx.t as T, setLocale: ctx.setLocale };
}
