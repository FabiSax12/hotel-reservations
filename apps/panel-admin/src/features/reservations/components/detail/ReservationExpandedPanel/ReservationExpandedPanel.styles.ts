export const RESERVATION_EXPANDED_PANEL_STYLES = {
  wrapperBase:    "bg-[#e8e6db] border-b border-[#d8d6cb]",
  wrapperEnter:   "animate-expand-down",
  wrapperExit:    "animate-collapse-up",
  body:         "grid grid-cols-1 md:grid-cols-3 gap-4 p-6",
  footer:       "px-6 pb-6 flex justify-end",
  cancelButton: "rounded-full bg-white text-gray-700 border-gray-200 tracking-wide hover:bg-gray-100",
} as const;
