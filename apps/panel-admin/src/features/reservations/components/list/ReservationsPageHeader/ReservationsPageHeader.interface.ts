import type { BookingMode, ReservationStatus } from "../../../domain/reservation";

export interface ReservationsPageHeaderProps {
  totalCount: number;
  statusCounts: Record<ReservationStatus, number>;
  bookingMode: BookingMode;
  onBookingModeChange: (mode: BookingMode) => void;
  isBookingModeLoading?: boolean;
}
