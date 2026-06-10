"use client";

import { EmptyState, Table } from "@heroui/react";
import { Inbox } from "lucide-react";
import { memo, useMemo } from "react";
import { ROOMS_TABLE_STYLES as STYLES } from "@/features/rooms/components/list/RoomsTable/RoomsTable.styles";
import { formatCapacity } from "@/features/rooms/utils/format-capacity";
import { useI18n } from "@/locales";
import type { RoomsTableProps } from "./RoomsTable.interface";
import { RoomsTableRow } from "./RoomsTableRow/RoomsTableRow";

export const RoomsTable = memo(function RoomsTable({ rooms }: RoomsTableProps) {
  const { t } = useI18n();
  const texts = t.ROOMS.LIST.TABLE;

  const rows = useMemo(
    () =>
      rooms.map((room) => ({
        room,
        isAvailable: room.is_active,
        capacityText: formatCapacity(
          room.capacity_adults,
          room.capacity_kids,
          texts.CAPACITY_PERSONS,
        ),
      })),
    [rooms, texts.CAPACITY_PERSONS],
  );

  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label={texts.COL_NAME} className={STYLES.content}>
          <Table.Header>
            <Table.Column isRowHeader>{texts.COL_NAME}</Table.Column>
            <Table.Column>{texts.COL_CATEGORY}</Table.Column>
            <Table.Column>{texts.COL_CAPACITY}</Table.Column>
            <Table.Column>{texts.COL_REGULAR_FEE}</Table.Column>
            <Table.Column>{texts.COL_HIGH_SEASON_FEE}</Table.Column>
            <Table.Column>{texts.COL_AVAILABILITY}</Table.Column>
          </Table.Header>
          <Table.Body
            renderEmptyState={() => (
              <EmptyState className={STYLES.emptyState}>
                <Inbox className={STYLES.emptyStateIcon} />
                <span className={STYLES.emptyStateText}>{texts.NO_RESULTS}</span>
              </EmptyState>
            )}
          >
            {rows.map(({ room, isAvailable, capacityText }) => (
              <RoomsTableRow
                key={room.id}
                room={room}
                isAvailable={isAvailable}
                capacityText={capacityText}
                statusAvailable={texts.STATUS_AVAILABLE}
                statusUnavailable={texts.STATUS_UNAVAILABLE}
              />
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
});
