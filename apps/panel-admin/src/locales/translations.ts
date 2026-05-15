import type { SupportedLocale } from "@hotel/i18n";
import { useI18n as _useI18n, LOCALES } from "@hotel/i18n";
import { AUTH_TEXTS } from "@/features/auth/i18n/auth.texts";
import type { AuthTexts } from "@/features/auth/i18n/authTexts.type";
import { RESERVATIONS_TEXTS } from "@/features/reservations/i18n/reservations.texts";
import type { ReservationsTexts } from "@/features/reservations/i18n/reservationsTexts.type";
import { SIDEBAR_TEXTS } from "@/features/sidebar/i18n/sidebar.texts";
import type { SidebarTexts } from "@/features/sidebar/i18n/sidebar.type";
import { ROOMS_TEXTS } from "@/features/rooms/i18n/rooms.texts";
import type { RoomsTexts } from "@/features/rooms/i18n/roomsTexts.type";
import { COMMON_TEXTS } from "@/shared/i18n/commonTexts";
import type { CommonTexts } from "@/shared/i18n/commonTexts.type";
import { METRICS_TEXTS } from "@/features/metrics/i18n/metrics.texts";
import type { MetricsTexts } from "@/features/metrics/i18n/metricsTexts.type";

export type AppTranslations = {
  COMMON: CommonTexts;
  AUTH: AuthTexts;
  RESERVATIONS: ReservationsTexts;
  SIDEBAR: SidebarTexts;
  ROOMS: RoomsTexts;
  METRICS: MetricsTexts;
};

export const TRANSLATIONS: Record<SupportedLocale, AppTranslations> = {
  [LOCALES.ES]: {
    COMMON: COMMON_TEXTS.es,
    AUTH: AUTH_TEXTS.es,
    RESERVATIONS: RESERVATIONS_TEXTS.es,
    SIDEBAR: SIDEBAR_TEXTS.es,
    ROOMS: ROOMS_TEXTS.es,
    METRICS: METRICS_TEXTS.es,
  },
  [LOCALES.EN]: {
    COMMON: COMMON_TEXTS.en,
    AUTH: AUTH_TEXTS.en,
    RESERVATIONS: RESERVATIONS_TEXTS.en,
    SIDEBAR: SIDEBAR_TEXTS.en,
    ROOMS: ROOMS_TEXTS.en,
    METRICS: METRICS_TEXTS.en,
  },
};

export const defaultLocale = LOCALES.ES;

export const useI18n = () => _useI18n<AppTranslations>();
