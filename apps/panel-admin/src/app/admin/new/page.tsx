import { CreateAdminForm } from "@/features/auth/components";
import { createAdminAccountAction } from "@/features/invitations/services/createAdminAccountAction";

export default function NewAdminPage() {
  return <CreateAdminForm action={createAdminAccountAction} />;
}
