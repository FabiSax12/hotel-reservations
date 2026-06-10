"use client";

import { ListBox, Select } from "@heroui/react";
import { AVAILABILITY_OPTIONS } from "@/features/rooms/constants/availabilityOptions";
import { useI18n } from "@/locales";
import type { AvailabilityFilterProps } from "./AvailabilityFilter.interface";
import { AVAILABILITY_FILTER_STYLES as STYLES } from "./AvailabilityFilter.styles";

const ALL_KEY = "all";

export function AvailabilityFilter({ selectedKey, onChange }: AvailabilityFilterProps) {
  const { t } = useI18n();
  const texts = t.ROOMS.LIST.FILTERS;

  return (
    <div className={STYLES.wrapper}>
      <p className={STYLES.label}>{texts.AVAILABILITY_LABEL}</p>
      <Select
        value={selectedKey}
        onChange={onChange}
        aria-label={texts.AVAILABILITY_LABEL}
        className="min-w-37.5"
      >
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            <ListBox.Item id={ALL_KEY}>{texts.AVAILABILITY_ALL}</ListBox.Item>
            {Object.values(AVAILABILITY_OPTIONS).map((opt) => (
              <ListBox.Item key={opt.id} id={opt.id}>
                {opt.id === AVAILABILITY_OPTIONS.AVAILABLE.id
                  ? texts.AVAILABILITY_AVAILABLE
                  : texts.AVAILABILITY_UNAVAILABLE}
              </ListBox.Item>
            ))}
          </ListBox>
        </Select.Popover>
      </Select>
    </div>
  );
}
