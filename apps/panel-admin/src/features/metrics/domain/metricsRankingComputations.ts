import { PERCENTAGE_SCALE } from "../constants/metricsConfig";
import type { MetricsReservation, MetricsRoom, RankingEntry } from "./metricsTypes";

export function computeRanking(
  activeReservations: MetricsReservation[],
  rooms: MetricsRoom[],
): RankingEntry[] {
  const counts = new Map<string, { count: number; revenue: number; name: string }>();

  for (const room of rooms) {
    counts.set(room.id, { count: 0, revenue: 0, name: room.name });
  }
  for (const r of activeReservations) {
    const entry = counts.get(r.roomId);
    if (entry) {
      entry.count += 1;
      entry.revenue += r.totalAmount;
    }
  }

  const maxCount = Math.max(...Array.from(counts.values()).map((e) => e.count), 1);

  return Array.from(counts.entries())
    .sort(([, a], [, b]) => b.count - a.count)
    .map(([id, entry], index) => ({
      rank: index + 1,
      roomId: id,
      roomName: entry.name,
      reservationCount: entry.count,
      revenue: entry.revenue,
      proportionPct: Math.round((entry.count / maxCount) * PERCENTAGE_SCALE),
    }));
}
