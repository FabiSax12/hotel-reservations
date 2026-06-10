"use client";

import type { AdminsList } from "@hotel/db/types";
import { useMemo } from "react";
import type { AdminStatusFilter } from "../components/Filters/AdminsFilters.interface";
import { countAdminStatuses } from "../utils/count-admin-statuses";
import { FILTERS_STATUS } from "../constants/filters-status";

export function useAdminsFiltering(
  admins: AdminsList,
  activeFilter: AdminStatusFilter = FILTERS_STATUS.ALL,
) {
  const statusCounts = useMemo(() => countAdminStatuses(admins), [admins]);

  const filtered = useMemo(() => {
    if (activeFilter === FILTERS_STATUS.ALL) return admins;
    return admins.filter((admin) =>
      activeFilter === FILTERS_STATUS.ACTIVE
        ? admin.is_active
        : !admin.is_active,
    );
  }, [admins, activeFilter]);

  return { statusCounts, filtered };
}
