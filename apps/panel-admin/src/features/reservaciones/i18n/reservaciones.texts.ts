import type { SupportedLocale } from "@hotel/i18n";
import type { ReservacionesTexts } from "./reservacionesTexts.type";

export const RESERVACIONES_TEXTS: Record<SupportedLocale, ReservacionesTexts> = {
  es: {
    PAGE: {
      TITLE: "Reservaciones",
      DESCRIPTION: "Listado de todas las reservaciones del hotel.",
    },
    TABLE: {
      ARIA_LABEL: "Tabla de reservaciones",
      COL_CODIGO: "Código",
      COL_HUESPED: "Huésped",
      COL_HABITACION: "Habitación",
      COL_CHECKIN: "Check-in",
      COL_CHECKOUT: "Check-out",
      COL_NOCHES: "Noches",
      COL_TOTAL: "Total (USD)",
      COL_ESTADO: "Estado",
      COL_ACCIONES: "Acciones",
    },
    STATUS: {
      PENDIENTE: "Pendiente",
      APROBADA: "Aprobada",
      CANCELADA: "Cancelada",
      COMPLETADA: "Completada",
    },
    ACTIONS: {
      VER_DETALLE: "Ver detalle",
    },
    EMPTY: {
      TITLE: "Sin reservaciones",
      DESCRIPTION: "No hay reservaciones registradas por el momento.",
    },
  },
  en: {
    PAGE: {
      TITLE: "Reservations",
      DESCRIPTION: "List of all hotel reservations.",
    },
    TABLE: {
      ARIA_LABEL: "Reservations table",
      COL_CODIGO: "Code",
      COL_HUESPED: "Guest",
      COL_HABITACION: "Room",
      COL_CHECKIN: "Check-in",
      COL_CHECKOUT: "Check-out",
      COL_NOCHES: "Nights",
      COL_TOTAL: "Total (USD)",
      COL_ESTADO: "Status",
      COL_ACCIONES: "Actions",
    },
    STATUS: {
      PENDIENTE: "Pending",
      APROBADA: "Approved",
      CANCELADA: "Cancelled",
      COMPLETADA: "Completed",
    },
    ACTIONS: {
      VER_DETALLE: "View details",
    },
    EMPTY: {
      TITLE: "No reservations",
      DESCRIPTION: "There are no reservations registered at this time.",
    },
  },
} as const;
