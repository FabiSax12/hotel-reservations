import { AdminsTableView } from "@/features/admins-table/components/AdminsTableView/AdminsTableView";
import { getAdmins } from "@/features/admins-table/services/getAdmins";

export default async function AdminsPage() {
  const admins = await getAdmins();

  return (
    <AdminsTableView
      admins={admins}
    />
  );
}
