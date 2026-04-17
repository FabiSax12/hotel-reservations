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
  },
} as const;
