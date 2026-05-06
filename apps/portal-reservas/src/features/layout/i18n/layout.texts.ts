import type { SupportedLocale } from "@hotel/i18n";
import type { LayoutTexts } from "./layoutTexts.type";

export const LAYOUT_TEXTS: Record<SupportedLocale, LayoutTexts> = {
  es: {
    HEADER: {
      BRAND: "EcoResorts",
      BRAND_HIGHLIGHT: "CR",
      HELP: "¿Necesita Ayuda?",
      MY_RESERVATIONS: "Mis Reservas",
      LOGOUT: "Cerrar Sesión",
      SIGN_IN: "Iniciar Sesión",
    },
  },
  en: {
    HEADER: {
      BRAND: "EcoResorts",
      BRAND_HIGHLIGHT: "CR",
      HELP: "Need Help?",
      MY_RESERVATIONS: "My Reservations",
      LOGOUT: "Logout",
      SIGN_IN: "Sign In",
    },
  },
} as const;
