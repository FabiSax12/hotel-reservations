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
  const [invalidState, setInvalidState] = useState<{ dayStrs: string[]; isFading: boolean; animationKey: number } | null>(null);
  const availableDateSet = new Set(availableDates);
  const lastSubmittedRangeRef = useRef<string>("");

  const dismissInvalidState = (dayStrs: string[]) => {
    const animationKey = Date.now();
    setInvalidState({ dayStrs, isFading: false, animationKey });
    setTimeout(() => {
      setInvalidState({ dayStrs, isFading: true, animationKey });
    }, 400); // Wait longer before fading out
    setTimeout(() => {
      setInvalidState((current) => (current?.animationKey === animationKey ? null : current));
    }, 700);
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

  const getBlockedDatesBetween = (start: string, end: string): string[] => {
    const stayNights = getDatesBetween(start, end);
    return stayNights.filter((isoDay) => !availableDateSet.has(isoDay));
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

    // If both dates are selected, clicking starts a fresh selection
    if (checkIn && checkOut) {
      setCheckIn(dayStr);
      setCheckOut("");
      return;
    }

    // First click
    if (!checkIn) {
      setCheckIn(dayStr);
      return;
    }

    // Second click on the same date: unselect
    if (dayStr === checkIn) {
      setCheckIn("");
      return;
    }

    // Second click on a different date: determine chronological order
    const start = dayStr < checkIn ? dayStr : checkIn;
    const end = dayStr < checkIn ? checkIn : dayStr;

    // Check for blocked dates in the resulting range
    const blockedDates = getBlockedDatesBetween(start, end);
    if (blockedDates.length > 0) {
      dismissInvalidState(blockedDates);
      return;
    }

    // Valid range: update state and submit
    setCheckIn(start);
    setCheckOut(end);
    submitRange(start, end);
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
        className={S.availCalInner}
        checkIn={checkIn}
        checkOut={checkOut}
        hideTooltips={true}
        invalidState={invalidState}
        onPickDate={handlePickDate}
        availableDates={availableDates}
      />
    </div>
  );
}
