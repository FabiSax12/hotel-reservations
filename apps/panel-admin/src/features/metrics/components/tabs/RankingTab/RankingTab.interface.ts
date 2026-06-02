import type { RankingEntry } from "../../../domain/metricsTypes";

export interface RankingTabProps {
  ranking: RankingEntry[];
  subtitle: string;
  reservationsSuffix: string;
  meterAriaLabelSuffix: string;
  emptyText: string;
}
