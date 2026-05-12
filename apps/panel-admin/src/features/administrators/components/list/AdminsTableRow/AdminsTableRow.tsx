"use client";

import { Avatar, Chip, Table } from "@heroui/react";
import { useI18n } from "@/locales";
import { formatMemberSince } from "../../../utils/format-admin-date";
import { ADMIN_INITIALS_LENGTH } from "../../../constants/administrators.constants";
import { ADMINS_TABLE_ROW_STYLES as S } from "./AdminsTableRow.styles";
import type { AdminsTableRowProps } from "./AdminsTableRow.interfaces";

function deriveInitials(email: string): string {
  return email.split("@")[0].slice(0, ADMIN_INITIALS_LENGTH).toUpperCase();
}

export const AdminsTableRow = ({ admin, isSessionUser }: AdminsTableRowProps) => {
  const { t } = useI18n();

  const rowClass  = isSessionUser ? S.rowSession : S.row;
  const cellClass = isSessionUser ? S.cellSession : S.cell;
  const initials  = deriveInitials(admin.email);
  const memberSince = formatMemberSince(admin.created_at);
  const statusColor = admin.is_active ? "success" : "danger";
  const statusLabel = admin.is_active
    ? t.ADMINISTRATORS.TABLE.STATUS_ACTIVE
    : t.ADMINISTRATORS.TABLE.STATUS_INACTIVE;

  return (
    <Table.Row className={rowClass}>
      <Table.Cell className={cellClass}>
        <div className={S.emailCell}>
          <Avatar size="sm">
            <Avatar.Fallback>{initials}</Avatar.Fallback>
          </Avatar>
          <div className={S.emailBlock}>
            <div className={S.emailRow}>
              <span className={S.emailText}>{admin.email}</span>
              {isSessionUser && (
                <Chip color="success" variant="soft" size="sm">
                  {t.ADMINISTRATORS.TABLE.BADGE_YOU}
                </Chip>
              )}
            </div>
          </div>
        </div>
      </Table.Cell>

      <Table.Cell className={cellClass}>
        <Chip color={statusColor} variant="soft" size="sm">
          {statusLabel}
        </Chip>
      </Table.Cell>

      <Table.Cell className={cellClass}>
        <span className={S.dateText}>{memberSince}</span>
      </Table.Cell>
    </Table.Row>
  );
};
