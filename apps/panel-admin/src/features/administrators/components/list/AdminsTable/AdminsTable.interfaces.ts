import type { Administrator } from "../../../domain/administrator.types";

export interface AdminsTableProps {
  administrators: Administrator[];
  sessionUserId:  string;
}
