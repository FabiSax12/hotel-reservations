export const WEEKLY_CHART_STYLES = {
  wrapper:      "w-full overflow-hidden",
  legend:       "flex items-center gap-4 flex-wrap mb-4",
  legendItem:   "flex items-center gap-1.5",
  legendDot:    "size-2.5 rounded-full shrink-0",
  legendLabel:  "text-xs text-gray-500",
  svgContainer: "w-full",
  empty:        "flex h-40 items-center justify-center text-sm text-gray-400",
} as const;

export const CHART_LAYOUT = {
  height:        220,
  marginTop:     16,
  marginRight:   8,
  marginBottom:  36,
  marginLeft:    44,
  barRadius:     3,
  gridLines:     4,
  barGapRatio:   0.35,
} as const;
