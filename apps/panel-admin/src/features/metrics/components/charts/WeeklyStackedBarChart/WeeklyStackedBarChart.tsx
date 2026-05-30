"use client";

import { CHART_LAYOUT } from "../../../constants/metrics.chart.constants";
import { WEEKLY_CHART_STYLES as STYLES } from "./WeeklyStackedBarChart.styles";
import {
  computeYAxisMax,
  computeChartDimensions,
  computeBarLayout,
  computeGridValues,
} from "../../../utils/metrics.chart.utils";
import { useWeeklyChart } from "../../../hooks/useWeeklyChart";
import { ChartLegend } from "../ChartLegend/ChartLegend";
import { ChartGrid } from "../ChartGrid/ChartGrid";
import { ChartBars } from "../ChartBars/ChartBars";
import { ChartTooltip } from "../ChartTooltip/ChartTooltip";
import type { WeeklyStackedBarChartProps } from "./WeeklyStackedBarChart.interface";

export function WeeklyStackedBarChart({ data, statusLabels, emptyText, ariaLabel }: WeeklyStackedBarChartProps) {
  const { tooltip, handleBarEnter, handleMouseMove, handleMouseLeave } = useWeeklyChart();

  if (data.length === 0) {
    return <div className={STYLES.empty}>{emptyText}</div>;
  }

  const yMax                                = computeYAxisMax(data);
  const { svgWidth, plotWidth, plotHeight } = computeChartDimensions(data.length);
  const { slotWidth, barWidth, barXOffset } = computeBarLayout(plotWidth, data.length);
  const gridValues                          = computeGridValues(yMax);
  const labelY                              = CHART_LAYOUT.marginTop + plotHeight + CHART_LAYOUT.labelOffset;

  return (
    <div className={STYLES.wrapper} data-chart-wrapper="">

      <ChartLegend statusLabels={statusLabels} />

      <div className={STYLES.scroll}>
        <svg
          viewBox={`0 0 ${svgWidth} ${CHART_LAYOUT.height}`}
          width={svgWidth}
          className={STYLES.svgContainer}
          role="img"
          aria-label={ariaLabel}
          onMouseLeave={handleMouseLeave}
        >
          <ChartGrid
            gridValues={gridValues}
            yMax={yMax}
            plotWidth={plotWidth}
            plotHeight={plotHeight}
          />
          <ChartBars
            data={data}
            yMax={yMax}
            plotHeight={plotHeight}
            slotWidth={slotWidth}
            barWidth={barWidth}
            barXOffset={barXOffset}
            labelY={labelY}
            onBarEnter={handleBarEnter}
            onMouseMove={handleMouseMove}
          />
        </svg>
      </div>

      <ChartTooltip tooltip={tooltip} statusLabels={statusLabels} />

    </div>
  );
}
