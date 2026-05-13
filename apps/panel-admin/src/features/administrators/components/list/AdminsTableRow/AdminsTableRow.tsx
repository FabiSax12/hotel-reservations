"use client";

import { Avatar, Chip, Table } from "@heroui/react";
import { useI18n } from "@/locales";
import { formatMemberSince } from "../../../utils/format-admin-date";
import { deriveAdminInitials } from "../../../utils/derive-admin-initials";
import { CopyEmailButton } from "../../shared/CopyEmailButton/CopyEmailButton";
import { ADMINS_TABLE_ROW_STYLES as STYLE } from "./AdminsTableRow.styles";
import type { AdminsTableRowProps } from "./AdminsTableRow.interfaces";

export const AdminsTableRow = ({ admin, isSessionUser }: AdminsTableRowProps) => {
  const { t } = useI18n();

  const rowClass    = isSessionUser ? STYLE.rowSession : STYLE.row;
  const cellClass   = isSessionUser ? STYLE.cellSession : STYLE.cell;
  const initials    = deriveAdminInitials(admin.email);
  const memberSince = formatMemberSince(admin.created_at);
  const statusColor = admin.is_active ? "success" : "danger";
  const statusLabel = admin.is_active
    ? t.ADMINISTRATORS.TABLE.STATUS_ACTIVE
    : t.ADMINISTRATORS.TABLE.STATUS_INACTIVE;

  return (
    <Table.Row className={rowClass}>
      <Table.Cell className={cellClass}>
        <div className={STYLE.emailCell}>
          <Avatar size="sm">
            <Avatar.Fallback>{initials}</Avatar.Fallback>
          </Avatar>
          <div className={STYLE.emailBlock}>
            <div className={STYLE.emailRow}>
              <span className={STYLE.emailText}>{admin.email}</span>
              {isSessionUser && (
                <Chip color="success" variant="soft" size="sm">
                  {t.ADMINISTRATORS.TABLE.BADGE_YOU}
                </Chip>
              )}
              <CopyEmailButton email={admin.email} />
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
        <span className={STYLE.dateText}>{memberSince}</span>
      </Table.Cell>
    </Table.Row>
  );
};
