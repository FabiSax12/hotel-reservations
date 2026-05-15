"use client";

import { CURRENCY_CODE, CURRENCY_LOCALE } from "../../../constants/metrics.constants";
import { RANKING_ROW_STYLES as S } from "./RankingRow.styles";
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
    <div className={S.row}>
      <span className={S.rankBadge}>#{rank}</span>
      <div className={S.info}>
        <div className={S.nameRow}>
          <span className={S.name} title={roomName}>{roomName}</span>
        </div>
        <div className={S.bar}>
          <div className={S.barFill} style={{ width: `${proportionPct}%` }} />
        </div>
        <div className={S.countRevRow}>
          <span className={S.count}>{reservationCount} {reservationsSuffix}</span>
          <span className={S.revenue}>{formatRevenue(revenue)}</span>
        </div>
      </div>
    </div>
  );
}
