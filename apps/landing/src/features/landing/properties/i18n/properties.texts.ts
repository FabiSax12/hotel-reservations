import type { SupportedLocale } from "@hotel/i18n";
import type { PropertiesTexts } from "./propertiesTexts.type";

export const PROPERTIES_TEXTS: Record<SupportedLocale, PropertiesTexts> = {
  es: {
    EYEBROW: "Nuestras propiedades",
    HEADLINE: "Dos destinos, una visión",
    SUBHEADLINE: "Cada propiedad es una puerta a un ecosistema único de Costa Rica.",
    DRAG_HINT: "Deslizá para explorar",
    DOT_LABEL: "Propiedad",
    NAV_PREV: "Anterior",
    NAV_NEXT: "Siguiente",
    ARENAL: {
      NAME: "ALTAVERDE ARENAL",
      LOCATION: "Arenal & La Fortuna · Costa Rica",
      TAGLINE: "Donde el volcán dicta el ritmo",
      DESCRIPTION:
        "Frente al Volcán Arenal, 24 suites privadas con acceso directo a pozas termales volcánicas. La naturaleza más dramática de Costa Rica, con el lujo que merecés.",
      FEATURE_1: "Aguas termales privadas",
      FEATURE_2: "Vista directa al volcán",
      FEATURE_3: "Expediciones nocturnas",
      PRICE_LABEL: "Desde",
      PRICE: "$180 / noche",
      CTA: "Reservar Arenal",
    },
    MONTEVERDE: {
      NAME: "ALTAVERDE MONTEVERDE",
      LOCATION: "Monteverde · Costa Rica",
      TAGLINE: "Suspendido entre las nubes",
      DESCRIPTION:
        "En el corazón del bosque nuboso más biodiverso del planeta. 24 suites sobre la canopía, donde las nubes pasan a través de tu terraza al amanecer.",
      FEATURE_1: "Yoga sobre la canopía",
      FEATURE_2: "Bosque nuboso privado",
      FEATURE_3: "Fotografía de naturaleza",
      PRICE_LABEL: "Desde",
      PRICE: "$145 / noche",
      CTA: "Reservar Monteverde",
    },
  },
  en: {
    EYEBROW: "Our properties",
    HEADLINE: "Two destinations, one vision",
    SUBHEADLINE: "Each property is a gateway to a unique Costa Rican ecosystem.",
    DRAG_HINT: "Drag to explore",
    DOT_LABEL: "Property",
    NAV_PREV: "Previous",
    NAV_NEXT: "Next",
    ARENAL: {
      NAME: "ALTAVERDE ARENAL",
      LOCATION: "Arenal & La Fortuna · Costa Rica",
      TAGLINE: "Where the volcano sets the pace",
      DESCRIPTION:
        "Facing Arenal Volcano, 24 private suites with direct access to volcanic thermal springs. Costa Rica's most dramatic nature, with the luxury you deserve.",
      FEATURE_1: "Private thermal springs",
      FEATURE_2: "Direct volcano views",
      FEATURE_3: "Night expeditions",
      PRICE_LABEL: "From",
      PRICE: "$180 / night",
      CTA: "Reserve Arenal",
    },
    MONTEVERDE: {
      NAME: "ALTAVERDE MONTEVERDE",
      LOCATION: "Monteverde · Costa Rica",
      TAGLINE: "Suspended among the clouds",
      DESCRIPTION:
        "In the heart of the most biodiverse cloud forest on the planet. 24 canopy suites, where clouds drift through your terrace at sunrise.",
      FEATURE_1: "Canopy yoga",
      FEATURE_2: "Private cloud forest",
      FEATURE_3: "Nature photography",
      PRICE_LABEL: "From",
      PRICE: "$145 / night",
      CTA: "Reserve Monteverde",
    },
  },
};
