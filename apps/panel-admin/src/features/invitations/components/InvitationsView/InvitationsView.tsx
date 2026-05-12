"use client"

import type { PendingInvitation } from "@hotel/db";
import { useCallback, useState } from "react";
import { PendingInvitationsTable } from "@/features/admins-table/components/PendingInvitationsTable/PendingInvitationsTable";
import type { InvitationListItem } from "@/features/admins-table/domain/invitation.types";
import { useInvitationActions } from "@/features/admins-table/hooks/useInvitationActions";
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
    const [invitationList, setInvitationList] = useState(invitations);

    const refreshInvitations = useCallback(async () => {
        const { getPendingInvitations } = await import("../../services/getPendingInvitations");
        const data = await getPendingInvitations();
        setInvitationList(data);
    }, []);

    const { handleRevoke, handleResend, isRevoking, isResending } =
        useInvitationActions(refreshInvitations);

    const mappedInvitations = mapInvitationsToListItems(invitationList);

    return (
        <main>
            <PendingInvitationsTable
                invitations={mappedInvitations}
                onRevoke={handleRevoke}
                onResend={handleResend}
                isRevoking={isRevoking}
                isResending={isResending}
            />
        </main>
    );
};
