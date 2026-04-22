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
    STATUS: {
      NOT_FOUND: {
        TITLE: "Página no encontrada",
        MESSAGE: "La ruta que estás buscando no existe o fue movida.",
        RETURN_LINK: "Volver al inicio",
      },
      ERROR: {
        TITLE: "¡Ups! Algo salió mal",
        MESSAGE: "Ocurrió un error inesperado al procesar tu solicitud.",
        RETRY: "Intentar de nuevo",
      },
      LOADING: "Cargando datos...",
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
    STATUS: {
      NOT_FOUND: {
        TITLE: "Page not found",
        MESSAGE: "The route you are looking for does not exist or was moved.",
        RETURN_LINK: "Return home",
      },
      ERROR: {
        TITLE: "Oops! Something went wrong",
        MESSAGE: "An unexpected error occurred while processing your request.",
        RETRY: "Try again",
      },
      LOADING: "Loading data...",
    },
  },
} as const;
