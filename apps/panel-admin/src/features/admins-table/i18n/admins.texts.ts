import type { SupportedLocale } from "@hotel/i18n";
import type { AdminsTexts } from "./adminsTexts.type";

export const ADMINS_TEXTS: Record<SupportedLocale, AdminsTexts> = {
  es: {
    PAGE: {
      TITLE_PREFIX: "Gestión de",
      TITLE_ACCENT: "Administradores",
      DESCRIPTION: "Lista total de los administradores del sistema:",
    },
    TABLE: {
      COL_NAME: "Nombre",
      COL_EMAIL: "Email",
      COL_STATUS: "Estado",
      COL_ROLE: "Rol",
    },
    STATS: {
      ACTIVE_LABEL: "ACTIVOS",
      ACTIVE_NOTE: "Con acceso al panel",
      INACTIVE_LABEL: "INACTIVOS",
      INACTIVE_NOTE: "Sin acceso",
      TOTAL_LABEL: "TOTAL",
      TOTAL_NOTE: "Registrados",
    },
    EMPTY: {
      TITLE: "Sin administradores",
      DESCRIPTION: "No hay administradores registrados por el momento.",
    },
  },
  en: {
    PAGE: {
      TITLE_PREFIX: "Admin",
      TITLE_ACCENT: "Management",
      DESCRIPTION: "List of all system administrators.",
    },
    TABLE: {
      COL_NAME: "Name",
      COL_EMAIL: "Email",
      COL_STATUS: "Status",
      COL_ROLE: "Role",
    },
    STATS: {
      ACTIVE_LABEL: "ACTIVE",
      ACTIVE_NOTE: "With panel access",
      INACTIVE_LABEL: "INACTIVE",
      INACTIVE_NOTE: "No access",
      TOTAL_LABEL: "TOTAL",
      TOTAL_NOTE: "Registered",
    },
    EMPTY: {
      TITLE: "No administrators",
      DESCRIPTION: "There are no administrators registered at this time.",
    },
  },
} as const;
