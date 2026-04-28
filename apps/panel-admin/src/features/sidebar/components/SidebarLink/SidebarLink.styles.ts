export const SIDEBAR_LINK_STYLES = {
  navItem:
    "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-gray-600 transition-colors",
  navItemActive: "bg-gray-900 text-white shadow-sm",
  navItemInactive: "hover:bg-gray-100",
  icon: "h-5 w-5",
  collapsedLabel: "sr-only",
} as const;
