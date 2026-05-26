import { forbidden } from "next/navigation";
import { AdminsTableView } from "@/features/admins-table/components/AdminsTableView/AdminsTableView";
import { getAdmins } from "@/features/admins-table/services/getAdmins";
import { AuthenticationRequiredError, PermissionDeniedError } from "@/shared/auth/errors";

export default async function AdminsPage() {
  try {
    const admins = await getAdmins();

    return <AdminsTableView admins={admins} />;
  } catch (e) {
    if (e instanceof AuthenticationRequiredError || e instanceof PermissionDeniedError) {
      forbidden();
    }

    throw e;
  }
}
