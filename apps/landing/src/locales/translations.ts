import type { SupportedLocale } from "@hotel/i18n";
import { useI18n as _useI18n, LOCALES } from "@hotel/i18n";
import { ABOUT_TEXTS } from "@/features/landing/about/i18n/about.texts";
import type { AboutTexts } from "@/features/landing/about/i18n/aboutTexts.type";
import { GALLERY_TEXTS } from "@/features/landing/gallery/i18n/gallery.texts";
import type { GalleryTexts } from "@/features/landing/gallery/i18n/galleryTexts.type";
import { HERO_TEXTS } from "@/features/landing/hero/i18n/hero.texts";
import type { HeroTexts } from "@/features/landing/hero/i18n/heroTexts.type";
import { PROPERTIES_TEXTS } from "@/features/landing/properties/i18n/properties.texts";
import type { PropertiesTexts } from "@/features/landing/properties/i18n/propertiesTexts.type";
import { SERVICES_TEXTS } from "@/features/landing/services/i18n/services.texts";
import type { ServicesTexts } from "@/features/landing/services/i18n/servicesTexts.type";
import { TESTIMONIALS_TEXTS } from "@/features/landing/testimonials/i18n/testimonials.texts";
import type { TestimonialsTexts } from "@/features/landing/testimonials/i18n/testimonialsTexts.type";
import { COMMON_TEXTS } from "@/shared/i18n/commonTexts";
import type { CommonTexts } from "@/shared/i18n/commonTexts.type";

export type LandingTexts = {
  HERO: HeroTexts;
  ABOUT: AboutTexts;
  SERVICES: ServicesTexts;
  PROPERTIES: PropertiesTexts;
  GALLERY: GalleryTexts;
  TESTIMONIALS: TestimonialsTexts;
};

export type AppTranslations = {
  COMMON: CommonTexts;
  LANDING: LandingTexts;
};

export const TRANSLATIONS: Record<SupportedLocale, AppTranslations> = {
  [LOCALES.ES]: {
    COMMON: COMMON_TEXTS.es,
    LANDING: {
      HERO: HERO_TEXTS.es,
      ABOUT: ABOUT_TEXTS.es,
      SERVICES: SERVICES_TEXTS.es,
      PROPERTIES: PROPERTIES_TEXTS.es,
      GALLERY: GALLERY_TEXTS.es,
      TESTIMONIALS: TESTIMONIALS_TEXTS.es,
    },
  },
  [LOCALES.EN]: {
    COMMON: COMMON_TEXTS.en,
    LANDING: {
      HERO: HERO_TEXTS.en,
      ABOUT: ABOUT_TEXTS.en,
      SERVICES: SERVICES_TEXTS.en,
      PROPERTIES: PROPERTIES_TEXTS.en,
      GALLERY: GALLERY_TEXTS.en,
      TESTIMONIALS: TESTIMONIALS_TEXTS.en,
    },
  },
};

export const defaultLocale = LOCALES.ES;

export const useI18n = () => _useI18n<AppTranslations>();
