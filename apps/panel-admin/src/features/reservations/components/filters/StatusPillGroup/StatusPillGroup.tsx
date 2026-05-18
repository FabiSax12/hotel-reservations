"use client";

import { Button, ButtonGroup } from "@heroui/react";
import { useI18n } from "@/locales";
import { STATUS_PILL_GROUP_STYLES as STYLES } from "./StatusPillGroup.styles";
import { RESERVATION_STATUSES } from "../../../constants/reservation-statuses";
import { FILTERED_RESULTS } from "../../../constants/filtered-results";
import { StatusPill } from "../StatusPill/StatusPill";
import type { StatusPillGroupProps } from "./StatusPillGroup.interface";

export const StatusPillGroup = ({
  statuses,
  statusCounts,
  totalCount,
  onAllClick,
  onStatusToggle,
}: StatusPillGroupProps) => {
  const { t } = useI18n();
  const isAllActive = statuses.length === FILTERED_RESULTS.EMPTY;

  return (
    <ButtonGroup className={STYLES.leftSection}>
      <Button
        variant="ghost"
        aria-pressed={isAllActive}
        className={`${STYLES.pill} ${isAllActive ? STYLES.pillActive : STYLES.pillInactive}`}
        onPress={onAllClick}
      >
        {t.RESERVATIONS.FILTERS.ALL}
        <span className={STYLES.pillCount}>{totalCount}</span>
      </Button>

      {RESERVATION_STATUSES.map((status) => (
        <StatusPill
          key={status}
          status={status}
          isOn={statuses.includes(status)}
          count={statusCounts[status]}
          onStatusToggle={onStatusToggle}
        />
      ))}
    </ButtonGroup>
  );
};
