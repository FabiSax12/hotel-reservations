import { InvitationsView } from "@/features/invitations/components/InvitationsView/InvitationsView";
import { createInvitationAction } from "@/features/invitations/services/createInvitationAction";
import { getPendingInvitations } from "@/features/invitations/services/getPendingInvitations";

export default async function Page() {
    const invitations = await getPendingInvitations();

    return <InvitationsView invitations={invitations} createInvitationAction={createInvitationAction} />
}