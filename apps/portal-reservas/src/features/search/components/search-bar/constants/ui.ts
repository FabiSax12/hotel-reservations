/**
 * @file ui.ts — Centralized UI copy for the portal's local search bar component.
 */

export const SEARCH_BAR_UI_CONSTANTS = {
  DESTINATION: {
    LABEL: "Sede",
    PLACEHOLDER: "¿A cuál vas?",
    POPOVER_TITLE: "Nuestras Sedes",
    FROM: "Desde",
    USD_NIGHT: "USD/noche"
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
    SEARCH_BTN: "Buscar"
  },
  VALIDATION: {
    MISSING_CHECK_IN: "Selecciona una fecha de llegada",
    MISSING_CHECK_OUT: "Selecciona una fecha de salida",
    MISSING_BOTH_DATES: "Selecciona las fechas de tu estadía",
    INVALID_DATE_RANGE: "La llegada debe ser antes de la salida",
    MISSING_SEDE: "Selecciona una sede para buscar",
  }
} as const;
