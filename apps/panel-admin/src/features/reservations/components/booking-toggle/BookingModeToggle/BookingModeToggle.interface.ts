import type { BookingMode } from "../../../domain/reservation";

export interface BookingModeToggleProps {
  mode: BookingMode;
  onChange: (mode: BookingMode) => void;
  isLoading?: boolean;
}
