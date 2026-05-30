import type { RankingEntry } from "../../../domain/metrics.types";

export interface RankingTabProps {
  ranking: RankingEntry[];
  subtitle: string;
  reservationsSuffix: string;
  meterAriaLabelSuffix: string;
  emptyText: string;
}
