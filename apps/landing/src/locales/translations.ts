import type { SupportedLocale } from "@hotel/i18n";
import { useI18n as _useI18n, LOCALES } from "@hotel/i18n";
import { COMMON_TEXTS } from "@/shared/i18n/commonTexts";
import type { CommonTexts } from "@/shared/i18n/commonTexts.type";

export type AppTranslations = {
  COMMON: CommonTexts;
};

export const TRANSLATIONS: Record<SupportedLocale, AppTranslations> = {
  [LOCALES.ES]: {
    COMMON: COMMON_TEXTS.es,
  },
  [LOCALES.EN]: {
    COMMON: COMMON_TEXTS.en,
  },
};

export const defaultLocale = LOCALES.ES;

export const useI18n = () => _useI18n<AppTranslations>();
