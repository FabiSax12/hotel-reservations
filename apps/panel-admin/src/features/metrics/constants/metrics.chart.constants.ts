export const CHART_LAYOUT = {
  height:          244,
  marginTop:       16,
  marginRight:     8,
  marginBottom:    52,
  marginLeft:      44,
  barRadius:       3,
  gridLines:       4,
  barGapRatio:     0.35,
  labelOffset:     20,
  gridLabelNudge:    4,
  labelLineHeight:   14,
  yAxisLabelPadding: 6,
} as const;

export const TOOLTIP_LAYOUT = {
  offsetX:       14,
  offsetY:       8,
  minWidth:      160,
  flipThreshold: 520,
} as const;
