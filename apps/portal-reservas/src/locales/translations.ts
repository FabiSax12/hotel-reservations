import type { SupportedLocale } from "@hotel/i18n";
import { useI18n as _useI18n, LOCALES } from "@hotel/i18n";
import { AUTH_TEXTS } from "@/features/auth/i18n/auth.texts";
import type { AuthTexts } from "@/features/auth/i18n/authTexts.type";
import { LAYOUT_TEXTS } from "@/features/layout/i18n/layout.texts";
import type { LayoutTexts } from "@/features/layout/i18n/layoutTexts.type";
import { ROOMS_TEXTS } from "@/features/rooms/i18n/rooms.texts";
import type { RoomsTexts } from "@/features/rooms/i18n/roomsTexts.type";
import { SEARCH_TEXTS } from "@/features/search/i18n/search.texts";
import type { SearchTexts } from "@/features/search/i18n/searchTexts.type";
import { COMMON_TEXTS } from "@/shared/i18n/commonTexts";
import type { CommonTexts } from "@/shared/i18n/commonTexts.type";

export type AppTranslations = {
  COMMON: CommonTexts;
  AUTH: AuthTexts;
  LAYOUT: LayoutTexts;
  SEARCH: SearchTexts;
  ROOMS: RoomsTexts;
};

export const TRANSLATIONS: Record<SupportedLocale, AppTranslations> = {
  [LOCALES.ES]: {
    COMMON: COMMON_TEXTS.es,
    AUTH: AUTH_TEXTS.es,
    LAYOUT: LAYOUT_TEXTS.es,
    SEARCH: SEARCH_TEXTS.es,
    ROOMS: ROOMS_TEXTS.es,
  },
  [LOCALES.EN]: {
    COMMON: COMMON_TEXTS.en,
    AUTH: AUTH_TEXTS.en,
    LAYOUT: LAYOUT_TEXTS.en,
    SEARCH: SEARCH_TEXTS.en,
    ROOMS: ROOMS_TEXTS.en,
  },
};

export const LOCALE_COOKIE_NAME = "locale";
export const defaultLocale = LOCALES.EN;

export const useI18n = () => _useI18n<AppTranslations>();
