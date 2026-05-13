"use client";

import { EmptyState, Table } from "@heroui/react";
import { Inbox } from "lucide-react";
import { CreateInvitationModal } from "@/features/invitations/components/CreateInvitationModal/CreateInvitationModal";
import { useI18n } from "@/locales";
import { PendingInvitationRow } from "../PendingInvitationRow/PendingInvitationRow";
import { getStatusInfo } from "./getStatusInfo";
import type { PendingInvitationsTableProps } from "./PendingInvitationsTable.interface";
import { PENDING_INVITATIONS_SECTION_STYLES as STYLES } from "./PendingInvitationsTable.styles";

export const PendingInvitationsTable = ({
  invitations,
  onRevoke,
  onResend,
  isRevoking,
  isResending,
}: PendingInvitationsTableProps) => {
  const { t } = useI18n();

  return (
    <section className={STYLES.section}>
      <header className={STYLES.headerRow}>
        <h2 className={STYLES.title}>{t.ADMINS.INVITATIONS.SECTION_TITLE}</h2>
        <CreateInvitationModal />
      </header>

      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Pending invitations" className={STYLES.content}>
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
                  <Inbox className="size-6 text-muted" />
                  <span className="text-sm text-muted">{t.ADMINS.INVITATIONS.EMPTY_TITLE}</span>
                </EmptyState>
              )}
            >
              {invitations.map((inv) => (
                <PendingInvitationRow
                  key={inv.id}
                  invitation={inv}
                  onResend={onResend}
                  onRevoke={onRevoke}
                  isResending={isResending}
                  isRevoking={isRevoking}
                  getStatusInfo={getStatusInfo}
                />
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </section>
  );
};
