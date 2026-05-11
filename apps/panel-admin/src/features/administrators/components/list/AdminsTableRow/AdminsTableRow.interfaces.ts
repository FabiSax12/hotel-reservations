import type { Administrator } from "../../../domain/administrator.types";

export interface AdminsTableRowProps {
  admin:         Administrator;
  isSessionUser: boolean;
}
