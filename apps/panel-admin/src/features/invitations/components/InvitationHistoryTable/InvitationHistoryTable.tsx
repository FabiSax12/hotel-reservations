"use client";

import { Chip, EmptyState, Table } from "@heroui/react";
import { Inbox, RotateCcw } from "lucide-react";
import { formatDate } from "@/features/admins-table/utils/formatDate";
import { useI18n } from "@/locales";
import type { InvitationHistoryTableProps } from "./InvitationHistoryTable.interface";
import { INVITATION_HISTORY_TABLE_STYLES as STYLES } from "./InvitationHistoryTable.styles";

const STATUS_COLORS: Record<string, "warning" | "success" | "danger" | "default"> = {
  pending: "warning",
  accepted: "success",
  revoked: "danger",
  expired: "default",
};

export const InvitationHistoryTable = ({
  invitations,
  onResend,
  isResending,
}: InvitationHistoryTableProps) => {
  const { t } = useI18n();

  const STATUS_TEXT_KEYS = {
    pending: "STATUS_PENDING",
    accepted: "STATUS_ACCEPTED",
    revoked: "STATUS_REVOKED",
    expired: "STATUS_EXPIRED",
  } as const;

  const getStatusText = (status: string): string => {
    const key =
      STATUS_TEXT_KEYS[status as keyof typeof STATUS_TEXT_KEYS] ?? `STATUS_${status.toUpperCase()}`;
    const text = t.ADMINS.INVITATIONS[key];
    return typeof text === "string" ? text : status;
  };

  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label="Invitation history" className={STYLES.content}>
          <Table.Header>
            <Table.Column isRowHeader>{t.ADMINS.INVITATIONS.COL_EMAIL}</Table.Column>
            <Table.Column>{t.ADMINS.INVITATIONS.COL_SENT}</Table.Column>
            <Table.Column>{t.ADMINS.INVITATIONS.COL_EXPIRES}</Table.Column>
            <Table.Column>{t.ADMINS.INVITATIONS.COL_STATUS}</Table.Column>
            <Table.Column>{t.ADMINS.INVITATIONS.COL_ACTIONS}</Table.Column>
          </Table.Header>
          <Table.Body
            renderEmptyState={() => (
              <EmptyState className={STYLES.emptyState}>
                <Inbox className={STYLES.emptyStateIcon} />
                <span className={STYLES.emptyStateText}>{t.ADMINS.INVITATIONS.EMPTY_HISTORY}</span>
              </EmptyState>
            )}
          >
            {invitations.map((inv) => (
              <Table.Row key={inv.id}>
                <Table.Cell>{inv.email}</Table.Cell>
                <Table.Cell>{formatDate(inv.created_at)}</Table.Cell>
                <Table.Cell>{formatDate(inv.expires_at)}</Table.Cell>
                <Table.Cell>
                  <Chip variant="soft" color={STATUS_COLORS[inv.status] ?? "default"}>
                    {getStatusText(inv.status)}
                  </Chip>
                </Table.Cell>
                <Table.Cell>
                  <div className={STYLES.actionsCell}>
                    {inv.status === "expired" && (
                      <button
                        type="button"
                        className={STYLES.resendButton}
                        disabled={isResending === inv.id}
                        onClick={() => onResend(inv.id)}
                        aria-label={t.ADMINS.INVITATIONS.ACTION_RESEND}
                      >
                        <RotateCcw className={STYLES.resendIcon} />
                        <span>{t.ADMINS.INVITATIONS.ACTION_RESEND}</span>
                      </button>
                    )}
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
};
