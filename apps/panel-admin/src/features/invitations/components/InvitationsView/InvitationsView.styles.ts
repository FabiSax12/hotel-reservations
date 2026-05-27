export const TAB_KEYS = {
  PENDING: "pending",
  HISTORY: "history",
} as const;

export type TabKey = (typeof TAB_KEYS)[keyof typeof TAB_KEYS];

export const styles = {
  tabButton: {
    base: "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
    active: "bg-primary-100 text-primary-700",
    inactive: "text-gray-600 hover:bg-gray-100",
  },
  container: "mb-4 flex gap-2",
} as const;
