"use client";

import { useEffect, useRef, useState } from "react";
import { useRoomsContext } from "../context/RoomsContext";
import { useRoomAvailability } from "./useRoomAvailability";
import { ROOM_MOCK } from "../constants/rooms.constants";
import type { Room } from "../domain/types";

export function usePackageCardState(primaryRoom: Room) {
  const { hasDates, searchDates } = useRoomsContext();
  const [isReserving, setIsReserving] = useState(false);
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
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isCalendarOpen]);

  const handleReserve = () => {
    setIsReserving(true);
    setTimeout(() => { setIsReserving(false); }, ROOM_MOCK.RESERVE_DELAY_MS);
  };

  const toggleCalendar = () => setIsCalendarOpen((open) => !open);

  return {
    wrapperRef,
    calendarRef,
    hasDates,
    isAvailable,
    isLoading,
    isReserving,
    isUnavailable,
    isCalendarOpen,
    handleReserve,
    toggleCalendar,
    closeCalendar: () => setIsCalendarOpen(false),
  };
}
