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
import { getBlockedDatesBetween } from "../../domain/date-range.utils";

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
    }, 400);
    setTimeout(() => {
      setInvalidState((current) => (current?.animationKey === animationKey ? null : current));
    }, 700);
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

    if (checkIn && checkOut) {
      setCheckIn(dayStr);
      setCheckOut("");
      return;
    }

    if (!checkIn) {
      setCheckIn(dayStr);
      return;
    }

    if (dayStr === checkIn) {
      setCheckIn("");
      return;
    }

    const start = dayStr < checkIn ? dayStr : checkIn;
    const end = dayStr < checkIn ? checkIn : dayStr;

    const blockedDates = getBlockedDatesBetween(start, end, availableDateSet);
    if (blockedDates.length > 0) {
      dismissInvalidState(blockedDates);
      return;
    }

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
