"use client";

import { useEffect, useRef, useState } from "react";

export function useInvalidStateFade() {
  const [invalidState, setInvalidState] = useState<{ dayStr: string; isFading: boolean } | null>(null);
  const t1 = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t2 = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (t1.current) clearTimeout(t1.current);
      if (t2.current) clearTimeout(t2.current);
    };
  }, []);

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

  return { invalidState, triggerInvalid };
}
