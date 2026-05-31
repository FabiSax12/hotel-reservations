import type { CSSProperties } from "react";

export const CHART_GRID_STYLES = {
  gridLine:  { stroke: "var(--border)" } satisfies CSSProperties,
  axisLabel: { fill: "#9ca3af", letterSpacing: "0.1em", textTransform: "uppercase" } satisfies CSSProperties,
} as const;
