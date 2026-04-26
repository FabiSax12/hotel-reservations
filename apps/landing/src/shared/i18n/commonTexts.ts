import type { SupportedLocale } from "@hotel/i18n";
import type { CommonTexts } from "./commonTexts.type";

export const COMMON_TEXTS: Record<SupportedLocale, CommonTexts> = {
  es: {
    NAV: {
      HOME: "Inicio",
      ABOUT: "Nosotros",
      ROOMS: "Habitaciones",
      CONTACT: "Contacto",
    },
    ACTIONS: {
      BOOK_NOW: "Reservar ahora",
      LEARN_MORE: "Saber más",
    },
    ERRORS: {
      GENERIC: "Algo salió mal. Intentá de nuevo.",
    },
    LAYOUT: {
      HOTEL_NAME: "ALTAVERDE",
      TAGLINE: "Luxury Nature Retreats · Costa Rica",
      COPYRIGHT: "© 2024 ALTAVERDE. Todos los derechos reservados.",
      LOCATIONS_FOOTER: "Arenal & La Fortuna · Monteverde · Costa Rica",
      MARQUEE_ITEMS: ["ALTAVERDE", "ARENAL & LA FORTUNA", "MONTEVERDE", "LUXURY NATURE RETREATS", "COSTA RICA", "DESDE 2002"],
    },
  },
  en: {
    NAV: {
      HOME: "Home",
      ABOUT: "About Us",
      ROOMS: "Rooms",
      CONTACT: "Contact",
    },
    ACTIONS: {
      BOOK_NOW: "Book now",
      LEARN_MORE: "Learn more",
    },
    ERRORS: {
      GENERIC: "Something went wrong. Please try again.",
    },
    LAYOUT: {
      HOTEL_NAME: "ALTAVERDE",
      TAGLINE: "Luxury Nature Retreats · Costa Rica",
      COPYRIGHT: "© 2024 ALTAVERDE. All rights reserved.",
      LOCATIONS_FOOTER: "Arenal & La Fortuna · Monteverde · Costa Rica",
      MARQUEE_ITEMS: ["ALTAVERDE", "ARENAL & LA FORTUNA", "MONTEVERDE", "LUXURY NATURE RETREATS", "COSTA RICA", "SINCE 2002"],
    },
  },
};
