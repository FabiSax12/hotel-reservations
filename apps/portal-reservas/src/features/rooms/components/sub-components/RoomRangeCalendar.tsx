/**
 * @file RoomRangeCalendar.tsx — 2-month range calendar for room availability.
 *
 * Uses the @hotel/ui CalendarPopover to allow the user to select a check-in
 * and check-out date from the available room dates. When both dates are
 * selected, a brief delay lets the user see their selection before the
 * search fires and the UI transitions.
 */

"use client";

import { useRef, useState, useCallback } from "react";
import { CalendarPopover } from "@hotel/ui";
import { useRoomsContext } from "../../context/RoomsContext";
import { ROOM_CARD_STYLES as S } from "../../../../theme/rooms.theme";
import { ROOM_MOCK } from "../../constants/rooms.constants";
import { useI18n } from "@/locales";
import { getBlockedDatesBetween } from "../../domain/date-range.utils";

interface RoomRangeCalendarProps {
  availableDates: string[];
  location: string;
  onClose: () => void;
}

const SUBMIT_DELAY_MS = ROOM_MOCK.CALENDAR_SUBMIT_DELAY_MS;

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
  const submitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismissInvalidState = (dayStrs: string[]) => {
    // Use a unique animation key so that overlapping calls don't cancel each other
    // mid-animation (e.g. user clicks rapidly on blocked dates).
    const animationKey = Date.now();
    setInvalidState({ dayStrs, isFading: false, animationKey });
    // Phase 1: hold the red shake animation for 400 ms so the user notices
    setTimeout(() => {
      setInvalidState({ dayStrs, isFading: true, animationKey });
    }, 400);
    // Phase 2: fade out and clear state after 700 ms total
    setTimeout(() => {
      setInvalidState((current) => (current?.animationKey === animationKey ? null : current));
    }, 700);
  };

  const submitRange = useCallback((start: string, end: string) => {
    const rangeKey = `${start}__${end}`;
    // Guard against double-submits caused by React StrictMode or rapid clicks
    if (lastSubmittedRangeRef.current === rangeKey) return;
    lastSubmittedRangeRef.current = rangeKey;

    // Brief delay so the user sees their selection before the UI transitions.
    // Without this the card collapses instantly and feels jarring.
    submitTimerRef.current = setTimeout(() => {
      onSearch({
        destination: location,
        checkIn: start,
        checkOut: end,
        adults: 2,
        children: 0,
        pets: 0,
      });
      onClose();
    }, SUBMIT_DELAY_MS);
  }, [onSearch, location, onClose]);

  const handlePickDate = (dayStr: string) => {
    // Cancel any pending submission if the user clicks again before the
    // SUBMIT_DELAY_MS timeout fires (e.g. they changed their mind).
    if (submitTimerRef.current) {
      clearTimeout(submitTimerRef.current);
      submitTimerRef.current = null;
      lastSubmittedRangeRef.current = "";
    }

    if (invalidState) setInvalidState(null);

    // If both dates were already selected, treat this click as a fresh
    // check-in (restart the range selection flow).
    if (checkIn && checkOut) {
      setCheckIn(dayStr);
      setCheckOut("");
      return;
    }

    // First click of a new range → set check-in only
    if (!checkIn) {
      setCheckIn(dayStr);
      return;
    }

    // Clicking the existing check-in date again clears it (deselect)
    if (dayStr === checkIn) {
      setCheckIn("");
      return;
    }

    // Determine chronological order regardless of which date was clicked first
    const start = dayStr < checkIn ? dayStr : checkIn;
    const end = dayStr < checkIn ? checkIn : dayStr;

    // Validate that every night in the selected range is actually available
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
