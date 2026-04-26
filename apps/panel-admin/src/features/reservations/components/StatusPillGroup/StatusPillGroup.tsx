"use client";

import { Button } from "@heroui/react";
import { useI18n } from "@/locales";
import { STATUS_PILL_GROUP_STYLES as S, STATUS_DOT_COLOR } from "./StatusPillGroup.styles";
import { RESERVATION_STATUSES } from "../../constants/reservation-statuses";
import { STATUS_I18N_KEY } from "../../constants/status-i18n";
import type { StatusPillGroupProps } from "./StatusPillGroup.interface";

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
      <Button
        variant="ghost"
        aria-pressed={statuses.length === 0}
        className={`${S.pill} ${statuses.length === 0 ? S.pillActive : S.pillInactive}`}
        onPress={onAllClick}
      >
        {t.RESERVATIONS.FILTERS.ALL}
        <span className={S.pillCount}>{totalCount}</span>
      </Button>

      {RESERVATION_STATUSES.map((status) => {
        const isOn = statuses.includes(status);
        return (
          <Button
            key={status}
            variant="ghost"
            aria-pressed={isOn}
            className={`${S.pill} ${isOn ? S.pillActive : S.pillInactive}`}
            onPress={() => onStatusToggle(status)}
          >
            <span className={`${S.pillStatusDot} ${STATUS_DOT_COLOR[status]}`} />
            {t.RESERVATIONS.STATUS[STATUS_I18N_KEY[status]]}
            <span className={S.pillCount}>{statusCounts[status]}</span>
          </Button>
        );
      })}
    </div>
  );
};
