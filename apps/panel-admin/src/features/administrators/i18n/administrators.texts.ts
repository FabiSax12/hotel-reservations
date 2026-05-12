import type { SupportedLocale } from "@hotel/i18n";
import type { AdministratorsTexts } from "./administratorsTexts.type";

export const ADMINISTRATORS_TEXTS: Record<SupportedLocale, AdministratorsTexts> = {
  es: {
    PAGE: {
      TITLE_PREFIX: "Gestión de",
      TITLE_ACCENT: "Administradores",
      SUBTITLE:     "Lista de todos los administradores del sistema",
    },
    STAT: {
      TOTAL_LABEL:   "Total",
      TOTAL_CAPTION: "Administradores",
    },
    TABLE: {
      ARIA_LABEL:      "Tabla de administradores",
      COL_EMAIL:       "Correo electrónico",
      COL_STATUS:      "Estado",
      COL_CREATED_AT:  "Miembro desde",
      BADGE_YOU:       "Tú",
      STATUS_ACTIVE:   "Activo",
      STATUS_INACTIVE: "Inactivo",
    },
    PAGINATION: {
      ARIA_LABEL: "Paginación de administradores",
      PREVIOUS:   "Anterior",
      NEXT:       "Siguiente",
      SHOWING:    "Mostrando",
      OF:         "de",
      ITEMS:      "administradores",
    },
    EMPTY: {
      TITLE:       "Sin administradores",
      DESCRIPTION: "No hay administradores registrados en el sistema.",
    },
  },
  en: {
    PAGE: {
      TITLE_PREFIX: "Manage",
      TITLE_ACCENT: "Administrators",
      SUBTITLE:     "List of all system administrators",
    },
    STAT: {
      TOTAL_LABEL:   "Total",
      TOTAL_CAPTION: "Administrators",
    },
    TABLE: {
      ARIA_LABEL:      "Administrators table",
      COL_EMAIL:       "Email",
      COL_STATUS:      "Status",
      COL_CREATED_AT:  "Member since",
      BADGE_YOU:       "You",
      STATUS_ACTIVE:   "Active",
      STATUS_INACTIVE: "Inactive",
    },
    PAGINATION: {
      ARIA_LABEL: "Administrators pagination",
      PREVIOUS:   "Previous",
      NEXT:       "Next",
      SHOWING:    "Showing",
      OF:         "of",
      ITEMS:      "administrators",
    },
    EMPTY: {
      TITLE:       "No administrators",
      DESCRIPTION: "There are no administrators registered in the system.",
    },
  },
} as const;
