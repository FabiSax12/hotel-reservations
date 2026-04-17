import { LOCALES } from "@hotel/i18n";
import { common } from "./es/common";
import type { AppTranslations } from "./types";

const es: AppTranslations = { common };

export const translations: Record<string, AppTranslations> = {
  [LOCALES.ES]: es,
};

export const defaultLocale = LOCALES.ES;
