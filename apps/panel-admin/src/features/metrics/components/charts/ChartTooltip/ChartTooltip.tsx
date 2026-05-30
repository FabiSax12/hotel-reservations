import { STATUS_COLORS, STATUS_ORDER } from "../../../constants/metrics.constants";
import { TOOLTIP_LAYOUT } from "../../../constants/metrics.chart.constants";
import { CHART_TOOLTIP_STYLES as STYLES } from "./ChartTooltip.styles";
import type { ChartTooltipProps } from "./ChartTooltip.interface";

export function ChartTooltip({ tooltip, statusLabels }: ChartTooltipProps) {
  if (!tooltip) return null;

  return (
    <div
      className={STYLES.wrapper}
      style={{
        left:      tooltip.x + TOOLTIP_LAYOUT.offsetX,
        top:       tooltip.y - TOOLTIP_LAYOUT.offsetY,
        minWidth:  TOOLTIP_LAYOUT.minWidth,
        transform: tooltip.x > TOOLTIP_LAYOUT.flipThreshold ? "translateX(-110%)" : undefined,
      }}
    >
      <p className={STYLES.title}>
        {tooltip.point.weekLabel.range} {tooltip.point.weekLabel.month}
      </p>
      <div className="flex flex-col gap-1">
        {STATUS_ORDER.filter((s) => tooltip.point[s] > 0).map((status) => (
          <div key={status} className={STYLES.row}>
            <span className={STYLES.dot} style={{ backgroundColor: STATUS_COLORS[status].hex }} />
            <span className={STYLES.label}>{statusLabels[status]}</span>
            <span className={STYLES.value}>{tooltip.point[status]}</span>
          </div>
        ))}
      </div>
      <div className={STYLES.divider} />
      <div className={STYLES.total}>
        <span>Total</span>
        <span>{tooltip.point.total}</span>
      </div>
    </div>
  );
}
