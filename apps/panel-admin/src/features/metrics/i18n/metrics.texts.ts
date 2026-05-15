import type { SupportedLocale } from "@hotel/i18n";
import type { MetricsTexts } from "./metricsTexts.type";

export const METRICS_TEXTS: Record<SupportedLocale, MetricsTexts> = {
  es: {
    PAGE: {
      TITLE_PREFIX: "Dashboard de",
      TITLE_ACCENT: "Métricas",
      SUBTITLE: "Rendimiento financiero del hotel en tiempo real",
      EXPORT_BUTTON: "Exportar",
      ARIA_DATE_RANGE: "Rango de fechas para filtrar métricas",
    },
    STATS: {
      TOTAL_RESERVATIONS: "Total reservaciones",
      TOTAL_REVENUE: "Ingresos totales (USD)",
      AVG_OCCUPANCY: "Ocupación promedio",
      ACTIVE_ROOMS: "Cuartos activos",
    },
    TABS: {
      RESERVATIONS_BY_STATUS: "Reservaciones por Estado",
      ROOM_OCCUPANCY: "Ocupación por Cuarto",
      RANKING: "Ranking & Ingresos",
    },
    STATUS_TAB: {
      TITLE: "Reservaciones por Estado",
      TOTAL_LABEL: "reservaciones en el rango seleccionado",
      PERIOD_PREFIX: "PERÍODO",
      WEEKLY_TITLE: "Distribución semanal",
      WEEKLY_SUBTITLE: "Reservaciones por estado · últimas 7 semanas",
      LEGEND_LABEL: "Leyenda",
    },
    STATUS_LABELS: {
      PENDING: "Pendiente",
      APPROVED: "Aprobada",
      CANCELLED: "Cancelada",
      COMPLETED: "Completada",
    },
    OCCUPANCY_TAB: {
      TITLE: "Ocupación por Cuarto",
      SUBTITLE: "Porcentaje de ocupación y revenue por habitación",
      EMPTY: "No hay datos de ocupación para el rango seleccionado.",
    },
    RANKING_TAB: {
      TITLE: "Ranking & Ingresos",
      SUBTITLE: "Cuartos ordenados por número de reservaciones aprobadas o completadas",
      RESERVATIONS_SUFFIX: "reserv.",
      EMPTY: "No hay reservaciones activas para el rango seleccionado.",
    },
    ERRORS: {
      FETCH_RESERVATIONS: "Error al obtener métricas de reservaciones",
      FETCH_ROOMS: "Error al obtener información de cuartos",
    },
  },
  en: {
    PAGE: {
      TITLE_PREFIX: "Metrics",
      TITLE_ACCENT: "Dashboard",
      SUBTITLE: "Real-time hotel financial performance",
      EXPORT_BUTTON: "Export",
      ARIA_DATE_RANGE: "Date range for filtering metrics",
    },
    STATS: {
      TOTAL_RESERVATIONS: "Total reservations",
      TOTAL_REVENUE: "Total revenue (USD)",
      AVG_OCCUPANCY: "Average occupancy",
      ACTIVE_ROOMS: "Active rooms",
    },
    TABS: {
      RESERVATIONS_BY_STATUS: "Reservations by Status",
      ROOM_OCCUPANCY: "Occupancy by Room",
      RANKING: "Ranking & Revenue",
    },
    STATUS_TAB: {
      TITLE: "Reservations by Status",
      TOTAL_LABEL: "reservations in selected range",
      PERIOD_PREFIX: "PERIOD",
      WEEKLY_TITLE: "Weekly distribution",
      WEEKLY_SUBTITLE: "Reservations by status · last 7 weeks",
      LEGEND_LABEL: "Legend",
    },
    STATUS_LABELS: {
      PENDING: "Pending",
      APPROVED: "Approved",
      CANCELLED: "Cancelled",
      COMPLETED: "Completed",
    },
    OCCUPANCY_TAB: {
      TITLE: "Occupancy by Room",
      SUBTITLE: "Occupancy percentage and revenue per room",
      EMPTY: "No occupancy data for the selected range.",
    },
    RANKING_TAB: {
      TITLE: "Ranking & Revenue",
      SUBTITLE: "Rooms ordered by number of approved or completed reservations",
      RESERVATIONS_SUFFIX: "reserv.",
      EMPTY: "No active reservations for the selected range.",
    },
    ERRORS: {
      FETCH_RESERVATIONS: "Error fetching reservation metrics",
      FETCH_ROOMS: "Error fetching room information",
    },
  },
} as const;
