"use client";

import { useEffect, useRef, useState } from "react";
import type { ActiveField } from "./date-range.types";
import { handlePickDate as computeNextActive } from "./date-range.logic";

export function useDateRangePicker(
  checkIn: string,
  checkOut: string,
  onChange: (ci: string, co: string) => void,
) {
  const [active, setActive] = useState<ActiveField>(null);
  const [invalidState, setInvalidState] = useState<{ dayStr: string; isFading: boolean } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const t1 = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t2 = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActive(null);
      }
    };
    if (active) window.addEventListener("mousedown", handleOutside);
    return () => window.removeEventListener("mousedown", handleOutside);
  }, [active]);

  const triggerInvalid = (ds: string) => {
    if (t1.current) clearTimeout(t1.current);
    if (t2.current) clearTimeout(t2.current);
    setInvalidState({ dayStr: ds, isFading: false });
    t1.current = setTimeout(
      () => setInvalidState(o => o?.dayStr === ds ? { ...o, isFading: true } : o),
      400,
    );
    t2.current = setTimeout(
      () => setInvalidState(o => o?.dayStr === ds ? null : o),
      700,
    );
  };

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
