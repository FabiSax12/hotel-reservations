"use client";

import { Avatar, Chip } from "@heroui/react";
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

  const rowClass    = isSessionUser ? S.rowSession : S.row;
  const initials    = deriveInitials(admin.email);
  const memberSince = formatMemberSince(admin.created_at);
  const statusColor = admin.is_active ? "success" : "danger";
  const statusLabel = admin.is_active
    ? t.ADMINISTRATORS.TABLE.STATUS_ACTIVE
    : t.ADMINISTRATORS.TABLE.STATUS_INACTIVE;

  return (
    <div className={rowClass}>
      {/* Email column */}
      <div className={S.emailCol}>
        <Avatar size="sm" color="success">
          <Avatar.Fallback>{initials}</Avatar.Fallback>
        </Avatar>
        <div className={S.emailInner}>
          <span className={S.emailText}>{admin.email}</span>
          {isSessionUser && (
            <Chip color="success" variant="soft" size="sm">
              {t.ADMINISTRATORS.TABLE.BADGE_YOU}
            </Chip>
          )}
        </div>
      </div>

      {/* Status column */}
      <div className={S.statusCol}>
        <Chip color={statusColor} variant="soft" size="sm">
          {statusLabel}
        </Chip>
      </div>

      {/* Date column */}
      <div className={S.dateCol}>
        <span className={S.dateText}>{memberSince}</span>
      </div>
    </div>
  );
};
