import type { CreateInvitationActionState } from "@/features/admins-table/domain/invitation.types";

export interface InviteAdminFormProps {
  formAction: (
    prevState: CreateInvitationActionState,
    formData: FormData,
  ) => Promise<CreateInvitationActionState>;
}
