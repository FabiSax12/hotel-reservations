"use client";

import { Button, ButtonGroup } from "@heroui/react";
import { useI18n } from "@/locales";
import {
  ADMINS_FILTER_BAR_STYLES as STYLES,
  ADMIN_STATUS_PILL_STYLES as PILL,
  ADMIN_STATUS_DOT_COLOR,
} from "./AdminsFilters.styles";
import type { AdminsFiltersProps } from "./AdminsFilters.interface";
import { FILTERS_STATUS } from "../../constants/filters-status";

export const AdminsFilters = ({
  activeFilter,
  onFilterChange,
  isFiltered,
  onClear,
  statusCounts,
}: AdminsFiltersProps) => {
  const { t } = useI18n();
  const texts = t.ADMINS.FILTERS;

  const filterOptions = [
    { value: FILTERS_STATUS.ACTIVE, label: texts.ACTIVE, dotColor: ADMIN_STATUS_DOT_COLOR.active },
    { value: FILTERS_STATUS.INACTIVE, label: texts.INACTIVE, dotColor: ADMIN_STATUS_DOT_COLOR.inactive },
  ];

  return (
    <div className={STYLES.wrapper}>
      <div className={STYLES.bar}>
        <ButtonGroup className={STYLES.buttonGroup}>
          {filterOptions.map(({ value, label, dotColor }) => (
            <Button
              key={value}
              variant="ghost"
              aria-pressed={activeFilter === value}
              className={`${PILL.pill} ${activeFilter === value ? PILL.pillActive : PILL.pillInactive}`}
              onPress={() => onFilterChange(value)}
            >
              <span className={`${PILL.pillStatusDot} ${dotColor}`} />
              {label}
              <span className={PILL.pillCount}>{statusCounts[value]}</span>
            </Button>
          ))}
        </ButtonGroup>

        <div className={STYLES.spacer} />

        <div className={STYLES.rightSection}>
          <Button
            variant="ghost"
            size="sm"
            className={`${PILL.pill} ${PILL.pillInactive}`}
            isDisabled={!isFiltered}
            onPress={onClear}
          >
            {texts.CLEAR}
          </Button>
        </div>
      </div>
    </div>
  );
};
