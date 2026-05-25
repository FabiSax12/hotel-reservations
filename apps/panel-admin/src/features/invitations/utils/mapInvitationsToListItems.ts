import type { PendingInvitation } from "@hotel/db";
import type { InvitationListItem } from "../domain/invitation.types";

export function mapInvitationsToListItems(invitations: PendingInvitation[]): InvitationListItem[] {
  return invitations.map((inv) => ({
    id: inv.id,
    email: inv.email,
    status: inv.status,
    createdAt: inv.created_at,
    expiresAt: inv.expires_at,
  }));
}
