export function computeYMax(maxTotal: number): number {
  if (maxTotal === 0) return 10;
  const magnitude = Math.pow(10, Math.floor(Math.log10(maxTotal)));
  return Math.ceil(maxTotal / magnitude) * magnitude;
}

export function buildRoundedRectPath(x: number, y: number, w: number, h: number, r: number): string {
  if (h <= 0) return "";
  const safeR = Math.min(r, h / 2, w / 2);
  return `M${x + safeR},${y} h${w - 2 * safeR} a${safeR},${safeR} 0 0 1 ${safeR},${safeR} v${h - safeR} H${x} v${-(h - safeR)} a${safeR},${safeR} 0 0 1 ${safeR},${-safeR}Z`;
}
