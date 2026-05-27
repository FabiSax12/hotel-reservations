import { PERCENTAGE_SCALE } from "../constants/metrics.constants";
import { getDaysInMonth } from "../utils/metrics.date.utils";
import type { MetricsDateRange, MetricsReservation, MetricsRoom, RoomOccupancy } from "./metrics.types";

// NOTE: Uses full calendar months overlapping the range as the denominator — not just days within
// the range. E.g. April 5–May 14 → denominator is 30 (April) + 31 (May) = 61.
function computeTotalMonthNights(start: string, end: string): number {
  const s = new Date(start);
  const e = new Date(end);
  let total = 0;
  const cursor = new Date(s.getFullYear(), s.getMonth(), 1);
  while (cursor <= e) {
    total += getDaysInMonth(cursor.getFullYear(), cursor.getMonth());
    cursor.setMonth(cursor.getMonth() + 1);
  }
  return total;
}

export function computeRoomOccupancies(
  activeReservations: MetricsReservation[],
  rooms: MetricsRoom[],
  dateRange: MetricsDateRange,
): RoomOccupancy[] {
  const totalMonthNights = computeTotalMonthNights(dateRange.start, dateRange.end);

  return rooms.map((room) => {
    const roomReservations = activeReservations.filter((r) => r.roomId === room.id);
    const nights = roomReservations.reduce((sum, r) => sum + r.nights, 0);
    const revenue = roomReservations.reduce((sum, r) => sum + r.totalAmount, 0);
    const occupancyPct =
      totalMonthNights > 0
        ? Math.min(PERCENTAGE_SCALE, parseFloat(((nights / totalMonthNights) * PERCENTAGE_SCALE).toFixed(1)))
        : 0;

    return { roomId: room.id, roomName: room.name, occupancyPct, revenue, reservationCount: roomReservations.length };
  });
}
