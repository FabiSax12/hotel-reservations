/**
 * @file RoomAvailabilityCalendar.tsx — Room-specific availability calendar popover.
 *
 * A custom calendar that shows ONLY this room's available dates.
 * Available dates are highlighted in emerald; booked/unavailable days are
 * slightly faded with reduced opacity. The user can pick an available date
 * which triggers the search flow with that date as check-in.
 *
 * Renders as an absolutely-positioned popover above the CTA button area.
 * Uses vanilla calendar logic (no @hotel/ui dependency) for fine-grained
 * control over per-day availability styling.
 */

"use client";

import { useState } from "react";
import { ROOM_CARD_STYLES as S } from "../../../../theme/rooms.theme";
import { useRoomsContext } from "../../context/RoomsContext";
import { useI18n } from "@/locales";

const DAYS_OF_WEEK = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"];

interface RoomAvailabilityCalendarProps {
  /** Available ISO dates for this specific room. */
  availableDates: string[];
  /** Room's location — passed to onSearch when user picks a date. */
  location: string;
  /** Callback to close the calendar. */
  onClose: () => void;
}

/** Returns an array of ISO dates for all days in a given month. */
function getDaysInMonth(year: number, month: number): (string | null)[] {
  const firstDay = new Date(year, month, 1).getDay();
  // Adjust for Monday-first (0=Mon, 6=Sun)
  const offset = (firstDay + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (string | null)[] = Array(offset).fill(null);
  for (let d = 1; d <= daysInMonth; d++) {
    const iso = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    cells.push(iso);
  }
  // Pad to complete last row
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

const MONTH_NAMES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

export function RoomAvailabilityCalendar({
  availableDates,
  location,
  onClose,
}: RoomAvailabilityCalendarProps) {
  const { t } = useI18n();
  const { onSearch } = useRoomsContext();

  const availableSet = new Set(availableDates);
  const todayISO = new Date().toISOString().slice(0, 10);

  // Start showing the month of the first available date (or today)
  const firstAvail = availableDates[0] ?? todayISO;
  const initialDate = new Date(firstAvail + "T00:00:00");

  const [year, setYear] = useState(initialDate.getFullYear());
  const [month, setMonth] = useState(initialDate.getMonth());
  const [selected, setSelected] = useState<string | null>(null);

  const cells = getDaysInMonth(year, month);

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  };

  const handleDayClick = (iso: string) => {
    if (!availableSet.has(iso) || iso < todayISO) return;
    setSelected(iso);
    // Compute a default check-out 3 days later
    const checkOutDate = new Date(iso + "T00:00:00");
    checkOutDate.setDate(checkOutDate.getDate() + 3);
    const checkOut = checkOutDate.toISOString().slice(0, 10);
    // Fire the page-level search to transition to State B
    setTimeout(() => {
      onSearch({ destination: location, checkIn: iso, checkOut, adults: 2, children: 0, pets: 0 });
      onClose();
    }, 300);
  };

  return (
    <div className={S.availCalWrapper} role="dialog" aria-label={t.ROOMS.AVAIL_CALENDAR_TITLE}>
      {/* Header */}
      <div className={S.availCalHeader}>
        <span className={S.availCalTitle}>{t.ROOMS.AVAIL_CALENDAR_TITLE}</span>
        <button type="button" className={S.availCalClose} onClick={onClose} aria-label="Cerrar">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Month navigation */}
      <div className={S.availCalMonthNav}>
        <button type="button" className={S.availCalNavBtn} onClick={prevMonth} aria-label="Mes anterior">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className={S.availCalMonthLabel}>{MONTH_NAMES[month]} {year}</span>
        <button type="button" className={S.availCalNavBtn} onClick={nextMonth} aria-label="Mes siguiente">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Day headers */}
      <div className={S.availCalGrid}>
        {DAYS_OF_WEEK.map((d) => (
          <div key={d} className={S.availCalDayHeader}>{d}</div>
        ))}

        {/* Calendar days */}
        {cells.map((iso, i) => {
          if (!iso) return <div key={`empty-${i}`} />;
          const isPast = iso < todayISO;
          const isAvail = availableSet.has(iso);
          const isSel = iso === selected;
          return (
            <button
              key={iso}
              type="button"
              className={S.availCalDay(isAvail, isSel, isPast)}
              onClick={() => handleDayClick(iso)}
              disabled={!isAvail || isPast}
              aria-label={iso}
              aria-pressed={isSel}
            >
              {parseInt(iso.slice(8), 10)}
              {/* Availability dot indicator below available dates */}
              {isAvail && !isPast && !isSel && (
                <span className="block w-1 h-1 rounded-full bg-emerald-500 mx-auto absolute bottom-1" />
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className={S.availCalLegend}>
        <div className={S.availCalLegendItem}>
          <span className={S.availCalLegendDot("available")} />
          Disponible
        </div>
        <div className={S.availCalLegendItem}>
          <span className={S.availCalLegendDot("booked")} />
          Ocupado
        </div>
      </div>
    </div>
  );
}
