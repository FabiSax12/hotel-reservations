import type { BookingMode, Reservation } from "../../../domain/reservation";

export interface ReservationsViewProps {
  reservations: readonly Reservation[];
  rooms: readonly string[];
  initialBookingMode: BookingMode;
  initialPage?: number;
}
