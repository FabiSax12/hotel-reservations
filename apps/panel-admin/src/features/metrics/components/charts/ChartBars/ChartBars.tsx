import { CHART_LAYOUT } from "../../../constants/metrics.chart.constants";
import { buildBarSegments } from "../../../utils/metrics.chart.utils";
import { CHART_BARS_STYLES as STYLES } from "./ChartBars.styles";
import type { ChartBarsProps } from "./ChartBars.interface";

export function ChartBars({ data, yMax, plotHeight, slotWidth, barWidth, barXOffset, labelY, onBarEnter, onMouseMove }: ChartBarsProps) {
  return (
    <>
      {data.map((point, i) => {
        const barX    = CHART_LAYOUT.marginLeft + i * slotWidth + barXOffset;
        const centerX = barX + barWidth / 2;
        const segments = buildBarSegments(point, yMax, plotHeight, barX, barWidth);

        return (
          <g
            key={`${point.weekLabel.range}-${point.weekLabel.month}`}
            style={STYLES.barGroup}
            onMouseEnter={(e) => onBarEnter(e, point)}
            onMouseMove={onMouseMove}
          >
            {segments.map((seg) => (
              <path key={seg.status} d={seg.path} fill={seg.fill} />
            ))}
            <text
              textAnchor="middle"
              fontSize={11}
              fontWeight="bold"
              style={STYLES.axisLabel}
            >
              <tspan x={centerX} y={labelY}>{point.weekLabel.range}</tspan>
              <tspan x={centerX} dy={CHART_LAYOUT.labelLineHeight}>{point.weekLabel.month}</tspan>
            </text>
          </g>
        );
      })}
    </>
  );
}
