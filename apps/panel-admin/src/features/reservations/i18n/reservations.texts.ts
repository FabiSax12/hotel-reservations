import type { SupportedLocale } from "@hotel/i18n";
import type { ReservationsTexts } from "./reservationsTexts.type";

export const RESERVATIONS_TEXTS: Record<SupportedLocale, ReservationsTexts> = {
  es: {
    PAGE: {
      TITLE_PREFIX: "Gestión de",
      TITLE_ACCENT: "Reservaciones",
      DESCRIPTION: "Lista total de las reservaciones del hotel:",
      NEW_RESERVATION: "Nueva reservación",
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
    STATS: {
      PENDING_LABEL: "PENDIENTES",
      PENDING_NOTE: "Requieren revisión",
      APPROVED_LABEL: "APROBADAS",
      APPROVED_NOTE: "Confirmadas",
      TOTAL_LABEL: "TOTAL",
      TOTAL_NOTE: "Registradas",
    },
    FILTERS: {
      ALL: "Todo",
      PLACEHOLDER_ROOM: "Todas las habitaciones",
      DATE_RANGE_PICKER_LABEL: "Fecha",
      CLEAR: "Limpiar filtros",
      RESULTS_SUFFIX: "reservaciones",
      RESULTS_OF: "de",
    },
  },
  en: {
    PAGE: {
      TITLE_PREFIX: "Reservations",
      TITLE_ACCENT: "Management",
      DESCRIPTION: "List of all hotel reservations.",
      NEW_RESERVATION: "New reservation",
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
    STATS: {
      PENDING_LABEL: "PENDING",
      PENDING_NOTE: "Needs review",
      APPROVED_LABEL: "APPROVED",
      APPROVED_NOTE: "Confirmed",
      TOTAL_LABEL: "TOTAL",
      TOTAL_NOTE: "Registered",
    },
    FILTERS: {
      ALL: "All",
      PLACEHOLDER_ROOM: "All rooms",
      DATE_RANGE_PICKER_LABEL: "Date",
      CLEAR: "Clear filters",
      RESULTS_SUFFIX: "reservations",
      RESULTS_OF: "of",
    },
  },
} as const;
