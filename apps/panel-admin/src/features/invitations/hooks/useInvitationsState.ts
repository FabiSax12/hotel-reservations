"use client";

import type { PendingInvitation } from "@hotel/db";
import { useCallback, useState } from "react";
import type { InvitationsViewProps } from "../components/InvitationsView/InvitationsView.interface";
import { TAB_KEYS, type TabKey } from "../components/InvitationsView/InvitationsView.styles";

export function useInvitationsState(initialInvitations: InvitationsViewProps["invitations"]) {
  const [activeTab, setActiveTab] = useState<TabKey>(TAB_KEYS.PENDING);
  const [invitationList, setInvitationList] = useState(initialInvitations);
  const [allInvitations, setAllInvitations] = useState<PendingInvitation[]>([]);

  const refreshInvitations = useCallback(async () => {
    const { getPendingInvitations } = await import("../services/getPendingInvitations");
    const data = await getPendingInvitations();
    setInvitationList(data);
  }, []);

  const refreshAllInvitations = useCallback(async () => {
    const { getAllInvitations } = await import("../services/getAllInvitations");
    const data = await getAllInvitations();
    setAllInvitations(data);
  }, []);

  const handleTabChange = useCallback(
    async (tab: TabKey) => {
      setActiveTab(tab);
      if (tab === TAB_KEYS.HISTORY && allInvitations.length === 0) {
        await refreshAllInvitations();
      }
    },
    [allInvitations.length, refreshAllInvitations],
  );

  return {
    activeTab,
    invitationList,
    allInvitations,
    refreshInvitations,
    refreshAllInvitations,
    handleTabChange,
  };
}
