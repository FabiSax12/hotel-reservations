import type { SupportedLocale } from "@hotel/i18n";
import type { GalleryTexts } from "./galleryTexts.type";

export const GALLERY_TEXTS: Record<SupportedLocale, GalleryTexts> = {
  es: {
    EYEBROW: "Galería",
    HEADLINE: "Momentos extraordinarios",
    SUBHEADLINE: "Cada espacio diseñado para despertar los sentidos en el corazón de Costa Rica.",
    DOT_LABEL: "Imagen",
    THERMAL: { TITLE: "Aguas Termales", SUBTITLE: "Arenal · La Fortuna" },
    CANOPY: { TITLE: "Suites de Dosel", SUBTITLE: "Monteverde · Cloud Forest" },
    SPA: { TITLE: "Pabellón de Bienestar", SUBTITLE: "Restauración · Silencio" },
    VOLCANO: { TITLE: "Vista Volcán Arenal", SUBTITLE: "Panorama · Amanecer" },
    DINING: { TITLE: "Terraza Gastronómica", SUBTITLE: "Alta Cocina · Naturaleza" },
    MIST: { TITLE: "Bosque Nuboso", SUBTITLE: "Monteverde · Niebla" },
    SUITE: { TITLE: "Suite Privada", SUBTITLE: "Lujo · Exclusividad" },
  },
  en: {
    EYEBROW: "Gallery",
    HEADLINE: "Extraordinary moments",
    SUBHEADLINE: "Every space designed to awaken the senses in the heart of Costa Rica.",
    DOT_LABEL: "Image",
    THERMAL: { TITLE: "Thermal Springs", SUBTITLE: "Arenal · La Fortuna" },
    CANOPY: { TITLE: "Canopy Suites", SUBTITLE: "Monteverde · Cloud Forest" },
    SPA: { TITLE: "Wellness Pavilion", SUBTITLE: "Restoration · Silence" },
    VOLCANO: { TITLE: "Arenal Volcano View", SUBTITLE: "Panorama · Sunrise" },
    DINING: { TITLE: "Gastronomic Terrace", SUBTITLE: "Fine Dining · Nature" },
    MIST: { TITLE: "Cloud Forest", SUBTITLE: "Monteverde · Mist" },
    SUITE: { TITLE: "Private Suite", SUBTITLE: "Luxury · Exclusivity" },
  },
};
