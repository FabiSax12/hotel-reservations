/**
 * @file RoomRangeCalendar.tsx — 2-month range calendar for room availability.
 *
 * Uses the @hotel/ui CalendarPopover to allow the user to select a check-in
 * and check-out date from the available room dates. When both dates are
 * selected, a brief delay lets the user see their selection before the
 * search fires and the UI transitions.
 *
 * Rendered via a React portal at document.body with `position: fixed` so it
 * escapes any ancestor `overflow-hidden` clipping (e.g. the card body).
 * Position is recomputed on scroll and resize to track the anchor element.
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { CalendarPopover } from "@hotel/ui";
import { ROOM_CARD_STYLES } from "../../../../theme/rooms.theme";
import { useI18n } from "@/locales";
import type { RoomRangeCalendarProps } from "../../domain/types";
import { useRoomCalendarState } from "../../hooks/useRoomCalendarState";

export function RoomRangeCalendar({
  availableDates,
  location,
  roomId,
  onClose,
  anchorRef,
  onPortalRef,
}: RoomRangeCalendarProps) {
  const { t } = useI18n();
  const { checkIn, checkOut, invalidState, handlePickDate } = useRoomCalendarState(
    availableDates,
    location,
    roomId,
    onClose,
  );

  const [pos, setPos] = useState<{ bottom: number; right: number } | null>(null);

  const computePos = useCallback(() => {
    if (!anchorRef.current) return;
    const rect = anchorRef.current.getBoundingClientRect();
    setPos({
      bottom: window.innerHeight - rect.top + 12,
      right: window.innerWidth - rect.right,
    });
  }, [anchorRef]);

  useEffect(() => {
    computePos();
    window.addEventListener("scroll", computePos, true);
    window.addEventListener("resize", computePos);
    return () => {
      window.removeEventListener("scroll", computePos, true);
      window.removeEventListener("resize", computePos);
    };
  }, [computePos]);

  if (!pos) return null;

  return createPortal(
    <div
      ref={onPortalRef}
      className={ROOM_CARD_STYLES.availCalWrapperFixed}
      style={{ bottom: pos.bottom, right: pos.right }}
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
    </div>,
    document.body,
  );
}
