/**
 * @file useRoomCalendarState.ts — Hook for room range calendar state management.
 *
 * Manages the date selection, validation, and submission logic for the
 * RoomRangeCalendar component. Extracts complex logic from the component
 * to keep it under 120 lines.
 */

"use client";

import { useCallback, useRef, useState } from "react";
import { ROOM_MOCK } from "../constants/rooms.constants";
import { useRoomsContext } from "../context/RoomsContext";
import { getBlockedDatesBetween } from "../domain/date-range.utils";

const SUBMIT_DELAY_MS = ROOM_MOCK.CALENDAR_SUBMIT_DELAY_MS;

export function useRoomCalendarState(
  availableDates: string[],
  location: string,
  roomId: string,
  onClose: () => void,
) {
  const { onSearch } = useRoomsContext();

  const [checkIn, setCheckIn] = useState<string>("");
  const [checkOut, setCheckOut] = useState<string>("");
  const [invalidState, setInvalidState] = useState<{
    dayStrs: string[];
    isFading: boolean;
    animationKey: number;
  } | null>(null);

  const availableDateSet = new Set(availableDates);
  const lastSubmittedRangeRef = useRef<string>("");
  const submitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const submitRange = useCallback(
    (start: string, end: string) => {
      const rangeKey = `${start}__${end}`;
      if (lastSubmittedRangeRef.current === rangeKey) return;
      lastSubmittedRangeRef.current = rangeKey;

      submitTimerRef.current = setTimeout(() => {
        onSearch({
          destination: location,
          checkIn: start,
          checkOut: end,
          adults: 2,
          children: 0,
          pets: 0,
          prioritizedRoomId: roomId,
        });
        onClose();
      }, SUBMIT_DELAY_MS);
    },
    [onSearch, location, roomId, onClose],
  );

  const handlePickDate = (dayStr: string) => {
    if (submitTimerRef.current) {
      clearTimeout(submitTimerRef.current);
      submitTimerRef.current = null;
      lastSubmittedRangeRef.current = "";
    }

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

  return {
    checkIn,
    checkOut,
    invalidState,
    handlePickDate,
  };
}
