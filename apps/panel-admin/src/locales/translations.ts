import type { SupportedLocale } from "@hotel/i18n";
import { useI18n as _useI18n, LOCALES } from "@hotel/i18n";
import { AUTH_TEXTS } from "@/features/auth/i18n/auth.texts";
import type { AuthTexts } from "@/features/auth/i18n/authTexts.type";
import { RESERVACIONES_TEXTS } from "@/features/reservaciones/i18n/reservaciones.texts";
import type { ReservacionesTexts } from "@/features/reservaciones/i18n/reservacionesTexts.type";
import { COMMON_TEXTS } from "@/shared/i18n/commonTexts";
import type { CommonTexts } from "@/shared/i18n/commonTexts.type";

export type AppTranslations = {
  COMMON: CommonTexts;
  AUTH: AuthTexts;
  RESERVACIONES: ReservacionesTexts;
};

export const TRANSLATIONS: Record<SupportedLocale, AppTranslations> = {
  [LOCALES.ES]: { COMMON: COMMON_TEXTS.es, AUTH: AUTH_TEXTS.es, RESERVACIONES: RESERVACIONES_TEXTS.es },
  [LOCALES.EN]: { COMMON: COMMON_TEXTS.en, AUTH: AUTH_TEXTS.en, RESERVACIONES: RESERVACIONES_TEXTS.en },
};

export const defaultLocale = LOCALES.ES;

export const useI18n = () => _useI18n<AppTranslations>();
