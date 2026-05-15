"use client";

import { CURRENCY_CODE, CURRENCY_LOCALE } from "../../../constants/metrics.constants";
import { RANKING_ROW_STYLES as STYLES } from "./RankingRow.styles";
import type { RankingRowProps } from "./RankingRow.interface";

function formatRevenue(amount: number): string {
  return new Intl.NumberFormat(CURRENCY_LOCALE, {
    style: "currency",
    currency: CURRENCY_CODE,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function RankingRow({ rank, roomName, reservationCount, proportionPct, revenue, reservationsSuffix }: RankingRowProps) {
  return (
    <div className={STYLES.row}>
      <span className={STYLES.rankBadge}>#{rank}</span>
      <div className={STYLES.info}>
        <div className={STYLES.nameRow}>
          <span className={STYLES.name} title={roomName}>{roomName}</span>
        </div>
        <div className={STYLES.bar}>
          <div className={STYLES.barFill} style={{ width: `${proportionPct}%` }} />
        </div>
        <div className={STYLES.countRevRow}>
          <span className={STYLES.count}>{reservationCount} {reservationsSuffix}</span>
          <span className={STYLES.revenue}>{formatRevenue(revenue)}</span>
        </div>
      </div>
    </div>
  );
}
