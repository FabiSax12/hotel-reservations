export const METRICS_TABS_STYLES = {
  wrapper:    "w-full",
  list:       "w-full",
  tab:        "text-sm font-medium",
  panel:      "rounded-xl border border-gray-100 bg-white p-6 shadow-sm mt-4",
  panelTitle: "mb-4 text-base font-semibold text-gray-900",
} as const;

export const METRICS_TAB_KEYS = Object.freeze({
  RESERVATIONS_BY_STATUS: "reservations-by-status",
  ROOM_OCCUPANCY: "room-occupancy",
  RANKING: "ranking",
} as const);
