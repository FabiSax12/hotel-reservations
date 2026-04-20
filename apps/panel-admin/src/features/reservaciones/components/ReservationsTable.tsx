"use client";

import { Avatar, Button, Table } from "@heroui/react";
import { useI18n } from "@/locales";
import type { Reservation } from "../domain/reservation";
import { CELL } from "../constants/styles";
import { StatusBadge } from "./StatusBadge";

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("es-CR", {
    day: "numeric",
    month: "short",
  });
}

interface ReservationsTableProps {
  reservations: readonly Reservation[];
}

export const ReservationsTable = ({ reservations }: ReservationsTableProps) => {
  const { t } = useI18n();
  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label={t.RESERVATIONS.TABLE.ARIA_LABEL}>
          <Table.Header>
            <Table.Column isRowHeader>{t.RESERVATIONS.TABLE.COL_CODE}</Table.Column>
            <Table.Column>{t.RESERVATIONS.TABLE.COL_GUEST}</Table.Column>
            <Table.Column>{t.RESERVATIONS.TABLE.COL_ROOM}</Table.Column>
            <Table.Column>{t.RESERVATIONS.TABLE.COL_CHECKIN}</Table.Column>
            <Table.Column>{t.RESERVATIONS.TABLE.COL_CHECKOUT}</Table.Column>
            <Table.Column>{t.RESERVATIONS.TABLE.COL_NIGHTS}</Table.Column>
            <Table.Column>{t.RESERVATIONS.TABLE.COL_TOTAL}</Table.Column>
            <Table.Column>{t.RESERVATIONS.TABLE.COL_STATUS}</Table.Column>
            <Table.Column>{t.RESERVATIONS.TABLE.COL_ACTIONS}</Table.Column>
          </Table.Header>
          <Table.Body>
            {reservations.map((r) => (
              <Table.Row key={r.id} id={r.id}>
                <Table.Cell>
                  <code className={CELL.CODE_BADGE}>{r.code}</code>
                </Table.Cell>
                <Table.Cell>
                  <div className={CELL.GUEST_WRAPPER}>
                    <Avatar size="sm">
                      <Avatar.Fallback>{r.guest.initials}</Avatar.Fallback>
                    </Avatar>
                    <div className={CELL.GUEST_TEXT_WRAPPER}>
                      <p className={CELL.TEXT_PRIMARY}>{r.guest.name}</p>
                      <p className={CELL.TEXT_SECONDARY}>{r.guest.email}</p>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <p className={CELL.TEXT_PRIMARY}>{r.room.name}</p>
                  <p className={CELL.TEXT_SECONDARY}>{r.room.location}</p>
                </Table.Cell>
                <Table.Cell>
                  <span className={CELL.TEXT_DEFAULT}>{formatDate(r.checkIn)}</span>
                </Table.Cell>
                <Table.Cell>
                  <span className={CELL.TEXT_DEFAULT}>{formatDate(r.checkOut)}</span>
                </Table.Cell>
                <Table.Cell>
                  <span className={CELL.TEXT_DEFAULT}>{r.nights}</span>
                </Table.Cell>
                <Table.Cell>
                  <span className={CELL.TEXT_AMOUNT}>${r.totalUSD.toLocaleString("en-US")}</span>
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
