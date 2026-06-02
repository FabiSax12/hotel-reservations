"use client";

import { useEffect, useRef, useState } from "react";
import { DOM_EVENTS } from "@/constants/dom-events.constants";
import { useRoomsContext } from "../context/RoomsContext";
import type { Room } from "../domain/types";
import { useRoomAvailability } from "./useRoomAvailability";

export function usePackageCardState(primaryRoom: Room) {
  const { hasDates, searchDates } = useRoomsContext();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement | null>(null);

  const { isAvailable, isLoading } = useRoomAvailability(
    primaryRoom.id,
    searchDates?.checkIn,
    searchDates?.checkOut,
    primaryRoom.availableDates,
  );

  const isUnavailable = hasDates && !isLoading && !isAvailable;

  useEffect(() => {
    if (!isCalendarOpen) return;
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (wrapperRef.current?.contains(target) || calendarRef.current?.contains(target)) return;
      setIsCalendarOpen(false);
    };
    document.addEventListener(DOM_EVENTS.MOUSEDOWN, handleOutsideClick);
    return () => document.removeEventListener(DOM_EVENTS.MOUSEDOWN, handleOutsideClick);
  }, [isCalendarOpen]);

  const toggleCalendar = () => setIsCalendarOpen((open) => !open);

  return {
    wrapperRef,
    calendarRef,
    hasDates,
    isAvailable,
    isLoading,
    isUnavailable,
    isCalendarOpen,
    toggleCalendar,
    closeCalendar: () => setIsCalendarOpen(false),
  };
}
