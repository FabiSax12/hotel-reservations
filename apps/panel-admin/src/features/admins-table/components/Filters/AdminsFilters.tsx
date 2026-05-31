"use client";

import { Button, ButtonGroup } from "@heroui/react";
import { useI18n } from "@/locales";
import {
  ADMINS_FILTER_BAR_STYLES as STYLES,
  ADMIN_STATUS_PILL_STYLES as PILL,
  ADMIN_STATUS_DOT_COLOR,
} from "./AdminsFilters.styles";
import type { AdminsFiltersProps } from "./AdminsFilters.interface";

export const AdminsFilters = ({
  activeFilter,
  onFilterChange,
  isFiltered,
  onClear,
  statusCounts,
}: AdminsFiltersProps) => {
  const { t } = useI18n();
  const texts = t.ADMINS.FILTERS;

  return (
    <div className={STYLES.wrapper}>
      <div className={STYLES.bar}>
        <ButtonGroup className="flex flex-wrap items-center gap-2">
          <Button
            variant="ghost"
            aria-pressed={activeFilter === "active"}
            className={`${PILL.pill} ${activeFilter === "active" ? PILL.pillActive : PILL.pillInactive}`}
            onPress={() => onFilterChange("active")}
          >
            <span className={`${PILL.pillStatusDot} ${ADMIN_STATUS_DOT_COLOR.active}`} />
            {texts.ACTIVE}
            <span className={PILL.pillCount}>{statusCounts.active}</span>
          </Button>

          <Button
            variant="ghost"
            aria-pressed={activeFilter === "inactive"}
            className={`${PILL.pill} ${activeFilter === "inactive" ? PILL.pillActive : PILL.pillInactive}`}
            onPress={() => onFilterChange("inactive")}
          >
            <span className={`${PILL.pillStatusDot} ${ADMIN_STATUS_DOT_COLOR.inactive}`} />
            {texts.INACTIVE}
            <span className={PILL.pillCount}>{statusCounts.inactive}</span>
          </Button>
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
