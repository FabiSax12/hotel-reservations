"use client";

import { CURRENCY_CODE, CURRENCY_LOCALE } from "../../constants/metrics.constants";
import { STAT_CARDS_STYLES as STYLES } from "./StatCards.styles";
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
    <div className={STYLES.grid}>
      <div className={STYLES.card}>
        <p className={STYLES.label}>{labels.TOTAL_RESERVATIONS}</p>
        <p className={STYLES.value}>{totalReservations.toLocaleString()}</p>
      </div>
      <div className={STYLES.card}>
        <p className={STYLES.label}>{labels.TOTAL_REVENUE}</p>
        <p className={STYLES.value}>{formatCurrency(totalRevenue)}</p>
      </div>
      <div className={STYLES.card}>
        <p className={STYLES.label}>{labels.AVG_OCCUPANCY}</p>
        <p className={STYLES.value}>{averageOccupancy.toFixed(1)}%</p>
      </div>
      <div className={STYLES.card}>
        <p className={STYLES.label}>{labels.ACTIVE_ROOMS}</p>
        <p className={STYLES.value}>{activeRooms} / {totalRooms}</p>
      </div>
    </div>
  );
}
