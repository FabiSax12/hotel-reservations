import type { SupportedLocale } from "@hotel/i18n";
import type { RoomsTexts } from "./roomsTexts.type";

export const ROOMS_TEXTS: Record<SupportedLocale, RoomsTexts> = {
  es: {
    REALTIME_AVAIL: "Disponibilidad en tiempo real",
    OPTIONS_IN: "Opciones en",
    ALL_DESTINATIONS: "Todos nuestros destinos",
    ROOMS_FOUND: "habitaciones encontradas",
    LAST_ROOM: "¡Última habitación disponible!",
    ONLY_REMAINING: "Solo quedan",
    ROOMS_PLURAL: "habitaciones",
    TYPE_LABEL: "Tipo",
    SQFT_LABEL: "m²",
    PRICE_LABEL: "Precio Promedio Por Noche",
    CURRENCY: "USD",
    AVAILABLE_DATES: "disponibles para sus fechas",
    SELECT_ACTION: "Seleccionar y Continuar",
  },
  en: {
    REALTIME_AVAIL: "Real-time availability",
    OPTIONS_IN: "Options in",
    ALL_DESTINATIONS: "All our destinations",
    ROOMS_FOUND: "rooms found",
    LAST_ROOM: "Last room available!",
    ONLY_REMAINING: "Only",
    ROOMS_PLURAL: "rooms left",
    TYPE_LABEL: "Type",
    SQFT_LABEL: "sq ft",
    PRICE_LABEL: "Average Price Per Night",
    CURRENCY: "USD",
    AVAILABLE_DATES: "available for your dates",
    SELECT_ACTION: "Select and Continue",
  },
} as const;
