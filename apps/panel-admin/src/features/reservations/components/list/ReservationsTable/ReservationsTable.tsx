"use client";

import { useI18n } from "@/locales";
import { ReservationRow } from "../ReservationRow/ReservationRow";
import type { ReservationsTableProps } from "./ReservationsTable.interface";
import { RESERVATIONS_TABLE_STYLES as T } from "./ReservationsTable.styles";

export const ReservationsTable = ({ reservations }: ReservationsTableProps) => {
  const { t } = useI18n();

  return (
    <div className={T.scrollContainer}>
      <table className={T.table}>
        <thead className={T.thead}>
          <tr>
            <th className={T.th}>{t.RESERVATIONS.TABLE.COL_CODE}</th>
            <th className={T.th}>{t.RESERVATIONS.TABLE.COL_GUEST}</th>
            <th className={T.th}>{t.RESERVATIONS.TABLE.COL_ROOM}</th>
            <th className={T.th}>{t.RESERVATIONS.TABLE.COL_CHECKIN}</th>
            <th className={T.th}>{t.RESERVATIONS.TABLE.COL_CHECKOUT}</th>
            <th className={T.th}>{t.RESERVATIONS.TABLE.COL_NIGHTS}</th>
            <th className={T.th}>{t.RESERVATIONS.TABLE.COL_TOTAL}</th>
            <th className={T.th}>{t.RESERVATIONS.TABLE.COL_STATUS}</th>
            <th className={T.th}>{t.RESERVATIONS.TABLE.COL_ACTIONS}</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((r) => (
            <ReservationRow key={r.id} reservation={r} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
