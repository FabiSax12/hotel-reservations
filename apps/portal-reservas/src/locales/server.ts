import type { SupportedLocale } from "@hotel/i18n";
import { cookies } from "next/headers";
import { defaultLocale, LOCALE_COOKIE_NAME, TRANSLATIONS } from "./index";

export async function getServerTranslations() {
  const cookieStore = await cookies();
  const localeValue = cookieStore.get(LOCALE_COOKIE_NAME)?.value;
  const locale = (localeValue as SupportedLocale) || defaultLocale;

  return TRANSLATIONS[locale] || TRANSLATIONS[defaultLocale];
}
