"use client";

import type { PendingInvitation } from "@hotel/db";
import { useCallback, useState } from "react";
import { PendingInvitationsTable } from "@/features/admins-table/components/PendingInvitationsTable/PendingInvitationsTable";
import type { InvitationListItem } from "@/features/admins-table/domain/invitation.types";
import { useInvitationActions } from "@/features/admins-table/hooks/useInvitationActions";
import { InvitationHistoryTable } from "@/features/invitations/components/InvitationHistoryTable/InvitationHistoryTable";
import { useI18n } from "@/locales";
import type { InvitationsViewProps } from "./InvitationsView.interface";

function mapInvitationsToListItems(invitations: PendingInvitation[]): InvitationListItem[] {
  return invitations.map((inv) => ({
    id: inv.id,
    email: inv.email,
    status: inv.status,
    createdAt: inv.created_at,
    expiresAt: inv.expires_at,
  }));
}

export const InvitationsView = ({ invitations }: InvitationsViewProps) => {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<"pending" | "history">("pending");
  const [invitationList, setInvitationList] = useState(invitations);
  const [allInvitations, setAllInvitations] = useState<PendingInvitation[]>([]);

  const refreshInvitations = useCallback(async () => {
    const { getPendingInvitations } = await import("../../services/getPendingInvitations");
    const data = await getPendingInvitations();
    setInvitationList(data);
  }, []);

  const refreshAllInvitations = useCallback(async () => {
    const { getAllInvitations } = await import("../../services/getAllInvitations");
    const data = await getAllInvitations();
    setAllInvitations(data);
  }, []);

  const handleTabChange = useCallback(
    async (tab: "pending" | "history") => {
      setActiveTab(tab);
      if (tab === "history" && allInvitations.length === 0) {
        await refreshAllInvitations();
      }
    },
    [allInvitations.length, refreshAllInvitations],
  );

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
      <div className="mb-4 flex gap-2">
        <button
          type="button"
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "pending"
              ? "bg-primary-100 text-primary-700"
              : "text-gray-600 hover:bg-gray-100"
          }`}
          onClick={() => handleTabChange("pending")}
        >
          {t.ADMINS.INVITATIONS.TAB_PENDING}
        </button>
        <button
          type="button"
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "history"
              ? "bg-primary-100 text-primary-700"
              : "text-gray-600 hover:bg-gray-100"
          }`}
          onClick={() => handleTabChange("history")}
        >
          {t.ADMINS.INVITATIONS.TAB_HISTORY}
        </button>
      </div>

      {activeTab === "pending" ? (
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
