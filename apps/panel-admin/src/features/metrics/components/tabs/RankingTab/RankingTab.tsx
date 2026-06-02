"use client";

import { RankingRow } from "../../shared/RankingRow/RankingRow";
import { RANKING_TAB_STYLES as STYLES } from "./RankingTab.styles";
import { formatPct } from "../../../utils/metricsFormatUtils";
import type { RankingTabProps } from "./RankingTab.interface";

export function RankingTab({ ranking, subtitle, reservationsSuffix, meterAriaLabelSuffix, emptyText }: RankingTabProps) {
  const hasData = ranking.some((r) => r.reservationCount > 0);

  return (
    <div>
      <p className={STYLES.subtitle}>{subtitle}</p>
      {hasData ? (
        <div className={STYLES.wrapper}>
          {ranking.map((entry) => (
            <RankingRow
              key={entry.roomId}
              rank={entry.rank}
              roomName={entry.roomName}
              reservationCount={entry.reservationCount}
              proportionPct={entry.proportionPct}
              revenue={entry.revenue}
              reservationsSuffix={reservationsSuffix}
              meterAriaLabel={`${entry.roomName}: ${formatPct(entry.proportionPct)} ${meterAriaLabelSuffix}`}
            />
          ))}
        </div>
      ) : (
        <p className={STYLES.empty}>{emptyText}</p>
      )}
    </div>
  );
}
