// ─── @hotel/ui – DestinationPopover Styles ───────────────────────────────────

export const DESTINATION_POPOVER_STYLES = {
  panel: (positionClasses: string) =>
    `absolute left-0 w-[400px] bg-white rounded-3xl shadow-[0_24px_60px_rgba(0,0,0,0.15)] border border-neutral-200 p-6 z-50 animate-in fade-in duration-300 cursor-default text-left ${positionClasses} origin-top slide-in-from-top-4`,
  panelTitle: "text-sm font-bold text-neutral-800 mb-4 uppercase tracking-wider",
  list:        "flex flex-col gap-2",
  regionBtn: (isSelected: boolean, isHovered: boolean) =>
    `flex items-center gap-4 p-3 rounded-2xl transition text-left group ${isSelected ? "bg-emerald-50 scale-[0.98]" : isHovered ? "bg-neutral-100" : "hover:bg-neutral-100"}`,
  regionIcon: (isSelected: boolean, isHovered: boolean) =>
    `w-14 h-14 rounded-xl flex items-center justify-center text-2xl transition-colors shadow-sm ${isSelected ? "bg-emerald-200" : isHovered ? "bg-white" : "bg-neutral-100 group-hover:bg-white"}`,
  regionName: (isSelected: boolean) =>
    `text-lg font-bold transition-colors ${isSelected ? "text-emerald-900" : "text-neutral-900"}`,
  regionDesc:  "text-sm text-neutral-500",
  regionArrow: (isActive: boolean) =>
    `w-5 h-5 transition-transform ${isActive ? "text-emerald-600 translate-x-1" : "text-neutral-300 group-hover:text-emerald-400 group-hover:translate-x-1"}`,
  // Hover preview panel
  previewPanel: (isHero: boolean, positionClasses: string) =>
    `absolute left-[416px] ${isHero ? "right-0" : "w-[650px] right-auto"} bg-white rounded-3xl shadow-[0_24px_60px_rgba(0,0,0,0.15)] border border-neutral-200 overflow-hidden z-50 animate-in fade-in slide-in-from-left-2 duration-200 ease-out flex flex-row text-left ${positionClasses}`,
  previewImageCol:   "w-[45%] relative shrink-0 bg-neutral-100 flex flex-col",
  previewImageBg:    "absolute inset-0 bg-cover bg-center",
  previewImageGrad:  "absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-emerald-900/20 to-transparent",
  previewPriceBlock: "absolute bottom-5 left-5 right-5 text-white z-10",
  previewFromLabel:  "text-[10px] font-black uppercase tracking-widest mb-0.5 text-emerald-300",
  previewPrice:      "text-2xl font-black",
  previewPriceUnit:  "text-xs font-medium opacity-80",
  previewInfoCol:    "w-[55%] p-6 md:p-8 flex flex-col justify-center bg-white relative z-20",
  previewTitle:      "text-[26px] font-black text-emerald-950 mb-5 tracking-tight leading-none",
  previewHighlights: "flex flex-col gap-3",
  previewHighlightItem: "flex items-center gap-3 text-sm font-bold text-neutral-600",
  previewHighlightDot:  "w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0 shadow-sm border border-emerald-100",
  previewHighlightIcon: "w-3.5 h-3.5 text-emerald-600 font-bold",
} as const;

export const getDestinationPositionClass = (isHero: boolean, hasCalendarExpanded: boolean) =>
  isHero && hasCalendarExpanded ? "top-[100%] mt-6" : "top-[100%] mt-4";
