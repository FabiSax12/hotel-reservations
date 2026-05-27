export const RESERVATION_EXPANDED_PANEL_STYLES = {
  label: "text-[11px] font-bold uppercase tracking-widest text-gray-400",
  wrapperBase: "bg-[#e8e6db] border-b border-[#d8d6cb]",
  wrapperEnter: "animate-expand-down",
  wrapperExit: "animate-collapse-up",
  body: "grid grid-cols-1 md:grid-cols-3 gap-4 p-6",
  footerLine1: "px-6 pb-6 flex flex-col",
  footerLine2: "px-4 pb-2 flex justify-between items-center",
  leftFooter: "flex items-center gap-2",
  rightFooter: "flex gap-2",
  button:
    "inline-flex cursor-pointer select-none items-center gap-1.5 rounded-full bg-white border border-gray-200 shadow-sm px-3 py-1.5 text-sm font-medium tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 hover:shadow-md",
  iconColor: "text-emerald-900 w-4 h-4 group-hover:text-white transition-colors",
} as const;
