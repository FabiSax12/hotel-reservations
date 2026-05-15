"use client";

import { RankingRow } from "../../shared/RankingRow/RankingRow";
import { RANKING_TAB_STYLES as S } from "./RankingTab.styles";
import type { RankingTabProps } from "./RankingTab.interface";

export function RankingTab({ ranking, subtitle, reservationsSuffix, emptyText }: RankingTabProps) {
  const hasData = ranking.some((r) => r.reservationCount > 0);

  return (
    <div>
      <p className={S.subtitle}>{subtitle}</p>
      {hasData ? (
        <div className={S.wrapper}>
          {ranking.map((entry, idx) => (
            <div key={entry.roomId}>
              <RankingRow
                rank={entry.rank}
                roomName={entry.roomName}
                reservationCount={entry.reservationCount}
                proportionPct={entry.proportionPct}
                revenue={entry.revenue}
                reservationsSuffix={reservationsSuffix}
              />
              {idx < ranking.length - 1 && <div className={S.divider} />}
            </div>
          ))}
        </div>
      ) : (
        <p className={S.empty}>{emptyText}</p>
      )}
    </div>
  );
}
