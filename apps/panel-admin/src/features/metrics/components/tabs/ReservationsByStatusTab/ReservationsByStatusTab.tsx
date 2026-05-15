"use client";

import { PERCENTAGE_SCALE } from "../../../constants/metrics.constants";
import { StatusChip } from "../../shared/StatusChip/StatusChip";
import { ProportionalBar } from "../../shared/ProportionalBar/ProportionalBar";
import { WeeklyStackedBarChart } from "../../charts/WeeklyStackedBarChart/WeeklyStackedBarChart";
import { RESERVATIONS_BY_STATUS_TAB_STYLES as S } from "./ReservationsByStatusTab.styles";
import type { ReservationsByStatusTabProps } from "./ReservationsByStatusTab.interface";
import type { ProportionalBarSegment } from "../../shared/ProportionalBar/ProportionalBar.interface";

function computePct(count: number, total: number): number {
  if (total === 0) return 0;
  return parseFloat(((count / total) * PERCENTAGE_SCALE).toFixed(1));
}

export function ReservationsByStatusTab({
  statusCounts,
  totalReservations,
  weeklyData,
  periodLabel,
  statusLabels,
  totalLabel,
  periodPrefix,
  weeklyTitle,
  weeklySubtitle,
}: ReservationsByStatusTabProps) {
  const total = totalReservations;

  const barSegments: ProportionalBarSegment[] = [
    { status: "pending",   pct: computePct(statusCounts.pending,   total) },
    { status: "approved",  pct: computePct(statusCounts.approved,  total) },
    { status: "cancelled", pct: computePct(statusCounts.cancelled, total) },
    { status: "completed", pct: computePct(statusCounts.completed, total) },
  ];

  return (
    <div className={S.wrapper}>
      <div className={S.headerRow}>
        <div>
          <p className={S.subtitle}>
            {total.toLocaleString()} {totalLabel}
          </p>
        </div>
        <span className={S.periodBadge}>
          {periodPrefix} · {periodLabel}
        </span>
      </div>

      <div className={S.chipsGrid}>
        <StatusChip
          status="pending"
          label={statusLabels.PENDING}
          count={statusCounts.pending}
          pct={computePct(statusCounts.pending, total)}
        />
        <StatusChip
          status="approved"
          label={statusLabels.APPROVED}
          count={statusCounts.approved}
          pct={computePct(statusCounts.approved, total)}
        />
        <StatusChip
          status="cancelled"
          label={statusLabels.CANCELLED}
          count={statusCounts.cancelled}
          pct={computePct(statusCounts.cancelled, total)}
        />
        <StatusChip
          status="completed"
          label={statusLabels.COMPLETED}
          count={statusCounts.completed}
          pct={computePct(statusCounts.completed, total)}
        />
      </div>

      <ProportionalBar segments={barSegments} />

      <div>
        <p className={S.sectionTitle}>{weeklyTitle}</p>
        <p className={S.sectionSub}>{weeklySubtitle}</p>
      </div>

      <WeeklyStackedBarChart data={weeklyData} />
    </div>
  );
}
