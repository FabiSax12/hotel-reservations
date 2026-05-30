"use client";

import { computePct } from "../../../utils/metrics.format.utils";
import { STATUS_ORDER } from "../../../constants/metrics.constants";
import { StatusChip } from "../../shared/StatusChip/StatusChip";
import { ProportionalBar } from "../../shared/ProportionalBar/ProportionalBar";
import { WeeklyStackedBarChart } from "../../charts/WeeklyStackedBarChart/WeeklyStackedBarChart";
import { RESERVATIONS_BY_STATUS_TAB_STYLES as STYLES } from "./ReservationsByStatusTab.styles";
import type { ReservationsByStatusTabProps } from "./ReservationsByStatusTab.interface";
import type { ProportionalBarSegment } from "../../shared/ProportionalBar/ProportionalBar.interface";

export function ReservationsByStatusTab({
  statusCounts,
  totalReservations,
  weeklyData,
  periodLabel,
  statusLabels,
  totalLabel,
  periodPrefix,
  weeklyTitle,
  weeklyEmptyText,
  chartAriaLabel,
  barAriaLabel,
}: ReservationsByStatusTabProps) {
  const total = totalReservations;

  const barSegments: ProportionalBarSegment[] = STATUS_ORDER.map((status) => ({
    status,
    pct: computePct(statusCounts[status], total),
  }));

  return (
    <div className={STYLES.wrapper}>
      <div className={STYLES.headerRow}>
        <div>
          <p className={STYLES.subtitle}>
            {total.toLocaleString()} {totalLabel}
          </p>
        </div>
        <span className={STYLES.periodBadge}>
          {periodPrefix} · {periodLabel}
        </span>
      </div>

      <div className={STYLES.chipsGrid}>
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

      <ProportionalBar segments={barSegments} ariaLabel={barAriaLabel} />

      <div>
        <p className={STYLES.sectionTitle}>{weeklyTitle}</p>
      </div>

      <WeeklyStackedBarChart
        data={weeklyData}
        statusLabels={{
          pending:   statusLabels.PENDING,
          approved:  statusLabels.APPROVED,
          cancelled: statusLabels.CANCELLED,
          completed: statusLabels.COMPLETED,
        }}
        emptyText={weeklyEmptyText}
        ariaLabel={chartAriaLabel}
      />
    </div>
  );
}
