"use client";

import { Button, Chip, EmptyState, Table } from "@heroui/react";
import { Inbox, RotateCcw, X } from "lucide-react";
import { CreateInvitationModal } from "@/features/invitations/components/CreateInvitationModal/CreateInvitationModal";
import { useI18n } from "@/locales";
import type { PendingInvitationsTableProps } from "./PendingInvitationsTable.interface";
import { PENDING_INVITATIONS_SECTION_STYLES as STYLES } from "./PendingInvitationsTable.styles";

const STATUS_COLORS: Record<string, "warning" | "danger"> = {
  pending: "warning",
  expired: "danger",
};

export const PendingInvitationsTable = ({
  invitations,
  onRevoke,
  onResend,
  isRevoking,
  isResending,
}: PendingInvitationsTableProps) => {
  const { t } = useI18n();

  const getStatusInfo = (inv: (typeof invitations)[number]) => {
    const isExpired = new Date(inv.expiresAt) < new Date();
    const status = isExpired ? "expired" : inv.status;
    const color = STATUS_COLORS[status] ?? "warning";
    const label =
      status === "expired"
        ? (t.ADMINS.INVITATIONS.STATUS_EXPIRED ?? "Expirada")
        : t.ADMINS.INVITATIONS.STATUS_PENDING;
    return { color, label };
  };

  return (
    <section className={STYLES.section}>
      <header className="flex items-center justify-between">
        <h2 className={STYLES.title}>{t.ADMINS.INVITATIONS.SECTION_TITLE}</h2>
        <CreateInvitationModal />
      </header>

      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Pending invitations" className="min-w-150">
            <Table.Header>
              <Table.Column isRowHeader>{t.ADMINS.INVITATIONS.COL_EMAIL}</Table.Column>
              <Table.Column>{t.ADMINS.INVITATIONS.COL_SENT}</Table.Column>
              <Table.Column>{t.ADMINS.INVITATIONS.COL_EXPIRES}</Table.Column>
              <Table.Column>{t.ADMINS.INVITATIONS.COL_STATUS}</Table.Column>
              <Table.Column>{t.ADMINS.INVITATIONS.COL_ACTIONS}</Table.Column>
            </Table.Header>
            <Table.Body
              renderEmptyState={() => (
                <EmptyState className="flex h-full w-full flex-col items-center justify-center gap-4 text-center">
                  <Inbox className="size-6 text-muted" />
                  <span className="text-sm text-muted">{t.ADMINS.INVITATIONS.EMPTY_TITLE}</span>
                </EmptyState>
              )}
            >
              {invitations.map((inv) => {
                const { color, label } = getStatusInfo(inv);
                return (
                  <Table.Row key={inv.id}>
                    <Table.Cell>{inv.email}</Table.Cell>
                    <Table.Cell>{formatDate(inv.createdAt)}</Table.Cell>
                    <Table.Cell>{formatDate(inv.expiresAt)}</Table.Cell>
                    <Table.Cell>
                      <Chip variant="soft" color={color}>
                        {label}
                      </Chip>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex gap-2">
                        <Button
                          isIconOnly
                          size="sm"
                          variant="ghost"
                          isDisabled={isResending === inv.id}
                          onPress={() => onResend(inv.id)}
                          aria-label={t.ADMINS.INVITATIONS.ACTION_RESEND}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <RotateCcw className="size-4" />
                        </Button>
                        <Button
                          isIconOnly
                          size="sm"
                          variant="ghost"
                          isDisabled={isRevoking === inv.id}
                          onPress={() => onRevoke(inv.id)}
                          aria-label={t.ADMINS.INVITATIONS.ACTION_REVOKE}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="size-4" />
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </section>
  );
};

function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
