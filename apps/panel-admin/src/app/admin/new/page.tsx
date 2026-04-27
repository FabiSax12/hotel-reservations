import { CreateAdminForm } from "@/features/auth/components";
import { createAdminAccountAction } from "@/features/auth/services/createAdminAccountAction";

export default function NewAdminPage() {
  return <CreateAdminForm action={createAdminAccountAction} />;
}
