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
  },
} as const;
