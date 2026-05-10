export const SIDEBAR_ROUTES_SECTION_STYLES = {
  wrapper: "flex h-screen flex-col border-r border-gray-200 bg-white",
  expanded: "w-72",
  collapsed: "w-20",
  header: "flex items-center justify-between border-b border-gray-100 px-4 py-4",
  logo: "flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-gray-700",
  collapseButton: "h-9 w-9 text-gray-600",
  body: "flex-1 overflow-y-auto px-3 py-4",
  section: "mb-6",
  sectionTitle: "px-2 pb-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray-400",
} as const;
