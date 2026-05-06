import type { GuestCount } from "../domain/reservation";

export function computeTotalGuests({ adults, children = 0, pets = 0 }: GuestCount): number {
  return adults + children + pets;
}

export function pluralizeCount(count: number, singular: string, plural: string): string {
  return `${count} ${count === 1 ? singular : plural}`;
}
