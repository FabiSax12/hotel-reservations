import type { SupportedLocale } from "@hotel/i18n";
import type { ReservationsTexts } from "./reservationsTexts.type";

export const RESERVATIONS_TEXTS: Record<SupportedLocale, ReservationsTexts> = {
  es: {
    PAGE: {
      TITLE: "Reservaciones",
      DESCRIPTION: "Listado de todas las reservaciones del hotel.",
    },
    TABLE: {
      ARIA_LABEL: "Tabla de reservaciones",
      COL_CODE: "Código",
      COL_GUEST: "Huésped",
      COL_ROOM: "Habitación",
      COL_CHECKIN: "Check-in",
      COL_CHECKOUT: "Check-out",
      COL_NIGHTS: "Noches",
      COL_TOTAL: "Total (USD)",
      COL_STATUS: "Estado",
      COL_ACTIONS: "Acciones",
    },
    STATUS: {
      PENDING: "Pendiente",
      APPROVED: "Aprobada",
      CANCELLED: "Cancelada",
      COMPLETED: "Completada",
    },
    ACTIONS: {
      VIEW_DETAIL: "Ver detalle",
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
      COL_CODE: "Code",
      COL_GUEST: "Guest",
      COL_ROOM: "Room",
      COL_CHECKIN: "Check-in",
      COL_CHECKOUT: "Check-out",
      COL_NIGHTS: "Nights",
      COL_TOTAL: "Total (USD)",
      COL_STATUS: "Status",
      COL_ACTIONS: "Actions",
    },
    STATUS: {
      PENDING: "Pending",
      APPROVED: "Approved",
      CANCELLED: "Cancelled",
      COMPLETED: "Completed",
    },
    ACTIONS: {
      VIEW_DETAIL: "View details",
    },
    EMPTY: {
      TITLE: "No reservations",
      DESCRIPTION: "There are no reservations registered at this time.",
    },
  },
} as const;
