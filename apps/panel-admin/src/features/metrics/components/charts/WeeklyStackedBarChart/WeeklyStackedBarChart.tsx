"use client";

import { STATUS_COLORS } from "../../../constants/metrics.constants";
import type { ReservationStatus } from "../../../domain/metrics.types";
import { WEEKLY_CHART_STYLES as STYLES, CHART_LAYOUT as L } from "./WeeklyStackedBarChart.styles";
import type { WeeklyStackedBarChartProps } from "./WeeklyStackedBarChart.interface";

const STATUS_ORDER: ReservationStatus[] = ["pending", "approved", "cancelled", "completed"];

function computeYMax(maxTotal: number): number {
  if (maxTotal === 0) return 10;
  const magnitude = Math.pow(10, Math.floor(Math.log10(maxTotal)));
  return Math.ceil(maxTotal / magnitude) * magnitude;
}

function buildRoundedRectPath(x: number, y: number, w: number, h: number, r: number): string {
  if (h <= 0) return "";
  const safeR = Math.min(r, h / 2, w / 2);
  return `M${x + safeR},${y} h${w - 2 * safeR} a${safeR},${safeR} 0 0 1 ${safeR},${safeR} v${h - safeR} H${x} v${-(h - safeR)} a${safeR},${safeR} 0 0 1 ${safeR},${-safeR}Z`;
}

export function WeeklyStackedBarChart({ data }: WeeklyStackedBarChartProps) {
  if (data.length === 0) {
    return <div className={STYLES.empty}>Sin datos para el período seleccionado</div>;
  }

  const plotW = 600 - L.marginLeft - L.marginRight;
  const plotH = L.height - L.marginTop - L.marginBottom;

  const maxTotal = Math.max(...data.map((d) => d.total));
  const yMax = computeYMax(maxTotal);

  const totalBars = data.length;
  const slotW = plotW / totalBars;
  const barW = slotW * (1 - L.barGapRatio);
  const barOffset = (slotW - barW) / 2;

  const yScale = (v: number) => plotH - (v / yMax) * plotH;

  const gridValues = Array.from({ length: L.gridLines + 1 }, (_, i) =>
    Math.round((yMax / L.gridLines) * i),
  );

  return (
    <div className={STYLES.wrapper}>
      <div className={STYLES.legend}>
        {STATUS_ORDER.map((status) => (
          <span key={status} className={STYLES.legendItem}>
            <span className={`${STYLES.legendDot} ${STATUS_COLORS[status].tailwind}`} aria-hidden="true" />
            <span className={STYLES.legendLabel}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
          </span>
        ))}
      </div>

      <svg
        viewBox={`0 0 600 ${L.height}`}
        className={STYLES.svgContainer}
        role="img"
        aria-label="Distribución semanal de reservaciones"
      >
        {gridValues.map((val) => {
          const y = L.marginTop + yScale(val);
          return (
            <g key={val}>
              <line
                x1={L.marginLeft}
                y1={y}
                x2={L.marginLeft + plotW}
                y2={y}
                stroke="#e5e7eb"
                strokeWidth={1}
              />
              <text
                x={L.marginLeft - 6}
                y={y + 4}
                textAnchor="end"
                fontSize={10}
                fill="#9ca3af"
              >
                {val}
              </text>
            </g>
          );
        })}

        {data.map((point, i) => {
          const x0 = L.marginLeft + i * slotW + barOffset;
          let stackY = plotH;

          const segments = STATUS_ORDER.map((status) => {
            const count = point[status];
            if (count === 0) return null;
            const segH = (count / yMax) * plotH;
            const segY = L.marginTop + stackY - segH;
            stackY -= segH;
            const isTop = stackY === plotH - (point.total / yMax) * plotH;
            const path = isTop
              ? buildRoundedRectPath(x0, segY, barW, segH, L.barRadius)
              : `M${x0},${segY} h${barW} v${segH} H${x0}Z`;
            return { status, path, fill: STATUS_COLORS[status].hex };
          });

          const labelY = L.marginTop + plotH + 20;

          return (
            <g key={point.weekLabel}>
              {segments.map((seg) =>
                seg ? (
                  <path
                    key={seg.status}
                    d={seg.path}
                    fill={seg.fill}
                  />
                ) : null,
              )}
              <text
                x={x0 + barW / 2}
                y={labelY}
                textAnchor="middle"
                fontSize={10}
                fill="#9ca3af"
              >
                {point.weekLabel}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
