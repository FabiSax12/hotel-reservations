/**
 * @file RoomRangeCalendar.tsx — 2-month range calendar for room availability.
 *
 * Uses the @hotel/ui CalendarPopover to allow the user to select a check-in
 * and check-out date from the available room dates, and then click "Confirm"
 * to trigger the search.
 */

"use client";

import { useState } from "react";
import { CalendarPopover } from "@hotel/ui";
import { useRoomsContext } from "../../context/RoomsContext";
import { ROOM_CARD_STYLES as S } from "../../../../theme/rooms.theme";
import { useI18n } from "@/locales";

interface RoomRangeCalendarProps {
  availableDates: string[];
  location: string;
  onClose: () => void;
}

export function RoomRangeCalendar({
  availableDates,
  location,
  onClose,
}: RoomRangeCalendarProps) {
  const { t } = useI18n();
  const { onSearch } = useRoomsContext();

  const [checkIn, setCheckIn] = useState<string>("");
  const [checkOut, setCheckOut] = useState<string>("");
  const [invalidState, setInvalidState] = useState<{ dayStr: string; isFading: boolean } | null>(null);

  // Re-implementing simplified date selection logic locally
  const handlePickDate = (dayStr: string) => {
    // If no check-in, set it
    if (!checkIn) {
      setCheckIn(dayStr);
      setCheckOut("");
      return;
    }

    // If check-in is set but no check-out
    if (checkIn && !checkOut) {
      if (dayStr < checkIn) {
        // Picked a date before check-in -> becomes new check-in
        setCheckIn(dayStr);
      } else if (dayStr === checkIn) {
        // Clicked check-in again -> reset
        setCheckIn("");
      } else {
        // Picked a date after check-in -> becomes check-out
        setCheckOut(dayStr);
      }
      return;
    }

    // If both are set, picking a new date resets to check-in
    if (checkIn && checkOut) {
      setCheckIn(dayStr);
      setCheckOut("");
    }
  };

  const handleConfirm = () => {
    if (checkIn && checkOut) {
      onSearch({
        destination: location,
        checkIn,
        checkOut,
        adults: 2,
        children: 0,
        pets: 0,
      });
      onClose();
    }
  };

  // We reuse availCalWrapper from rooms.theme.ts, but because CalendarPopover
  // is quite wide (2 months), we override its width to be auto or wider.
  return (
    <div 
      className={`${S.availCalWrapper} w-[700px] max-w-[95vw] -right-2 sm:-right-4`} 
      role="dialog" 
      aria-label={t.ROOMS.AVAIL_CALENDAR_TITLE}
    >
      <div className={S.availCalHeader}>
        <span className={S.availCalTitle}>{t.ROOMS.AVAIL_CALENDAR_TITLE}</span>
        <button type="button" className={S.availCalClose} onClick={onClose} aria-label="Cerrar">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <CalendarPopover
        checkIn={checkIn}
        checkOut={checkOut}
        invalidState={invalidState}
        onPickDate={handlePickDate}
        availableDates={availableDates}
        bottomContent={
          <div className="flex items-center justify-between">
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
            <button
              type="button"
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                checkIn && checkOut
                  ? "bg-emerald-950 text-white hover:bg-emerald-900 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                  : "bg-neutral-100 text-neutral-400 cursor-not-allowed"
              }`}
              disabled={!checkIn || !checkOut}
              onClick={handleConfirm}
            >
              Confirmar fechas
            </button>
          </div>
        }
      />
    </div>
  );
}
