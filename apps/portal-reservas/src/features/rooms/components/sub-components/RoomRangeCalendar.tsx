/**
 * @file RoomRangeCalendar.tsx — 2-month range calendar for room availability.
 *
 * Uses the @hotel/ui CalendarPopover to allow the user to select a check-in
 * and check-out date from the available room dates, and then click "Confirm"
 * to trigger the search.
 */

"use client";

import { useRef, useState } from "react";
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
  const availableDateSet = new Set(availableDates);
  const lastSubmittedRangeRef = useRef<string>("");

  const dismissInvalidState = (dayStr: string) => {
    setInvalidState({ dayStr, isFading: false });
    setTimeout(() => {
      setInvalidState({ dayStr, isFading: true });
    }, 170);
    setTimeout(() => {
      setInvalidState((current) => (current?.dayStr === dayStr ? null : current));
    }, 500);
  };

  const getDatesBetween = (start: string, end: string): string[] => {
    const result: string[] = [];
    const cursor = new Date(`${start}T00:00:00`);
    const target = new Date(`${end}T00:00:00`);
    while (cursor < target) {
      result.push(cursor.toISOString().slice(0, 10));
      cursor.setDate(cursor.getDate() + 1);
    }
    return result;
  };

  const getFirstBlockedDate = (start: string, end: string): string | null => {
    const stayNights = getDatesBetween(start, end);
    const blockedDate = stayNights.find((isoDay) => !availableDateSet.has(isoDay));
    return blockedDate ?? null;
  };

  const submitRange = (start: string, end: string) => {
    const rangeKey = `${start}__${end}`;
    if (lastSubmittedRangeRef.current === rangeKey) return;
    lastSubmittedRangeRef.current = rangeKey;
    onSearch({
      destination: location,
      checkIn: start,
      checkOut: end,
      adults: 2,
      children: 0,
      pets: 0,
    });
    onClose();
  };

  const handlePickDate = (dayStr: string) => {
    if (invalidState) setInvalidState(null);

    if (dayStr === checkIn && !checkOut) {
      setCheckIn("");
      return;
    }

    if (!checkIn) {
      setCheckIn(dayStr);
      setCheckOut("");
      return;
    }

    if (!checkOut) {
      if (dayStr < checkIn) {
        setCheckIn(dayStr);
      } else {
        const firstBlockedDate = getFirstBlockedDate(checkIn, dayStr);
        if (firstBlockedDate) {
          dismissInvalidState(firstBlockedDate);
          return;
        }
        setCheckOut(dayStr);
        submitRange(checkIn, dayStr);
      }
      return;
    }

    if (dayStr === checkOut) {
      setCheckOut("");
      return;
    }

    if (dayStr <= checkIn) {
      setCheckIn(dayStr);
      setCheckOut("");
      return;
    }

    const firstBlockedDate = getFirstBlockedDate(checkIn, dayStr);
    if (firstBlockedDate) {
      dismissInvalidState(firstBlockedDate);
      return;
    }

    setCheckOut(dayStr);
    submitRange(checkIn, dayStr);
  };

  return (
    <div
      className={S.availCalWrapper}
      role="dialog"
      aria-label={t.ROOMS.AVAIL_CALENDAR_TITLE}
    >
      <CalendarPopover
        variant="compact"
        isInline
        className="w-full"
        checkIn={checkIn}
        checkOut={checkOut}
        invalidState={invalidState}
        onPickDate={handlePickDate}
        availableDates={availableDates}
      />
    </div>
  );
}
