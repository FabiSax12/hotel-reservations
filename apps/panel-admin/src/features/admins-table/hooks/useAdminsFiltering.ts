"use client";

import type { AdminsList } from "@hotel/db/types";
import { useMemo } from "react";
import { countAdminStatuses } from "../utils/count-admin-statuses";

export function useAdminsFiltering(admins: AdminsList) {
  const statusCounts = useMemo(() => countAdminStatuses(admins), [admins]);

  return { statusCounts };
}
