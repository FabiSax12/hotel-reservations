import { MS_PER_DAY } from "../constants/timing";
import type { GuestCount } from "../domain/reservation";

export function computeTotalGuests({ adults, children = 0, pets = 0 }: GuestCount): number {
  return adults + children + pets;
}

export function pluralizeCount(count: number, singular: string, plural: string): string {
  return `${count} ${count === 1 ? singular : plural}`;
}

export function getInitials(name: string): string {
  const parts = name.trim().split(" ");
  if (parts.length >= 2) return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  return parts[0][0].toUpperCase();
}

export function computeNights(checkIn: string, checkOut: string): number {
  return Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / MS_PER_DAY);
}
