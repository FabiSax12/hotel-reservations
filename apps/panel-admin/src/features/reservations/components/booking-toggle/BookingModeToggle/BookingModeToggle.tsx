"use client";

import { ToggleButton } from "@heroui/react";
import { useI18n } from "@/locales";
import { BOOKING_MODE } from "../../../constants/booking-mode";
import type { BookingModeToggleProps } from "./BookingModeToggle.interface";
import { BOOKING_MODE_TOGGLE_STYLES } from "./BookingModeToggle.styles";

export const BookingModeToggle = ({ mode, onChange, isLoading }: BookingModeToggleProps) => {
  const { t } = useI18n();
  const isAutomatic = mode === BOOKING_MODE.AUTOMATIC;

  const handleChange = (selected: boolean) => {
    onChange(selected ? BOOKING_MODE.AUTOMATIC : BOOKING_MODE.MANUAL);
  };

  return (
    <div className={BOOKING_MODE_TOGGLE_STYLES.row}>
      <span className={BOOKING_MODE_TOGGLE_STYLES.label}>
        {t.RESERVATIONS.BOOKING_MODE.LABEL}
      </span>
      <ToggleButton
        isSelected={isAutomatic}
        onChange={handleChange}
        isDisabled={isLoading}
        aria-label={t.RESERVATIONS.BOOKING_MODE.LABEL}
        className={`${BOOKING_MODE_TOGGLE_STYLES.pillBase} ${isAutomatic ? BOOKING_MODE_TOGGLE_STYLES.pillActive : BOOKING_MODE_TOGGLE_STYLES.pillInactive}`}
      >
        {isAutomatic
          ? t.RESERVATIONS.BOOKING_MODE.AUTOMATIC
          : t.RESERVATIONS.BOOKING_MODE.MANUAL}
      </ToggleButton>
    </div>
  );
};
