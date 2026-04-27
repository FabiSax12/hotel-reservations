"use client";

import { Avatar, Button, Table } from "@heroui/react";
import { useI18n } from "@/locales";
import { RESERVATIONS_TABLE_STYLES as T, TABLE_CELL_STYLES as C } from "./ReservationsTable.styles";
import { formatTableDate } from "../../utils/format-reservation-date";
import { StatusBadge } from "../StatusBadge/StatusBadge";
import type { ReservationsTableProps } from "./ReservationsTable.interface";

export const ReservationsTable = ({ reservations }: ReservationsTableProps) => {
  const { t } = useI18n();
  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label={t.RESERVATIONS.TABLE.ARIA_LABEL}>
          <Table.Header>
            <Table.Column isRowHeader className={T.columnHeader}>
              {t.RESERVATIONS.TABLE.COL_CODE}
            </Table.Column>
            <Table.Column className={T.columnHeader}>{t.RESERVATIONS.TABLE.COL_GUEST}</Table.Column>
            <Table.Column className={T.columnHeader}>{t.RESERVATIONS.TABLE.COL_ROOM}</Table.Column>
            <Table.Column className={T.columnHeader}>{t.RESERVATIONS.TABLE.COL_CHECKIN}</Table.Column>
            <Table.Column className={T.columnHeader}>{t.RESERVATIONS.TABLE.COL_CHECKOUT}</Table.Column>
            <Table.Column className={T.columnHeader}>{t.RESERVATIONS.TABLE.COL_NIGHTS}</Table.Column>
            <Table.Column className={T.columnHeader}>{t.RESERVATIONS.TABLE.COL_TOTAL}</Table.Column>
            <Table.Column className={T.columnHeader}>{t.RESERVATIONS.TABLE.COL_STATUS}</Table.Column>
            <Table.Column className={T.columnHeader}>{t.RESERVATIONS.TABLE.COL_ACTIONS}</Table.Column>
          </Table.Header>
          <Table.Body>
            {reservations.map((r) => (
              <Table.Row key={r.id} id={r.id}>
                <Table.Cell>
                  <code className={C.codeBadge}>{r.code}</code>
                </Table.Cell>
                <Table.Cell>
                  <div className={C.guestRow}>
                    <Avatar size="sm">
                      <Avatar.Fallback>{r.guest.initials}</Avatar.Fallback>
                    </Avatar>
                    <div className={C.guestTextBlock}>
                      <p className={C.textPrimary}>{r.guest.name}</p>
                      <p className={C.textSecondary}>{r.guest.email}</p>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <p className={C.textPrimary}>{r.room.name}</p>
                  <p className={C.textSecondary}>{r.room.location}</p>
                </Table.Cell>
                <Table.Cell>
                  <span className={C.textDefault}>{formatTableDate(r.checkIn)}</span>
                </Table.Cell>
                <Table.Cell>
                  <span className={C.textDefault}>{formatTableDate(r.checkOut)}</span>
                </Table.Cell>
                <Table.Cell>
                  <span className={C.textDefault}>{r.nights}</span>
                </Table.Cell>
                <Table.Cell>
                  <span className={C.textAmount}>${r.totalUSD.toLocaleString("en-US")}</span>
                </Table.Cell>
                <Table.Cell>
                  <StatusBadge status={r.status} />
                </Table.Cell>
                <Table.Cell>
                  <Button variant="outline" size="sm">
                    {t.RESERVATIONS.ACTIONS.VIEW_DETAIL}
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
};
