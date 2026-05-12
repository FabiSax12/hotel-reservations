import type { CreateInvitationActionState } from "../../domain/invitation.types";

export interface InviteAdminFormProps {
  formAction: (
    prevState: CreateInvitationActionState,
    formData: FormData,
  ) => Promise<CreateInvitationActionState>;
}
