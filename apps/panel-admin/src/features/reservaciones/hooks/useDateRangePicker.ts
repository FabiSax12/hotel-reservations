"use client";

import { useEffect, useRef, useState } from "react";
import type { ActiveField } from "../domain/date-range.types";
import { handlePickDate as computeNextActive } from "../domain/date-range.logic";
import { useInvalidStateFade } from "./useInvalidStateFade";

export function useDateRangePicker(
  checkIn: string,
  checkOut: string,
  onChange: (ci: string, co: string) => void,
) {
  const [active, setActive] = useState<ActiveField>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { invalidState, triggerInvalid } = useInvalidStateFade();

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActive(null);
      }
    };
    if (active) window.addEventListener("mousedown", handleOutside);
    return () => window.removeEventListener("mousedown", handleOutside);
  }, [active]);

  const handlePickDate = (dayStr: string) => {
    const nextActive = computeNextActive(
      dayStr,
      { checkIn, checkOut, active },
      onChange,
      triggerInvalid,
    );
    setActive(nextActive);
  };

  return { active, setActive, invalidState, containerRef, handlePickDate };
}
