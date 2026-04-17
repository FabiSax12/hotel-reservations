"use client";

import { useI18n } from "@/locales";

export function LandingHero() {
  const { t } = useI18n();

  return (
    <main>
      <h1>{t.COMMON.ACTIONS.BOOK_NOW}</h1>
    </main>
  );
}
