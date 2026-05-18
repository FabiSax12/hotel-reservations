import type { AdminsList } from "@hotel/db/types";

export function countAdminStatuses(admins: AdminsList) {
  const active = admins.filter((admin) => admin.is_active).length;
  const inactive = admins.length - active;
  const total = admins.length;

  return { active, inactive, total };
}
