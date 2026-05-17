"use client";

import { Fragment, useCallback, useRef } from "react";
import { useI18n } from "@/locales";
import { COLLAPSE_DURATION_MS } from "../../../constants/timing";
import type { ReservationStatus } from "../../../domain/reservation";
import { useDelayedUnmount } from "../../../hooks/useDelayedUnmount";
import { useExpandedReservations } from "../../../hooks/useExpandedReservations";
import { ReservationExpandedPanel } from "../../detail/ReservationExpandedPanel/ReservationExpandedPanel";
import { ReservationRow } from "../ReservationRow/ReservationRow";
import type { ExpandedPanelRowProps, ReservationsTableProps } from "./ReservationsTable.interface";
import { RESERVATIONS_TABLE_STYLES as T, TABLE_COLUMN_COUNT } from "./ReservationsTable.styles";

const ExpandedPanelRow = ({
  reservation,
  isExpanded,
  onClose,
  onRegisterClose,
  onSave,
}: ExpandedPanelRowProps) => {
  const shouldRender = useDelayedUnmount(isExpanded, COLLAPSE_DURATION_MS);

  if (!shouldRender) return null;

  return (
    <tr>
      <td colSpan={TABLE_COLUMN_COUNT} className={T.expandedCell}>
        <ReservationExpandedPanel
          reservation={reservation}
          isClosing={!isExpanded}
          onRequestClose={onClose}
          onRegisterClose={onRegisterClose}
          onSave={onSave}
        />
      </td>
    </tr>
  );
};

export const ReservationsTable = ({
  reservations,
  onSaveReservationStatus,
}: ReservationsTableProps) => {
  const { t } = useI18n();
  const { isExpanded, toggleExpanded } = useExpandedReservations();

  // Registry of guarded close handlers keyed by reservation id.
  // When a panel has pending changes, its handler intercepts the toggle
  // and opens the UnsavedChangesModal instead of collapsing.
  const closeHandlers = useRef<Map<string, () => void>>(new Map());

  const registerCloseHandler = useCallback((id: string, handler: () => void) => {
    closeHandlers.current.set(id, handler);
    return () => {
      closeHandlers.current.delete(id);
    };
  }, []);

  const buildToggleHandler = (id: string) => () => {
    if (isExpanded(id)) {
      const guardedClose = closeHandlers.current.get(id);
      if (guardedClose) {
        guardedClose();
      } else {
        toggleExpanded(id);
      }
    } else {
      toggleExpanded(id);
    }
  };

  const buildCloseHandler = (id: string) => () => toggleExpanded(id);

  const buildSaveHandler =
    (id: string) => (status: ReservationStatus, cancellationReason?: string) => {
      onSaveReservationStatus?.(id, status, cancellationReason);
      toggleExpanded(id);
    };

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
              <ExpandedPanelRow
                reservation={r}
                isExpanded={isExpanded(r.id)}
                onClose={buildCloseHandler(r.id)}
                onRegisterClose={registerCloseHandler}
                onSave={buildSaveHandler(r.id)}
              />
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};
