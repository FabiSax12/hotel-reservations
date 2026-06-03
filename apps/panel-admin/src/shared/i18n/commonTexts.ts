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
      SAVING: "Guardando...",
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
      LOADING: "Cargando...",
      ERROR_TITLE: "Ocurrió un error",
      ERROR_MESSAGE: "Hubo un problema al cargar esta página.",
      TRY_AGAIN: "Intentar de nuevo",
      NOT_FOUND_TITLE: "Página no encontrada",
      NOT_FOUND_MESSAGE: "La página que buscas no existe o fue movida.",
      RETURN_HOME: "Volver al inicio",
      FORBIDDEN_TITLE: "403",
      FORBIDDEN_SUBTITLE: "Acceso Restringido",
      FORBIDDEN_MESSAGE: "No tienes permiso para acceder a esta sección.",
      FORBIDDEN_BACK_BUTTON: "Volver al Dashboard",
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
      SAVING: "Saving...",
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
      LOADING: "Loading...",
      ERROR_TITLE: "An error occurred",
      ERROR_MESSAGE: "There was a problem loading this page.",
      TRY_AGAIN: "Try again",
      NOT_FOUND_TITLE: "Page not found",
      NOT_FOUND_MESSAGE: "The page you are looking for does not exist or has been moved.",
      RETURN_HOME: "Return home",
      FORBIDDEN_TITLE: "403",
      FORBIDDEN_SUBTITLE: "Access Restricted",
      FORBIDDEN_MESSAGE: "You don't have permission to access this section.",
      FORBIDDEN_BACK_BUTTON: "Back to Dashboard",
    },
  },
} as const;
