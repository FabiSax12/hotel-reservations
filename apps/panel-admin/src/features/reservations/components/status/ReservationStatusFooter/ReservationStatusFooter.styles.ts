export const RESERVATION_STATUS_FOOTER_STYLES = {
  wrapper: "px-6 pb-6 flex flex-col",
  statusLine: "flex items-center gap-2 mb-1",
  statusLabel:
    "text-[11px] font-extrabold uppercase tracking-widest text-gray-400",
  actionsLine: "px-4 pb-2 flex justify-between items-start gap-4",
  leftActions: "flex items-center gap-2 flex-wrap flex-1 min-w-0",
  leftActionsWithField: "flex items-start gap-2 flex-1 min-w-0",
  rightActions: "flex gap-2 shrink-0 pt-1",
  revertButton:
    "bg-white text-rose-600 text-sm font-medium tracking-wide px-7 py-4 rounded-full border-2 border-rose-100 transition-all hover:bg-rose-50 hover:border-rose-200 active:scale-95",
  saveButton:
    "bg-emerald-900 text-white text-sm font-medium tracking-wide px-7 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:bg-emerald-600 hover:shadow-[0_15px_40px_-10px_rgba(16,185,129,0.4)] active:scale-95",
} as const;
