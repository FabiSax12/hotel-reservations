import type { SupportedLocale } from "@hotel/i18n";
import type { CommonTexts } from "./commonTexts.type";

export const COMMON_TEXTS: Record<SupportedLocale, CommonTexts> = {
  es: {
    NAV: {
      DASHBOARD: "Panel",
      RESERVATIONS: "Reservas",
      ROOMS: "Habitaciones",
      GUESTS: "Huéspedes",
      SETTINGS: "Configuración",
    },
    ACTIONS: {
      SAVE: "Guardar",
      CANCEL: "Cancelar",
      DELETE: "Eliminar",
      EDIT: "Editar",
    },
    ERRORS: {
      GENERIC: "Algo salió mal. Intentá de nuevo.",
      UNAUTHORIZED: "No tenés permiso para realizar esta acción.",
    },
  },
  en: {
    NAV: {
      DASHBOARD: "Dashboard",
      RESERVATIONS: "Reservations",
      ROOMS: "Rooms",
      GUESTS: "Guests",
      SETTINGS: "Settings",
    },
    ACTIONS: {
      SAVE: "Save",
      CANCEL: "Cancel",
      DELETE: "Delete",
      EDIT: "Edit",
    },
    ERRORS: {
      GENERIC: "Something went wrong. Please try again.",
      UNAUTHORIZED: "You don't have permission to perform this action.",
    },
  },
} as const;
