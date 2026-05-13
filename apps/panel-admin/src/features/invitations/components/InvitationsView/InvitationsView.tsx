"use client";

import { useCallback } from "react";
import { PendingInvitationsTable } from "@/features/admins-table/components/PendingInvitationsTable/PendingInvitationsTable";
import { useInvitationActions } from "@/features/admins-table/hooks/useInvitationActions";
import { InvitationHistoryTable } from "@/features/invitations/components/InvitationHistoryTable/InvitationHistoryTable";
import { useI18n } from "@/locales";
import { useInvitationsState } from "../../hooks/useInvitationsState";
import { mapInvitationsToListItems } from "../../utils/mapInvitationsToListItems";
import type { InvitationsViewProps } from "./InvitationsView.interface";
import { styles, TAB_KEYS } from "./InvitationsView.styles";

export const InvitationsView = ({ invitations }: InvitationsViewProps) => {
  const { t } = useI18n();
  const {
    activeTab,
    invitationList,
    allInvitations,
    refreshInvitations,
    refreshAllInvitations,
    handleTabChange,
  } = useInvitationsState(invitations);

  const { handleRevoke, handleResend, isRevoking, isResending } =
    useInvitationActions(refreshInvitations);

  const handleHistoryResend = useCallback(
    async (id: string) => {
      await handleResend(id);
      await refreshAllInvitations();
    },
    [handleResend, refreshAllInvitations],
  );

  const mappedInvitations = mapInvitationsToListItems(invitationList);

  return (
    <main>
      <div className={styles.container}>
        <button
          type="button"
          className={`${styles.tabButton.base} ${activeTab === TAB_KEYS.PENDING ? styles.tabButton.active : styles.tabButton.inactive}`}
          onClick={() => handleTabChange(TAB_KEYS.PENDING)}
        >
          {t.ADMINS.INVITATIONS.TAB_PENDING}
        </button>
        <button
          type="button"
          className={`${styles.tabButton.base} ${activeTab === TAB_KEYS.HISTORY ? styles.tabButton.active : styles.tabButton.inactive}`}
          onClick={() => handleTabChange(TAB_KEYS.HISTORY)}
        >
          {t.ADMINS.INVITATIONS.TAB_HISTORY}
        </button>
      </div>

      {activeTab === TAB_KEYS.PENDING ? (
        <PendingInvitationsTable
          invitations={mappedInvitations}
          onRevoke={handleRevoke}
          onResend={handleResend}
          isRevoking={isRevoking}
          isResending={isResending}
        />
      ) : (
        <InvitationHistoryTable
          invitations={allInvitations}
          onResend={handleHistoryResend}
          isResending={isResending}
        />
      )}
    </main>
  );
};
