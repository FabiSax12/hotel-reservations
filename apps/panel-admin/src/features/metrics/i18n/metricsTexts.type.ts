export interface MetricsTexts {
  PAGE: {
    TITLE_PREFIX: string;
    TITLE_ACCENT: string;
    SUBTITLE: string;
    EXPORT_BUTTON: string;
    ARIA_DATE_RANGE: string;
  };
  STATS: {
    TOTAL_RESERVATIONS: string;
    TOTAL_REVENUE: string;
    AVG_OCCUPANCY: string;
    ACTIVE_ROOMS: string;
  };
  TABS: {
    RESERVATIONS_BY_STATUS: string;
    ROOM_OCCUPANCY: string;
    RANKING: string;
    LIST_ARIA_LABEL: string;
  };
  STATUS_TAB: {
    TITLE: string;
    TOTAL_LABEL: string;
    PERIOD_PREFIX: string;
    WEEKLY_TITLE: string;
    WEEKLY_EMPTY: string;
    CHART_ARIA_LABEL: string;
    LEGEND_LABEL: string;
    BAR_ARIA_LABEL: string;
  };
  STATUS_LABELS: {
    PENDING: string;
    APPROVED: string;
    CANCELLED: string;
    COMPLETED: string;
  };
  OCCUPANCY_TAB: {
    TITLE: string;
    SUBTITLE: string;
    EMPTY: string;
  };
  RANKING_TAB: {
    TITLE: string;
    SUBTITLE: string;
    RESERVATIONS_SUFFIX: string;
    EMPTY: string;
    METER_ARIA_LABEL_SUFFIX: string;
  };
  ERRORS: {
    FETCH_RESERVATIONS: string;
    FETCH_ROOMS: string;
  };
}
