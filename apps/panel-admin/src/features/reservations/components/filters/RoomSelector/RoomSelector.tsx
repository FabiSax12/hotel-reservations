"use client";

import { ListBox, Select } from "@heroui/react";
import { useI18n } from "@/locales";
import { ROOM_ALL_KEY } from "../../../constants/reservation-filters";
import type { RoomSelectorProps } from "./RoomSelector.interface";
import { ROOM_SELECTOR_STYLES as S } from "./RoomSelector.styles";

export const RoomSelector = ({ value, rooms, onChange }: RoomSelectorProps) => {
  const { t } = useI18n();

  return (
    <Select
      value={value}
      onChange={onChange}
      aria-label={t.RESERVATIONS.FILTERS.ARIA_LABEL_ROOM_FILTER}
    >
      <Select.Trigger className={`${S.pill} ${S.pillInactive} ${S.selectTrigger}`}>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          <ListBox.Item id={ROOM_ALL_KEY}>{t.RESERVATIONS.FILTERS.PLACEHOLDER_ROOM}</ListBox.Item>
          {rooms.map((room) => (
            <ListBox.Item id={room} key={room}>
              {room}
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  );
};
