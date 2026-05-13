import type { SupportedLocale } from "@hotel/i18n";
import type { LayoutTexts } from "./layoutTexts.type";

export const LAYOUT_TEXTS: Record<SupportedLocale, LayoutTexts> = {
  es: {
    HEADER: {
      BRAND: "ALTAVERDE",
      BRAND_HIGHLIGHT: "",
      HELP: "¿Necesita Ayuda?",
      MY_RESERVATIONS: "Mis Reservas",
    },
  },
  en: {
    HEADER: {
      BRAND: "ALTAVERDE",
      BRAND_HIGHLIGHT: "",
      HELP: "Need Help?",
      MY_RESERVATIONS: "My Reservations",
    },
  },
} as const;
