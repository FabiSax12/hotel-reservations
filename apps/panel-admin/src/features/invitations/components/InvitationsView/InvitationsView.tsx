"use client";

import { useCallback } from "react";
import { useI18n } from "@/locales";
import { useInvitationActions } from "../../hooks/useInvitationActions";
import { useInvitationsState } from "../../hooks/useInvitationsState";
import { mapInvitationsToListItems } from "../../utils/mapInvitationsToListItems";
import { InvitationHistoryTable } from "../InvitationHistoryTable/InvitationHistoryTable";
import { PendingInvitationsTable } from "../PendingInvitationsTable/PendingInvitationsTable";
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
          onCreateSuccess={refreshInvitations}
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
