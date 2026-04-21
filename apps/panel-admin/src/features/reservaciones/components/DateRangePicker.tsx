"use client";

import { CalendarPopover } from "@hotel/ui";
import { useI18n } from "@/locales";
import { DATE_RANGE_PICKER_STYLES as S } from "@/themes/reservations-filters.theme";
import { formatPickerDate } from "../utils/format-reservation-date";
import { useDateRangePicker } from "../hooks/useDateRangePicker";

interface DateRangePickerProps {
  checkIn: string;
  checkOut: string;
  onChange: (checkIn: string, checkOut: string) => void;
}

export function DateRangePicker({ checkIn, checkOut, onChange }: DateRangePickerProps) {
  const { t } = useI18n();
  const { active, setActive, invalidState, containerRef, handlePickDate } =
    useDateRangePicker(checkIn, checkOut, onChange);

  const displayText =
    checkIn || checkOut
      ? `${formatPickerDate(checkIn)}${checkOut ? ` → ${formatPickerDate(checkOut)}` : ""}`
      : t.RESERVATIONS.FILTERS.DATE_RANGE_PICKER_LABEL;

  const isEmpty = displayText === t.RESERVATIONS.FILTERS.DATE_RANGE_PICKER_LABEL;

  return (
    <div ref={containerRef} className={S.wrapper}>
      <div className={S.container}>
        <div
          onClick={() => setActive("checkIn")}
          className={`${S.fieldBase} ${S.fieldFlex} ${active ? S.fieldActive : S.fieldInactive}`}
        >
          <div className={S.label} />
          <div className={isEmpty ? S.valuePlaceholder : S.valueFilled}>
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
