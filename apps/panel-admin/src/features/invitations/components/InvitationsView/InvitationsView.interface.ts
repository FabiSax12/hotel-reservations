import type { PendingInvitation } from "@hotel/db";
import type { CreateInvitationActionState } from "../../domain/invitation.types";

export interface InvitationsViewProps {
  invitations: PendingInvitation[];
  createInvitationAction: (
    prevState: CreateInvitationActionState,
    formData: FormData,
  ) => Promise<CreateInvitationActionState>;
}
