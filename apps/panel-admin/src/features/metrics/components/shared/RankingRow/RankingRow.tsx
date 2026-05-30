"use client";

import { Meter } from "@heroui/react";
import { STATUS_COLORS } from "../../../constants/metrics.constants";
import { formatCurrency } from "../../../utils/metrics.format.utils";
import { RANKING_ROW_STYLES as STYLES } from "./RankingRow.styles";
import type { RankingRowProps } from "./RankingRow.interface";

export function RankingRow({ rank, roomName, reservationCount, proportionPct, revenue, reservationsSuffix, meterAriaLabel }: RankingRowProps) {
  return (
    <div className={STYLES.row}>
      <span className={`${STYLES.rankBadgeBase} ${STYLES.rankBadge[rank] ?? STYLES.rankBadgeDefault}`}>
        #{rank}
      </span>
      <div className={STYLES.info}>
        <div className={STYLES.nameRow}>
          <span className={STYLES.name} title={roomName}>{roomName}</span>
        </div>
        <Meter value={proportionPct} maxValue={100} size="sm" aria-label={meterAriaLabel}>
          <Meter.Track>
            <Meter.Fill className={STATUS_COLORS.approved.tailwind} />
          </Meter.Track>
        </Meter>
        <div className={STYLES.countRevRow}>
          <span className={STYLES.count}>{reservationCount} {reservationsSuffix}</span>
          <span className={STYLES.revenue}>{formatCurrency(revenue)}</span>
        </div>
      </div>
    </div>
  );
}
