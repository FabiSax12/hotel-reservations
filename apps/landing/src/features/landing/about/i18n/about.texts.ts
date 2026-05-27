import type { SupportedLocale } from "@hotel/i18n";
import type { AboutTexts } from "./aboutTexts.type";

export const ABOUT_TEXTS: Record<SupportedLocale, AboutTexts> = {
  es: {
    EYEBROW: "Nuestra historia",
    HEADLINE: "Un legado de lujo en armonía con la naturaleza",
    BODY: "Fundado en 2002 con una visión radical: crear espacios donde el lujo y la naturaleza coexistan sin compromisos. Cada detalle de ALTAVERDE ha sido diseñado para sumergirte en la extraordinaria biodiversidad de Costa Rica, sin renunciar a la excelencia que merecés.",
    QUOTE: "La naturaleza es el arquitecto más audaz que existe.",
    QUOTE_ATTRIBUTION: "— Fundadores, ALTAVERDE",
    MOSAIC_ALT_1: "Bosque de ALTAVERDE",
    MOSAIC_ALT_2: "Naturaleza en ALTAVERDE",
    MOSAIC_ALT_3: "Propiedad ALTAVERDE",
    MOSAIC_URL_1: "https://picsum.photos/seed/about-forest/480/720",
    MOSAIC_URL_2: "https://picsum.photos/seed/about-warm/480/340",
    MOSAIC_URL_3: "https://picsum.photos/seed/about-stone/480/340",
    STATS: {
      SUITES: { VALUE: "48", LABEL: "Suites exclusivas" },
      YEARS: { VALUE: "22", LABEL: "Años de excelencia" },
      GUESTS: { VALUE: "40K+", LABEL: "Huéspedes atendidos" },
      RATING: { VALUE: "4.9", LABEL: "Calificación promedio" },
    },
  },
  en: {
    EYEBROW: "Our story",
    HEADLINE: "A legacy of luxury in harmony with nature",
    BODY: "Founded in 2002 with a radical vision: to create spaces where luxury and nature coexist without compromise. Every detail of ALTAVERDE has been designed to immerse you in Costa Rica's extraordinary biodiversity, without sacrificing the excellence you deserve.",
    QUOTE: "Nature is the most audacious architect that ever existed.",
    QUOTE_ATTRIBUTION: "— Founders, ALTAVERDE",
    MOSAIC_ALT_1: "ALTAVERDE forest",
    MOSAIC_ALT_2: "ALTAVERDE nature",
    MOSAIC_ALT_3: "ALTAVERDE property",
    MOSAIC_URL_1: "https://picsum.photos/seed/about-forest/480/720",
    MOSAIC_URL_2: "https://picsum.photos/seed/about-warm/480/340",
    MOSAIC_URL_3: "https://picsum.photos/seed/about-stone/480/340",
    STATS: {
      SUITES: { VALUE: "48", LABEL: "Exclusive suites" },
      YEARS: { VALUE: "22", LABEL: "Years of excellence" },
      GUESTS: { VALUE: "40K+", LABEL: "Guests served" },
      RATING: { VALUE: "4.9", LABEL: "Average rating" },
    },
  },
};
