import { CreateAdminForm } from "@/features/auth/components/CreateAdminForm";
import { createAdminAccountAction } from "@/features/auth/services/createAdminAccountAction";

export default function NewStaffPage() {
  return <CreateAdminForm action={createAdminAccountAction} />;
}
