"use client";

import { useState, useTransition } from "react";
import { updateBookingMode } from "../services/bookingModeService";
import type { BookingMode } from "../domain/reservation";

export function useBookingMode(initialMode: BookingMode) {
  const [mode, setMode] = useState<BookingMode>(initialMode);
  const [isPending, startTransition] = useTransition();

  const handleModeChange = (newMode: BookingMode) => {
    const previousMode = mode;
    setMode(newMode);

    startTransition(async () => {
      try {
        await updateBookingMode(newMode);
      } catch {
        setMode(previousMode);
      }
    });
  };

  return { mode, handleModeChange, isPending };
}
