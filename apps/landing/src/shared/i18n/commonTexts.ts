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
      COPYRIGHT: "Todos los derechos reservados.",
      LOCATIONS_FOOTER: "Arenal & La Fortuna · Monteverde · Costa Rica",
      MARQUEE_ITEMS: [
        "ALTAVERDE",
        "ARENAL & LA FORTUNA",
        "MONTEVERDE",
        "LUXURY NATURE RETREATS",
        "COSTA RICA",
        "DESDE 2002",
      ],
      META_TITLE: "ALTAVERDE — Luxury Nature Retreats · Costa Rica",
      META_DESCRIPTION:
        "Donde la selva toca el cielo. Dos propiedades de lujo inmersas en la biodiversidad de Costa Rica: Arenal & La Fortuna y Monteverde.",
      META_OG_DESCRIPTION: "Luxury Nature Retreats · Costa Rica",
      SOCIAL: {
        SECTION_LABEL: "Redes sociales",
        INSTAGRAM_LABEL: "Instagram de ALTAVERDE",
        FACEBOOK_LABEL: "Facebook de ALTAVERDE",
        WHATSAPP_LABEL: "WhatsApp de ALTAVERDE",
      },
      LEGAL: {
        PRIVACY: "Política de privacidad",
        TERMS: "Términos y condiciones",
      },
      CONTACT: {
        EMAIL_LABEL: "Correo electrónico",
        WHATSAPP_LABEL: "Escribinos por WhatsApp",
        ADDRESS_LABEL: "Ver en Google Maps",
      },
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
      COPYRIGHT: "All rights reserved.",
      LOCATIONS_FOOTER: "Arenal & La Fortuna · Monteverde · Costa Rica",
      MARQUEE_ITEMS: [
        "ALTAVERDE",
        "ARENAL & LA FORTUNA",
        "MONTEVERDE",
        "LUXURY NATURE RETREATS",
        "COSTA RICA",
        "SINCE 2002",
      ],
      META_TITLE: "ALTAVERDE — Luxury Nature Retreats · Costa Rica",
      META_DESCRIPTION:
        "Where the forest meets the sky. Two luxury properties immersed in Costa Rica's biodiversity: Arenal & La Fortuna and Monteverde.",
      META_OG_DESCRIPTION: "Luxury Nature Retreats · Costa Rica",
      SOCIAL: {
        SECTION_LABEL: "Social media",
        INSTAGRAM_LABEL: "ALTAVERDE on Instagram",
        FACEBOOK_LABEL: "ALTAVERDE on Facebook",
        WHATSAPP_LABEL: "Message us on WhatsApp",
      },
      LEGAL: {
        PRIVACY: "Privacy Policy",
        TERMS: "Terms & Conditions",
      },
      CONTACT: {
        EMAIL_LABEL: "Email us",
        WHATSAPP_LABEL: "Message us on WhatsApp",
        ADDRESS_LABEL: "View on Google Maps",
      },
    },
  },
};
