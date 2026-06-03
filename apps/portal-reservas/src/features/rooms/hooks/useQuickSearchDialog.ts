"use client";

import { useState } from "react";
import { useRoomsContext } from "../context/RoomsContext";
import { ROOM_MOCK } from "../constants/rooms.constants";

const DEFAULT_ADULTS = 2;
const DEFAULT_CHILDREN = 0;
const MIN_ADULTS = 1;
const MIN_CHILDREN = 0;
const ISO_DATE_LENGTH = 10;

function isoDateOffset(offsetDays: number): string {
  const target = new Date(Date.now() + offsetDays * ROOM_MOCK.MS_PER_DAY);
  return target.toISOString().slice(0, ISO_DATE_LENGTH);
}

interface UseQuickSearchDialogOptions {
  location: string;
  onClose: () => void;
}

export function useQuickSearchDialog({ location, onClose }: UseQuickSearchDialogOptions) {
  const { onSearch } = useRoomsContext();
  const [adults, setAdults] = useState(DEFAULT_ADULTS);
  const [children, setChildren] = useState(DEFAULT_CHILDREN);

  const decrementAdults = () => setAdults((v) => Math.max(MIN_ADULTS, v - 1));
  const incrementAdults = () => setAdults((v) => v + 1);
  const decrementChildren = () => setChildren((v) => Math.max(MIN_CHILDREN, v - 1));
  const incrementChildren = () => setChildren((v) => v + 1);

  const handleConfirm = () => {
    const checkIn = isoDateOffset(ROOM_MOCK.QUICK_SEARCH_DAYS_OFFSET_IN);
    const checkOut = isoDateOffset(ROOM_MOCK.QUICK_SEARCH_DAYS_OFFSET_OUT);
    onSearch({ destination: location, checkIn, checkOut, adults, children, pets: 0 });
    onClose();
  };

  return {
    adults,
    children,
    minAdults: MIN_ADULTS,
    minChildren: MIN_CHILDREN,
    decrementAdults,
    incrementAdults,
    decrementChildren,
    incrementChildren,
    handleConfirm,
  };
}
