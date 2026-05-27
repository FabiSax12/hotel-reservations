/**
 * @file RoomRangeCalendar.tsx — 2-month range calendar for room availability.
 *
 * Uses the @hotel/ui CalendarPopover to allow the user to select a check-in
 * and check-out date from the available room dates. When both dates are
 * selected, a brief delay lets the user see their selection before the
 * search fires and the UI transitions.
 */

"use client";

import { CalendarPopover } from "@hotel/ui";
import { ROOM_CARD_STYLES } from "../../../../theme/rooms.theme";
import { useI18n } from "@/locales";
import type { RoomRangeCalendarProps } from "../../domain/types";
import { useRoomCalendarState } from "../../hooks/useRoomCalendarState";

export function RoomRangeCalendar({
  availableDates,
  location,
  onClose,
}: RoomRangeCalendarProps) {
  const { t } = useI18n();
  const { checkIn, checkOut, invalidState, handlePickDate } = useRoomCalendarState(
    availableDates,
    location,
    onClose,
  );

  return (
    <div
      className={ROOM_CARD_STYLES.availCalWrapper}
      role="dialog"
      aria-label={t.ROOMS.AVAIL_CALENDAR_TITLE}
    >
      <CalendarPopover
        variant="compact"
        isInline
        className={ROOM_CARD_STYLES.availCalInner}
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
