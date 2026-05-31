import type { CSSProperties } from "react";

export const CHART_BARS_STYLES = {
  barGroup:  { cursor: "pointer" } satisfies CSSProperties,
  axisLabel: { fill: "#9ca3af", letterSpacing: "0.1em", textTransform: "uppercase" } satisfies CSSProperties,
} as const;
