import type { SupportedLocale } from "@hotel/i18n";
import type { CommonTexts } from "./commonTexts.type";

export const COMMON_TEXTS: Record<SupportedLocale, CommonTexts> = {
  es: {
    NAV: {
      SEARCH: "Buscar",
      MY_RESERVATIONS: "Mis reservas",
      PROFILE: "Mi perfil",
      LOGOUT: "Cerrar sesión",
    },
    ACTIONS: {
      BOOK: "Reservar",
      CANCEL: "Cancelar",
      CONFIRM: "Confirmar",
      BACK: "Volver",
    },
    ERRORS: {
      GENERIC: "Algo salió mal. Intentá de nuevo.",
      SESSION_EXPIRED: "Tu sesión expiró. Ingresá nuevamente.",
    },
    STATUS: {
      LOADING: "Cargando...",
      ERROR_TITLE: "Ocurrió un error",
      ERROR_MESSAGE: "Hubo un problema al cargar esta página.",
      TRY_AGAIN: "Intentar de nuevo",
      NOT_FOUND_TITLE: "Página no encontrada",
      NOT_FOUND_MESSAGE: "La página que buscas no existe o fue movida.",
      RETURN_HOME: "Volver al inicio",
    },
  },
  en: {
    NAV: {
      SEARCH: "Search",
      MY_RESERVATIONS: "My reservations",
      PROFILE: "My profile",
      LOGOUT: "Log out",
    },
    ACTIONS: {
      BOOK: "Book",
      CANCEL: "Cancel",
      CONFIRM: "Confirm",
      BACK: "Back",
    },
    ERRORS: {
      GENERIC: "Something went wrong. Please try again.",
      SESSION_EXPIRED: "Your session expired. Please sign in again.",
    },
    STATUS: {
      LOADING: "Loading...",
      ERROR_TITLE: "An error occurred",
      ERROR_MESSAGE: "There was a problem loading this page.",
      TRY_AGAIN: "Try again",
      NOT_FOUND_TITLE: "Page not found",
      NOT_FOUND_MESSAGE: "The page you are looking for does not exist or has been moved.",
      RETURN_HOME: "Return home",
    },
  },
} as const;
