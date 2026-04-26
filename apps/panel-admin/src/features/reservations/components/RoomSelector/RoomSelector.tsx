"use client";

import { ListBox, Select } from "@heroui/react";
import { useI18n } from "@/locales";
import { ROOM_SELECTOR_STYLES as S } from "./RoomSelector.styles";
import { ROOM_ALL_KEY, ROOM_LIST } from "../../constants/room-list";
import type { RoomSelectorProps } from "./RoomSelector.interface";

export const RoomSelector = ({ value, onChange }: RoomSelectorProps) => {
  const { t } = useI18n();

  return (
    <Select value={value} onChange={onChange}>
      <Select.Trigger className={`${S.pill} ${S.pillInactive} ${S.selectTrigger}`}>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          <ListBox.Item id={ROOM_ALL_KEY}>
            {t.RESERVATIONS.FILTERS.PLACEHOLDER_ROOM}
          </ListBox.Item>
          {ROOM_LIST.map((room) => (
            <ListBox.Item id={room} key={room}>
              {room}
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  );
};
