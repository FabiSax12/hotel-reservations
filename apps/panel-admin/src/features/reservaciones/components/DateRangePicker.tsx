"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarPopover } from "@hotel/ui";
import { useI18n } from "@/locales";
import { DATE_RANGE_PICKER as S } from "../constants/daterangepicker-styles";

interface DateRangePickerProps {
  checkIn: string;
  checkOut: string;
  labelFrom: string;
  labelTo: string;
  placeholder: string;
  onChange: (checkIn: string, checkOut: string) => void;
}

type ActiveField = "checkIn" | "checkOut" | null;

function formatDate(isoStr: string): string {
  if (!isoStr) return "";
  const [y, m, d] = isoStr.split("-").map(Number);
  return new Intl.DateTimeFormat("es-CR", { day: "numeric", month: "short" })
    .format(new Date(y, m - 1, d))
    .replace(".", "");
}

const parse = (s: string) => (s ? new Date(s + "T00:00:00").getTime() : 0);

export function DateRangePicker({
  checkIn,
  checkOut,
  labelFrom,
  labelTo,
  placeholder,
  onChange,
}: DateRangePickerProps) {
  const { t } = useI18n();
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

  const handlePickDate = (dayStr: string) => {
    let field = active;
    if (field !== "checkIn" && field !== "checkOut") {
      field = !checkIn ? "checkIn" : "checkOut";
      setActive(field);
    }

    if (dayStr === checkIn) { onChange("", checkOut); setActive("checkIn"); return; }
    if (dayStr === checkOut) { onChange(checkIn, ""); setActive(!checkIn ? "checkIn" : "checkOut"); return; }

    const clicked = parse(dayStr);
    const inVal = parse(checkIn);
    const outVal = parse(checkOut);

    if (checkIn && checkOut) {
      if (clicked < inVal) onChange(dayStr, checkOut);
      else if (clicked > outVal) onChange(checkIn, dayStr);
      else {
        const dIn = clicked - inVal;
        const dOut = outVal - clicked;
        if (dIn <= dOut) onChange(dayStr, checkOut); else onChange(checkIn, dayStr);
      }
      return;
    }

    const triggerInvalid = (ds: string) => {
      if (t1.current) clearTimeout(t1.current);
      if (t2.current) clearTimeout(t2.current);
      setInvalidState({ dayStr: ds, isFading: false });
      t1.current = setTimeout(() => setInvalidState(o => o?.dayStr === ds ? { ...o, isFading: true } : o), 400);
      t2.current = setTimeout(() => setInvalidState(o => o?.dayStr === ds ? null : o), 700);
    };

    if (field === "checkIn" && checkOut && clicked > outVal) { triggerInvalid(dayStr); return; }
    if (field === "checkOut" && checkIn && clicked < inVal) { triggerInvalid(dayStr); return; }

    if (field === "checkIn") { onChange(dayStr, checkOut); setActive("checkOut"); }
    else { onChange(checkIn, dayStr); setActive(!checkIn ? "checkIn" : "checkOut"); }
  };

  const displayText = checkIn || checkOut 
    ? `${formatDate(checkIn)}${checkOut ? ` → ${formatDate(checkOut)}` : ""}`
    : t.RESERVATIONS.FILTERS.DATE_RANGE_PICKER_LABEL;

  return (
    <div ref={containerRef} className={S.WRAPPER}>
      <div className={S.CONTAINER}>
        <div
          onClick={() => setActive("checkIn")}
          className={`${S.FIELD_BASE} ${S.FIELD_FLEX} ${active ? S.FIELD_ACTIVE : S.FIELD_INACTIVE}`}
        >
          <div className={S.LABEL}>
            {displayText === t.RESERVATIONS.FILTERS.DATE_RANGE_PICKER_LABEL ? "" : t.RESERVATIONS.FILTERS.DATE_RANGE_PICKER_LABEL_RANGE}
          </div>
          <div className={displayText === t.RESERVATIONS.FILTERS.DATE_RANGE_PICKER_LABEL ? S.VALUE_EMPTY : S.VALUE_FILLED}>
            {displayText}
          </div>
        </div>
      </div>

      {(active === "checkIn" || active === "checkOut") && (
        <CalendarPopover
          activeMode={active}
          checkIn={checkIn}
          checkOut={checkOut}
          invalidState={invalidState}
          onPickDate={handlePickDate}
          variant="compact"
          monthCount={1}
          allowPast={true}
        />
      )}
    </div>
  );
}
