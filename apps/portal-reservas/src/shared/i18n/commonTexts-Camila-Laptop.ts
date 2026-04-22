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
      NOT_FOUND: {
        TITLE: "Página no encontrada",
        MESSAGE: "La página que buscás no existe. Quizás la URL esté mal escrita.",
        RETURN_LINK: "Volver al inicio",
      },
      ERROR: {
        TITLE: "¡Ups! Algo salió mal",
        MESSAGE: "Tuvimos un problema procesando tu solicitud.",
        RETRY: "Reintentar",
      },
      LOADING: "Cargando...",
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
      NOT_FOUND: {
        TITLE: "Page not found",
        MESSAGE: "The page you are looking for does not exist. Maybe the URL is typed incorrectly.",
        RETURN_LINK: "Return home",
      },
      ERROR: {
        TITLE: "Oops! Something went wrong",
        MESSAGE: "We had a problem processing your request.",
        RETRY: "Retry",
      },
      LOADING: "Loading...",
    },
  },
} as const;
