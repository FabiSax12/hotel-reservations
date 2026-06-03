"use client";

import { useMemo } from "react";
import { useAuth } from "@/shared/auth/context/useAuth";
import { APP_ROLES } from "@/shared/constants/roles";
import { SIDEBAR_SECTIONS } from "../constants/sidebarSections";
import type { SidebarSection } from "../types/sidebarSection";

export function useFilteredSidebarSections(): SidebarSection[] {
  const { profile, loading } = useAuth();

  return useMemo(() => {
    if (loading || !profile) {
      return [];
    }

    // Owner sees everything
    if (profile.role === APP_ROLES.OWNER) {
      return SIDEBAR_SECTIONS;
    }

    const userPermissions = profile.permissions ?? [];

    // Filter items within each section
    const filteredSections = SIDEBAR_SECTIONS.map((section) => ({
      ...section,
      items: section.items.filter(
        (item) => !item.requiredPermission || userPermissions.includes(item.requiredPermission),
      ),
    })).filter((section) => section.items.length > 0);

    return filteredSections;
  }, [profile, loading]);
}
