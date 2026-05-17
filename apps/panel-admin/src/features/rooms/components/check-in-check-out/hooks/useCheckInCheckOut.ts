import { useEffect, useState } from "react";
import {
  CHECK_IN_TIME_SLOTS,
  CHECK_OUT_TIME_SLOTS,
} from "@/features/rooms/constants/check-in-check-out.constants";
import { mockScheduleService } from "@/features/rooms/services/mockScheduleService";
import { useI18n } from "@/locales";

export const useCheckInCheckOut = (roomId: string, onSuccess?: () => void) => {
  const { t } = useI18n();
  const texts = t.ROOMS;

  const [selectedCheckIn, setSelectedCheckIn] = useState<string[]>([]);
  const [selectedCheckOut, setSelectedCheckOut] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const schedules = await mockScheduleService.getRoomSchedules(roomId);

        const checkIns = schedules
          .filter((s) => s.schedule_type === "check_in")
          .map((s) => s.time_slot.substring(0, 5)); // ensure "HH:MM" format
        const checkOuts = schedules
          .filter((s) => s.schedule_type === "check_out")
          .map((s) => s.time_slot.substring(0, 5));

        setSelectedCheckIn(checkIns);
        setSelectedCheckOut(checkOuts);
      } catch (err) {
        console.error("Failed to load schedules", err);
        setError(texts.MESSAGES.ERROR_GENERIC || "Error loading schedules");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [roomId, texts.MESSAGES.ERROR_GENERIC]);

  const handleSubmit = async () => {
    if (selectedCheckIn.length === 0 && selectedCheckOut.length === 0) {
      setError(texts.SCHEDULES.EMPTY_SELECTION);
      return;
    }

    setIsSubmitting(true);
    setError(null);
    try {
      await mockScheduleService.saveRoomSchedules(roomId, {
        checkIn: selectedCheckIn,
        checkOut: selectedCheckOut,
      });
      onSuccess?.();
    } catch (err) {
      console.error("Failed to save schedules", err);
      setError(texts.MESSAGES.ERROR_GENERIC || "Error saving schedules");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    selectedCheckIn,
    setSelectedCheckIn,
    selectedCheckOut,
    setSelectedCheckOut,
    isLoading,
    isSubmitting,
    error,
    setError,
    texts,
    handleSubmit,
    checkInOptions: CHECK_IN_TIME_SLOTS,
    checkOutOptions: CHECK_OUT_TIME_SLOTS,
  };
};
