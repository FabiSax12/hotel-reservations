export const RESERVATION_ROOM_CARD_STYLES = {
  roomName:    "text-2xl font-semibold font-serif text-gray-900",
  roomLocation: "text-sm text-gray-500 mt-0.5",
  fieldRow:    "flex flex-col gap-0.5",
  fieldLabel:  "text-[10px] font-bold uppercase tracking-widest text-gray-400",
  fieldValue:  "text-sm text-gray-700",

  datesBlock:          "flex flex-col items-center gap-2",
  arrivesToday:        "text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-0.5",
  datesRow:            "flex items-center gap-3 w-full",
  dateCard:            "flex flex-col items-center flex-1",
  dateLabel:           "text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1",
  dateValue:           "text-base font-semibold font-serif text-gray-900",
  dateTime:            "text-xs text-gray-500 mt-0.5",
  nightsConnector:     "flex flex-col items-center gap-1 flex-shrink-0",
  nightsConnectorLine: "w-8 h-px bg-gray-300",
  nightsBadge:         "bg-[#f6f5ef] border border-[#e9e8e1] rounded-full px-2 py-0.5 text-[10px] font-medium text-gray-600 whitespace-nowrap",

  guestsLabel:   "text-[10px] font-bold uppercase tracking-widest text-gray-400",
  guestBreakdown: "flex flex-row flex-wrap gap-1.5 mt-1",
  guestChip:      "bg-[#f6f5ef] border border-[#e9e8e1] rounded-full px-2.5 py-0.5 text-xs text-gray-600 font-medium",
} as const;
