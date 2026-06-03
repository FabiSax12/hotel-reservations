import { forbidden } from "next/navigation";
import { InvitationsView } from "@/features/invitations/components/InvitationsView/InvitationsView";
import { createInvitationAction } from "@/features/invitations/services/createInvitationAction";
import { getPendingInvitations } from "@/features/invitations/services/getPendingInvitations";
import { AuthenticationRequiredError, PermissionDeniedError } from "@/shared/auth/errors";

export default async function Page() {
  try {
    const invitations = await getPendingInvitations();

    return (
      <InvitationsView invitations={invitations} createInvitationAction={createInvitationAction} />
    );
  } catch (error) {
    if (error instanceof AuthenticationRequiredError || error instanceof PermissionDeniedError) {
      forbidden();
    }

    throw error;
  }
}
