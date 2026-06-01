"use client";

import type { AdminsList } from "@hotel/db/types";
import { useMemo } from "react";
import type { AdminStatusFilter } from "../components/Filters/AdminsFilters.interface";
import { countAdminStatuses } from "../utils/count-admin-statuses";

export function useAdminsFiltering(admins: AdminsList, activeFilter: AdminStatusFilter = "all") {
  const statusCounts = useMemo(() => countAdminStatuses(admins), [admins]);

  const filtered = useMemo(() => {
    if (activeFilter === "all") return admins;
    return admins.filter((admin) =>
      activeFilter === "active" ? admin.is_active : !admin.is_active,
    );
  }, [admins, activeFilter]);

  return { statusCounts, filtered };
}
