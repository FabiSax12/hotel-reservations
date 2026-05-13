import type { SupportedLocale } from "@hotel/i18n";
import type { SearchTexts } from "./searchTexts.type";

export const SEARCH_TEXTS: Record<SupportedLocale, SearchTexts> = {
  es: {
    HERO: {
      TITLE: "¿Cuándo nos visitas?",
      SUBTITLE: "Seleccione su destino, fechas y cantidad de personas",
      BROWSE_ROOMS: "Explorar habitaciones",
    },
    SEARCH_BAR: {
      DESTINATION: {
        LABEL: "Sede",
        PLACEHOLDER: "¿A cuál vas?",
        POPOVER_TITLE: "Nuestras Sedes",
        FROM: "Desde",
        USD_NIGHT: "USD/noche",
      },
      DATES: {
        CHECK_IN_LABEL: "Llegada",
        CHECK_OUT_LABEL: "Salida",
        PLACEHOLDER: "Fechas",
      },
      GUESTS: {
        LABEL: "Huéspedes",
        ADULTS_TITLE: "Adultos",
        ADULTS_SUBTITLE: "Edad 13 o superior",
        CHILDREN_TITLE: "Niños",
        CHILDREN_SUBTITLE: "Edades 2-12",
        PETS_TITLE: "Mascotas",
        PETS_SUBTITLE: "¿Viajas con peludos?",
        SINGLE_ADULT: "Adulto",
        PLURAL_ADULTS: "Adultos",
        SHORT_ADULT_1: "Ad.",
        SHORT_ADULT_2: "Adult.",
        SHORT_CHILD: "Niño",
        SHORT_CHILDREN: "Niños",
        SHORT_CHILDREN_1: "Ni.",
        SHORT_PET: "Masc.",
        SHORT_PET_1: "Mas.",
      },
      ACTION: {
        SEARCH_BTN: "Buscar",
      },
      VALIDATION: {
        MISSING_CHECK_IN: "Selecciona una fecha de llegada",
        MISSING_CHECK_OUT: "Selecciona una fecha de salida",
        MISSING_BOTH_DATES: "Selecciona las fechas de tu estadía",
        INVALID_DATE_RANGE: "La llegada debe ser antes de la salida",
        MISSING_SEDE: "Selecciona una sede para buscar",
      },
    },
  },
  en: {
    HERO: {
      TITLE: "When are you visiting?",
      SUBTITLE: "Select your destination, dates and number of guests",
      BROWSE_ROOMS: "Browse rooms",
    },
    SEARCH_BAR: {
      DESTINATION: {
        LABEL: "Destination",
        PLACEHOLDER: "Where to?",
        POPOVER_TITLE: "Our Locations",
        FROM: "From",
        USD_NIGHT: "USD/night",
      },
      DATES: {
        CHECK_IN_LABEL: "Check-in",
        CHECK_OUT_LABEL: "Check-out",
        PLACEHOLDER: "Dates",
      },
      GUESTS: {
        LABEL: "Guests",
        ADULTS_TITLE: "Adults",
        ADULTS_SUBTITLE: "Age 13 or above",
        CHILDREN_TITLE: "Children",
        CHILDREN_SUBTITLE: "Ages 2-12",
        PETS_TITLE: "Pets",
        PETS_SUBTITLE: "Traveling with pets?",
        SINGLE_ADULT: "Adult",
        PLURAL_ADULTS: "Adults",
        SHORT_ADULT_1: "Ad.",
        SHORT_ADULT_2: "Adult",
        SHORT_CHILD: "Child",
        SHORT_CHILDREN: "Children",
        SHORT_CHILDREN_1: "Ch.",
        SHORT_PET: "Pet",
        SHORT_PET_1: "Pet",
      },
      ACTION: {
        SEARCH_BTN: "Search",
      },
      VALIDATION: {
        MISSING_CHECK_IN: "Select a check-in date",
        MISSING_CHECK_OUT: "Select a check-out date",
        MISSING_BOTH_DATES: "Select your stay dates",
        INVALID_DATE_RANGE: "Check-in must be before check-out",
        MISSING_SEDE: "Select a destination to search",
      },
    },
  },
} as const;
