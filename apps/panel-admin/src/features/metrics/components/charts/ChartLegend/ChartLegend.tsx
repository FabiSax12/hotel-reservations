import { STATUS_COLORS, STATUS_ORDER } from "../../../constants/metricsConstants";
import { CHART_LEGEND_STYLES as STYLES } from "./ChartLegend.styles";
import type { ChartLegendProps } from "./ChartLegend.interface";

export function ChartLegend({ statusLabels }: ChartLegendProps) {
  return (
    <div className={STYLES.wrapper}>
      {STATUS_ORDER.map((status) => (
        <span key={status} className={STYLES.item}>
          <span className={`${STYLES.dot} ${STATUS_COLORS[status].tailwind}`} aria-hidden="true" />
          <span className={STYLES.label}>{statusLabels[status]}</span>
        </span>
      ))}
    </div>
  );
}
