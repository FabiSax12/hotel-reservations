"use client";

import { useRouter } from "next/navigation";
import { cookieAdapter, LOCALES } from "@hotel/i18n";
import { useI18n } from "@/locales";
import { LAYOUT } from "@/features/landing/layout/constants/styles";

const storage = cookieAdapter();

export function LocaleSwitcher() {
  const { locale } = useI18n();
  const router = useRouter();

  const switchTo = (next: "es" | "en") => {
    if (next === locale) return;
    storage.set(next);
    router.refresh();
  };

  return (
    <div className={LAYOUT.LOCALE_SWITCHER} aria-label="Language switcher">
      <button
        type="button"
        className={locale === LOCALES.ES ? LAYOUT.LOCALE_ACTIVE : LAYOUT.LOCALE_INACTIVE}
        onClick={() => switchTo(LOCALES.ES)}
        aria-current={locale === LOCALES.ES ? "true" : undefined}
      >
        ES
      </button>
      <span className={LAYOUT.LOCALE_SEP} aria-hidden="true">|</span>
      <button
        type="button"
        className={locale === LOCALES.EN ? LAYOUT.LOCALE_ACTIVE : LAYOUT.LOCALE_INACTIVE}
        onClick={() => switchTo(LOCALES.EN)}
        aria-current={locale === LOCALES.EN ? "true" : undefined}
      >
        EN
      </button>
    </div>
  );
}
