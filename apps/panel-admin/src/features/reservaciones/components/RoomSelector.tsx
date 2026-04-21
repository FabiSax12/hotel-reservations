"use client";

import { ListBox, Select } from "@heroui/react";
import { useI18n } from "@/locales";
import { FILTER_BAR_STYLES as S } from "@/themes/reservations-filters.theme";
import { ROOM_LIST } from "../constants/room-list";

const ROOM_ALL_KEY = "__ALL__";

interface RoomSelectorProps {
  value: string;
  onChange: (key: string | number | null) => void;
}

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
