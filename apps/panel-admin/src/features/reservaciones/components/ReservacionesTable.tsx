"use client";

import { Avatar, Button, Table } from "@heroui/react";
import { useI18n } from "@/locales";
import type { Reservacion } from "../domain/reservacion";
import { CELL } from "../constants/styles";
import { StatusBadge } from "./StatusBadge";

interface ReservacionesTableProps {
  reservaciones: readonly Reservacion[];
}

export const ReservacionesTable = ({ reservaciones }: ReservacionesTableProps) => {
  const { t } = useI18n();
  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label={t.RESERVACIONES.TABLE.ARIA_LABEL}>
          <Table.Header>
            <Table.Column isRowHeader>{t.RESERVACIONES.TABLE.COL_CODIGO}</Table.Column>
            <Table.Column>{t.RESERVACIONES.TABLE.COL_HUESPED}</Table.Column>
            <Table.Column>{t.RESERVACIONES.TABLE.COL_HABITACION}</Table.Column>
            <Table.Column>{t.RESERVACIONES.TABLE.COL_CHECKIN}</Table.Column>
            <Table.Column>{t.RESERVACIONES.TABLE.COL_CHECKOUT}</Table.Column>
            <Table.Column>{t.RESERVACIONES.TABLE.COL_NOCHES}</Table.Column>
            <Table.Column>{t.RESERVACIONES.TABLE.COL_TOTAL}</Table.Column>
            <Table.Column>{t.RESERVACIONES.TABLE.COL_ESTADO}</Table.Column>
            <Table.Column>{t.RESERVACIONES.TABLE.COL_ACCIONES}</Table.Column>
          </Table.Header>
          <Table.Body>
            {reservaciones.map((r) => (
              <Table.Row key={r.id} id={r.id}>
                <Table.Cell>
                  <code className={CELL.CODE_BADGE}>{r.codigo}</code>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center gap-3">
                    <Avatar size="sm">
                      <Avatar.Fallback>{r.huesped.iniciales}</Avatar.Fallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className={CELL.TEXT_PRIMARY}>{r.huesped.nombre}</p>
                      <p className={CELL.TEXT_SECONDARY}>{r.huesped.email}</p>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <p className={CELL.TEXT_PRIMARY}>{r.habitacion.nombre}</p>
                  <p className={CELL.TEXT_SECONDARY}>{r.habitacion.ubicacion}</p>
                </Table.Cell>
                <Table.Cell>
                  <span className={CELL.TEXT_DEFAULT}>{r.checkIn}</span>
                </Table.Cell>
                <Table.Cell>
                  <span className={CELL.TEXT_DEFAULT}>{r.checkOut}</span>
                </Table.Cell>
                <Table.Cell>
                  <span className={CELL.TEXT_DEFAULT}>{r.noches}</span>
                </Table.Cell>
                <Table.Cell>
                  <span className={CELL.TEXT_AMOUNT}>${r.totalUSD.toLocaleString("en-US")}</span>
                </Table.Cell>
                <Table.Cell>
                  <StatusBadge estado={r.estado} />
                </Table.Cell>
                <Table.Cell>
                  <Button variant="outline" size="sm">
                    {t.RESERVACIONES.ACTIONS.VER_DETALLE}
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
