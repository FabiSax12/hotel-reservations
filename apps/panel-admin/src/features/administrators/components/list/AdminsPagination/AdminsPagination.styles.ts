export const ADMINS_PAGINATION_STYLES = {
  wrapper:  "flex items-center justify-start pt-2",
  content:  "flex items-center gap-1",

  navButton:
    "flex h-8 w-8 items-center justify-center rounded-lg " +
    "border border-white/30 bg-white/10 text-white/80 " +
    "transition-colors hover:border-white/60 hover:bg-white/20 hover:text-white " +
    "disabled:pointer-events-none disabled:opacity-30",

  pageLink:
    "flex h-8 w-8 items-center justify-center rounded-lg " +
    "text-sm font-medium text-white/70 " +
    "transition-colors hover:bg-white/15 hover:text-white",

  pageLinkActive:
    "flex h-8 w-8 items-center justify-center rounded-lg " +
    "bg-emerald-900 text-sm font-semibold text-white shadow-sm",

  ellipsis:
    "flex h-8 w-8 items-center justify-center text-sm text-white/40 select-none",
} as const;
