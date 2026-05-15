"use client";

import { CURRENCY_CODE, CURRENCY_LOCALE } from "../../constants/metrics.constants";
import { STAT_CARDS_STYLES as S } from "./StatCards.styles";
import type { StatCardsProps } from "./StatCards.interface";

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat(CURRENCY_LOCALE, {
    style: "currency",
    currency: CURRENCY_CODE,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function StatCards({
  totalReservations,
  totalRevenue,
  averageOccupancy,
  activeRooms,
  totalRooms,
  labels,
}: StatCardsProps) {
  return (
    <div className={S.grid}>
      <div className={S.card}>
        <p className={S.label}>{labels.TOTAL_RESERVATIONS}</p>
        <p className={S.value}>{totalReservations.toLocaleString()}</p>
      </div>
      <div className={S.card}>
        <p className={S.label}>{labels.TOTAL_REVENUE}</p>
        <p className={S.value}>{formatCurrency(totalRevenue)}</p>
      </div>
      <div className={S.card}>
        <p className={S.label}>{labels.AVG_OCCUPANCY}</p>
        <p className={S.value}>{averageOccupancy.toFixed(1)}%</p>
      </div>
      <div className={S.card}>
        <p className={S.label}>{labels.ACTIVE_ROOMS}</p>
        <p className={S.value}>{activeRooms} / {totalRooms}</p>
      </div>
    </div>
  );
}
