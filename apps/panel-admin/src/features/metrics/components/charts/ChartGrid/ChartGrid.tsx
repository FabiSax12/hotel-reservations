import { CHART_LAYOUT } from "../../../constants/metricsChartConstants";
import { toPlotY } from "../../../utils/metricsChartUtils";
import { CHART_GRID_STYLES as STYLES } from "./ChartGrid.styles";
import type { ChartGridProps } from "./ChartGrid.interface";

export function ChartGrid({ gridValues, yMax, plotWidth, plotHeight }: ChartGridProps) {
  return (
    <>
      {gridValues.map((val) => {
        const y = CHART_LAYOUT.marginTop + toPlotY(val, yMax, plotHeight);
        return (
          <g key={val}>
            <line
              x1={CHART_LAYOUT.marginLeft}
              y1={y}
              x2={CHART_LAYOUT.marginLeft + plotWidth}
              y2={y}
              style={STYLES.gridLine}
              strokeWidth={1}
            />
            <text
              x={CHART_LAYOUT.marginLeft - CHART_LAYOUT.yAxisLabelPadding}
              y={y + CHART_LAYOUT.gridLabelNudge}
              textAnchor="end"
              fontSize={11}
              fontWeight="bold"
              style={STYLES.axisLabel}
            >
              {val}
            </text>
          </g>
        );
      })}
    </>
  );
}
