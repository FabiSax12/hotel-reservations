"use client";

import { ListBox, Select } from "@heroui/react";
import { ROOM_CATEGORIES } from "@/features/rooms/constants/info.constants";
import { useI18n } from "@/locales";
import type { CategoryFilterProps } from "./CategoryFilter.interface";
import { CATEGORY_FILTER_STYLES as STYLES } from "./CategoryFilter.styles";

const ALL_KEY = "all";

export function CategoryFilter({ selectedKey, onChange }: CategoryFilterProps) {
  const { t } = useI18n();
  const texts = t.ROOMS.LIST.FILTERS;

  return (
    <div className={STYLES.wrapper}>
      <p className={STYLES.label}>{texts.CATEGORY_LABEL}</p>
      <Select
        value={selectedKey}
        onChange={onChange}
        aria-label={texts.CATEGORY_LABEL}
        className="min-w-35"
      >
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            <ListBox.Item id={ALL_KEY}>{texts.CATEGORY_ALL}</ListBox.Item>
            {Object.values(ROOM_CATEGORIES).map((opt) => (
              <ListBox.Item key={opt} id={opt}>
                {opt}
              </ListBox.Item>
            ))}
          </ListBox>
        </Select.Popover>
      </Select>
    </div>
  );
}
