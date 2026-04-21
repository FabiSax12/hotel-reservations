"use client";

import { useI18n } from "@/locales";
import { FILTER_BAR_STYLES as S, STATUS_DOT_COLOR } from "@/themes/reservations-filters.theme";
import type { ReservationStatus } from "../domain/reservation";
import { RESERVATION_STATUSES } from "../constants/reservation-statuses";
import { STATUS_I18N_KEY } from "../constants/status-i18n";

interface StatusPillGroupProps {
  statuses: ReservationStatus[];
  statusCounts: Record<ReservationStatus, number>;
  totalCount: number;
  onAllClick: () => void;
  onStatusToggle: (status: ReservationStatus) => void;
}

export const StatusPillGroup = ({
  statuses,
  statusCounts,
  totalCount,
  onAllClick,
  onStatusToggle,
}: StatusPillGroupProps) => {
  const { t } = useI18n();

  return (
    <div className={S.leftSection}>
      <button
        type="button"
        aria-pressed={statuses.length === 0}
        className={`${S.pill} ${statuses.length === 0 ? S.pillActive : S.pillInactive}`}
        onClick={onAllClick}
      >
        {t.RESERVATIONS.FILTERS.ALL}
        <span className={S.pillCount}>{totalCount}</span>
      </button>

      {RESERVATION_STATUSES.map((status) => {
        const isOn = statuses.includes(status);
        return (
          <button
            key={status}
            type="button"
            aria-pressed={isOn}
            className={`${S.pill} ${isOn ? S.pillActive : S.pillInactive}`}
            onClick={() => onStatusToggle(status)}
          >
            <span className={`${S.pillStatusDot} ${STATUS_DOT_COLOR[status]}`} />
            {t.RESERVATIONS.STATUS[STATUS_I18N_KEY[status]]}
            <span className={S.pillCount}>{statusCounts[status]}</span>
          </button>
        );
      })}
    </div>
  );
};
