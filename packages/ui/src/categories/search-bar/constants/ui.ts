/**
 * @file ui.ts — Centralized UI copy for the @hotel/ui search bar component.
 *
 * Follows the "Zero Magic Strings" rule. All user-facing text rendered
 * by any search bar sub-component is defined here. Organized by section:
 *  - DESTINATION: Labels for the "Sede" field and its popover.
 *  - DATES: Labels for the check-in/check-out fields and calendar tooltips.
 *  - GUESTS: Labels, titles, and abbreviated forms for the guest counter.
 *  - ACTION: The search button label.
 *
 * The `SHORT_*` variants are used when multiple guest categories are active
 * simultaneously, so the text fits within the compact bar without truncation.
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
    /** Abbreviated "Adults" when all three guest types are present. */
    SHORT_ADULT_1: "Ad.",
    /** Abbreviated "Adults" when two guest types are present. */
    SHORT_ADULT_2: "Adult.",
    SHORT_CHILD: "Niño",
    SHORT_CHILDREN: "Niños",
    /** Abbreviated "Children" when all three guest types are present. */
    SHORT_CHILDREN_1: "Ni.",
    SHORT_PET: "Masc.",
    /** Abbreviated "Pets" when all three guest types are present. */
    SHORT_PET_1: "Mas.",
  },
  ACTION: {
    SEARCH_BTN: "Buscar"
  },
  /**
   * Validation error messages shown when the user clicks "Buscar"
   * with incomplete or invalid search data.
   *
   * All messages follow /clarify principles:
   *  - Specific: exactly what's missing.
   *  - Actionable: tells the user what to do.
   *  - Non-blaming: "Selecciona…" not "Olvidaste…".
   */
  VALIDATION: {
    /** Shown when only the check-in date is missing. */
    MISSING_CHECK_IN: "Selecciona una fecha de llegada",
    /** Shown when only the check-out date is missing. */
    MISSING_CHECK_OUT: "Selecciona una fecha de salida",
    /** Shown when both dates are missing. */
    MISSING_BOTH_DATES: "Selecciona las fechas de tu estadía",
    /** Shown when check-in ≥ check-out (defensive — calendar mostly prevents this). */
    INVALID_DATE_RANGE: "La llegada debe ser antes de la salida",
  }
} as const;
