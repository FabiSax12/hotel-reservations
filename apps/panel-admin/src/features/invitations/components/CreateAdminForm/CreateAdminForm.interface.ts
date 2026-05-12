import type { CreateAdminActionState } from "../../domain/adminInvite";

export interface CreateAdminFormProps {
  action: (
    prevState: CreateAdminActionState,
    formData: FormData,
  ) => Promise<CreateAdminActionState>;
}
