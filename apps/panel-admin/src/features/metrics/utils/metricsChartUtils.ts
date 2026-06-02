import { STATUS_COLORS, STATUS_ORDER } from "../constants/metricsConstants";
import { CHART_LAYOUT, MIN_SLOT_WIDTH, MIN_SVG_WIDTH, Y_AXIS_FALLBACK_MAX } from "../constants/metricsChartConstants";
import type { BarLayout, BarSegment, ChartDimensions, WeeklyDataPoint } from "../domain/metricsTypes";

export function computeYMax(maxTotal: number): number {
  if (maxTotal === 0) return Y_AXIS_FALLBACK_MAX;
  const magnitude = Math.pow(10, Math.floor(Math.log10(maxTotal)));
  return Math.ceil(maxTotal / magnitude) * magnitude;
}

export function computeYAxisMax(data: WeeklyDataPoint[]): number {
  return computeYMax(Math.max(...data.map((d) => d.total)));
}

export function computeChartDimensions(dataLength: number): ChartDimensions {
  const svgWidth = Math.max(
    MIN_SVG_WIDTH,
    CHART_LAYOUT.marginLeft + CHART_LAYOUT.marginRight + dataLength * MIN_SLOT_WIDTH,
  );
  return {
    svgWidth,
    plotWidth:  svgWidth - CHART_LAYOUT.marginLeft - CHART_LAYOUT.marginRight,
    plotHeight: CHART_LAYOUT.height - CHART_LAYOUT.marginTop - CHART_LAYOUT.marginBottom,
  };
}

export function computeBarLayout(plotWidth: number, dataLength: number): BarLayout {
  const slotWidth = plotWidth / dataLength;
  const barWidth  = slotWidth * (1 - CHART_LAYOUT.barGapRatio);
  return {
    slotWidth,
    barWidth,
    barXOffset: (slotWidth - barWidth) / 2,
  };
}

export function computeGridValues(yMax: number): number[] {
  return Array.from({ length: CHART_LAYOUT.gridLines + 1 }, (_, i) =>
    Math.round((yMax / CHART_LAYOUT.gridLines) * i),
  );
}

export function toPlotY(value: number, yMax: number, plotHeight: number): number {
  return plotHeight - (value / yMax) * plotHeight;
}

export function buildBarSegments(
  point: WeeklyDataPoint,
  yMax: number,
  plotHeight: number,
  barX: number,
  barWidth: number,
): BarSegment[] {
  const topStatus = STATUS_ORDER.slice().reverse().find((s) => point[s] > 0);
  let stackTop = plotHeight;

  return STATUS_ORDER.flatMap((status) => {
    const count = point[status];
    if (count === 0) return [];
    const segmentHeight = (count / yMax) * plotHeight;
    const segmentY      = CHART_LAYOUT.marginTop + stackTop - segmentHeight;
    stackTop -= segmentHeight;
    const path = status === topStatus
      ? buildRoundedRectPath(barX, segmentY, barWidth, segmentHeight, CHART_LAYOUT.barRadius)
      : `M${barX},${segmentY} h${barWidth} v${segmentHeight} H${barX}Z`;
    return [{ status, path, fill: STATUS_COLORS[status].hex }];
  });
}

export function buildRoundedRectPath(x: number, y: number, w: number, h: number, r: number): string {
  if (h <= 0) return "";
  const safeR = Math.min(r, h / 2, w / 2);
  return `M${x + safeR},${y} h${w - 2 * safeR} a${safeR},${safeR} 0 0 1 ${safeR},${safeR} v${h - safeR} H${x} v${-(h - safeR)} a${safeR},${safeR} 0 0 1 ${safeR},${-safeR}Z`;
}
