import { createAdminAccountAction } from "@/features/auth/services/createAdminAccountAction";
import { CreateAdminForm } from "../../../../features/auth/components/CreateAdminForm";

export default function NewStaffPage() {
  return <CreateAdminForm action={createAdminAccountAction} />;
}
