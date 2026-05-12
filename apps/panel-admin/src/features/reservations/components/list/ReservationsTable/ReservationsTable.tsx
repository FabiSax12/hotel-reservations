"use client";

import { Fragment } from "react";
import { useI18n } from "@/locales";
import { COLLAPSE_DURATION_MS } from "../../../constants/timing";
import { useDelayedUnmount } from "../../../hooks/useDelayedUnmount";
import { useExpandedReservations } from "../../../hooks/useExpandedReservations";
import { ReservationExpandedPanel } from "../../detail/ReservationExpandedPanel/ReservationExpandedPanel";
import { ReservationRow } from "../ReservationRow/ReservationRow";
import type { ExpandedPanelRowProps, ReservationsTableProps } from "./ReservationsTable.interface";
import { RESERVATIONS_TABLE_STYLES as T, TABLE_COLUMN_COUNT } from "./ReservationsTable.styles";

const ExpandedPanelRow = ({ reservation, isExpanded }: ExpandedPanelRowProps) => {
  const shouldRender = useDelayedUnmount(isExpanded, COLLAPSE_DURATION_MS);

  if (!shouldRender) return null;

  return (
    <tr>
      <td colSpan={TABLE_COLUMN_COUNT} className={T.expandedCell}>
        <ReservationExpandedPanel reservation={reservation} isClosing={!isExpanded} />
      </td>
    </tr>
  );
};

export const ReservationsTable = ({ reservations }: ReservationsTableProps) => {
  const { t } = useI18n();
  const { isExpanded, toggleExpanded } = useExpandedReservations();

  const buildToggleHandler = (id: string) => () => toggleExpanded(id);

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
            <Fragment key={r.id}>
              <ReservationRow
                reservation={r}
                isExpanded={isExpanded(r.id)}
                onToggle={buildToggleHandler(r.id)}
              />
              <ExpandedPanelRow reservation={r} isExpanded={isExpanded(r.id)} />
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};
