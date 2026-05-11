"use client";

import { useI18n } from "@/locales";
import { AdminsTableRow } from "../AdminsTableRow/AdminsTableRow";
import {
  ADMINS_TABLE_STYLES as T,
  COL_EMAIL,
  COL_STATUS,
  COL_DATE,
} from "./AdminsTable.styles";
import type { AdminsTableProps } from "./AdminsTable.interfaces";

export const AdminsTable = ({ administrators, sessionUserId }: AdminsTableProps) => {
  const { t } = useI18n();

  const buildIsSessionUser = (id: string) => id === sessionUserId;

  return (
    <div className={T.wrapper}>
      {/* Floating column headers — on background, no card */}
      <div className={T.headerRow}>
        <span className={`${COL_EMAIL}  ${T.colHeader}`}>
          {t.ADMINISTRATORS.TABLE.COL_EMAIL}
        </span>
        <span className={`${COL_STATUS} ${T.colHeader}`}>
          {t.ADMINISTRATORS.TABLE.COL_STATUS}
        </span>
        <span className={`${COL_DATE}   ${T.colHeader}`}>
          {t.ADMINISTRATORS.TABLE.COL_CREATED_AT}
        </span>
      </div>

      {/* Card rows */}
      <div className={T.cardList}>
        {administrators.map((admin) => (
          <AdminsTableRow
            key={admin.id}
            admin={admin}
            isSessionUser={buildIsSessionUser(admin.id)}
          />
        ))}
      </div>
    </div>
  );
};
