import type { GuestCount, Room } from "../../../domain/reservation";

export interface ReservationRoomCardProps {
  room: Room;
  guests: GuestCount;
  checkIn: string;
  checkOut: string;
  nights: number;
}
