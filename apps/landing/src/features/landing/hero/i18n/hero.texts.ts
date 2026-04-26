import type { SupportedLocale } from "@hotel/i18n";
import type { HeroTexts } from "./heroTexts.type";

export const HERO_TEXTS: Record<SupportedLocale, HeroTexts> = {
  es: {
    EYEBROW: "Luxury Nature Retreats · Costa Rica",
    HOTEL_NAME: "ALTAVERDE",
    HEADLINE_LINE1: "Donde la selva",
    HEADLINE_LINE2: "toca el cielo",
    SUBHEADLINE:
      "Dos propiedades únicas inmersas en la biodiversidad costarricense. Lujo sin pretensiones en perfecta armonía con la naturaleza.",
    CTA_PRIMARY: "Reservar ahora",
    CTA_SECONDARY: "Descubrir más",
    SCROLL_CUE: "Explorar",
    LOCATIONS: "Arenal & La Fortuna · Monteverde",
    IMAGE_ALT: "ALTAVERDE Resort",
    FEATURED_LABEL: "Propiedad destacada",
    FEATURED_PROPERTY: "Arenal Thermal Suites · La Fortuna",
  },
  en: {
    EYEBROW: "Luxury Nature Retreats · Costa Rica",
    HOTEL_NAME: "ALTAVERDE",
    HEADLINE_LINE1: "Where the forest",
    HEADLINE_LINE2: "meets the sky",
    SUBHEADLINE:
      "Two singular properties immersed in Costa Rica's biodiversity. Unpretentious luxury in perfect harmony with nature.",
    CTA_PRIMARY: "Book now",
    CTA_SECONDARY: "Discover more",
    SCROLL_CUE: "Explore",
    LOCATIONS: "Arenal & La Fortuna · Monteverde",
    IMAGE_ALT: "ALTAVERDE Resort",
    FEATURED_LABEL: "Featured property",
    FEATURED_PROPERTY: "Arenal Thermal Suites · La Fortuna",
  },
};
