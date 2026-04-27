export type ReservationStatus = "pending" | "approved" | "cancelled" | "completed";

export interface Guest {
  name: string;
  email: string;
  initials: string;
}

export interface Room {
  name: string;
  location: string;
}

export interface Reservation {
  id: string;
  code: string;
  guest: Guest;
  room: Room;
  checkIn: string;
  checkOut: string;
  nights: number;
  totalUSD: number;
  status: ReservationStatus;
}
