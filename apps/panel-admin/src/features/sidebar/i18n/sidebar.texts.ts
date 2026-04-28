import type { SupportedLocale } from "@hotel/i18n";
import type { SidebarTexts } from "./sidebar.type";

export const SIDEBAR_TEXTS: Record<SupportedLocale, SidebarTexts> = {
  es: {
    WRAPPER: {
      ARIA_LABEL: "Navegación principal",
    },
    HEADER: {
      LOGO: "Panel de administración",
      EXPAND: "Expandir barra lateral",
      COLLAPSE: "Colapsar barra lateral",
    },
  },
  en: {
    WRAPPER: {
      ARIA_LABEL: "Main navigation",
    },
    HEADER: {
      LOGO: "Admin panel",
      EXPAND: "Expand sidebar",
      COLLAPSE: "Collapse sidebar",
    },
  },
} as const;
