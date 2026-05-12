import { cookies } from "next/headers";
import { defaultLocale, TRANSLATIONS, LOCALE_COOKIE_NAME } from "./index";
import type { SupportedLocale } from "@hotel/i18n";

export async function getServerTranslations() {
  const cookieStore = await cookies();
  const localeValue = cookieStore.get(LOCALE_COOKIE_NAME)?.value;
  const locale = (localeValue as SupportedLocale) || defaultLocale;
  
  return TRANSLATIONS[locale] || TRANSLATIONS[defaultLocale];
}
