"use client";

import { Chip, Table } from "@heroui/react";
import { memo } from "react";
import { AVAILABILITY_CHIP_COLOR } from "@/features/rooms/constants/availabilityChipColor";
import { CATEGORY_CHIP_COLOR } from "@/features/rooms/constants/categoryChipColor";
import { formatPrice } from "@/features/rooms/utils/format-price";
import { useI18n } from "@/locales";
import type { RoomsTableRowProps } from "./RoomsTableRow.interface";

export const RoomsTableRow = memo(
  ({ room, isAvailable, capacityText, statusAvailable, statusUnavailable }: RoomsTableRowProps) => {
    const { locale } = useI18n();

    return (
      <Table.Row key={room.id}>
        <Table.Cell>{room.name}</Table.Cell>
        <Table.Cell>
          <Chip variant="soft" color={CATEGORY_CHIP_COLOR[room.category]} size="sm">
            {room.category}
          </Chip>
        </Table.Cell>
        <Table.Cell>{capacityText}</Table.Cell>
        <Table.Cell>{formatPrice(room.regular_fee, locale)}</Table.Cell>
        <Table.Cell>{formatPrice(room.high_season_fee, locale)}</Table.Cell>
        <Table.Cell>
          <Chip
            variant="soft"
            color={
              isAvailable ? AVAILABILITY_CHIP_COLOR.available : AVAILABILITY_CHIP_COLOR.unavailable
            }
            size="sm"
          >
            {isAvailable ? statusAvailable : statusUnavailable}
          </Chip>
        </Table.Cell>
      </Table.Row>
    );
  },
);
