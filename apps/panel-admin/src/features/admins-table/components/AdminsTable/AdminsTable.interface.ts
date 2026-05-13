import type { AdminsList } from "@hotel/db/types";

export interface AdminsTableProps {
  admins: AdminsList;
  onToggle: (adminId: string, currentIsActive: boolean) => void;
  togglingId: string | null;
}
