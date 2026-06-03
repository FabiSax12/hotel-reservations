import type { AdminsList } from "@hotel/db/types";
import type { AdminWithPermissions } from "../../services/permissions";

export interface AdminsTableProps {
  admins: AdminsList;
  onToggle: (adminId: string, currentIsActive: boolean) => void;
  togglingId: string | null;
  onManagePermissions?: (admin: AdminWithPermissions) => void;
}
