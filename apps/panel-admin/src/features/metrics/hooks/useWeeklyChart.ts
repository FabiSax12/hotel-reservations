"use client";

import { useState } from "react";
import type { WeeklyDataPoint } from "../domain/metrics.types";

export interface TooltipState {
  point: WeeklyDataPoint;
  x: number;
  y: number;
}

function resolveWrapperRect(target: EventTarget & SVGGElement): DOMRect | null {
  return (target.closest("[data-chart-wrapper]") as HTMLElement)?.getBoundingClientRect() ?? null;
}

export function useWeeklyChart() {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  function handleBarEnter(e: React.MouseEvent<SVGGElement>, point: WeeklyDataPoint) {
    const rect = resolveWrapperRect(e.currentTarget);
    if (!rect) return;
    setTooltip({ point, x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  function handleMouseMove(e: React.MouseEvent<SVGGElement>) {
    const rect = resolveWrapperRect(e.currentTarget);
    if (!rect) return;
    setTooltip((prev) => prev ? { ...prev, x: e.clientX - rect.left, y: e.clientY - rect.top } : null);
  }

  function handleMouseLeave() {
    setTooltip(null);
  }

  return { tooltip, handleBarEnter, handleMouseMove, handleMouseLeave };
}
