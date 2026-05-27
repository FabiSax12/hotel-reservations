"use client";

import type { PermissionName } from "@hotel/db/types";
import { useCallback, useEffect, useState } from "react";
import type { AdminWithPermissions, UpdatePermissionsResult } from "../services/permissions";
import { getUserPermissionsService, updateUserPermissions } from "../services/permissions";

export type PermissionDrawerError = Exclude<UpdatePermissionsResult, { success: true }>["error"];

interface UsePermissionDrawerOptions {
  admin: AdminWithPermissions | null;
  onSuccess?: () => void;
  onClose: () => void;
}

interface UsePermissionDrawerReturn {
  selectedPermissions: Set<PermissionName>;
  isSaving: boolean;
  error: PermissionDrawerError | null;
  isLoading: boolean;
  handleTogglePermission: (permission: PermissionName) => void;
  handleSave: () => Promise<void>;
}

export const usePermissionDrawer = ({
  admin,
  onSuccess,
  onClose,
}: UsePermissionDrawerOptions): UsePermissionDrawerReturn => {
  const [selectedPermissions, setSelectedPermissions] = useState<Set<PermissionName>>(
    new Set(admin?.permissions ?? []),
  );
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<PermissionDrawerError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (admin) {
      setIsLoading(true);
      getUserPermissionsService(admin.id)
        .then((permissions) => {
          setSelectedPermissions(new Set(permissions));
          setError(null);
        })
        .catch(() => {
          setSelectedPermissions(new Set());
          setError("UNKNOWN_ERROR");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setSelectedPermissions(new Set());
      setError(null);
    }
  }, [admin]);

  const handleTogglePermission = useCallback((permission: PermissionName) => {
    setSelectedPermissions((prev) => {
      const next = new Set(prev);
      if (next.has(permission)) {
        next.delete(permission);
      } else {
        next.add(permission);
      }
      return next;
    });
  }, []);

  const handleSave = useCallback(async () => {
    if (!admin) return;

    setIsSaving(true);
    setError(null);

    const result = await updateUserPermissions(admin.id, Array.from(selectedPermissions));

    setIsSaving(false);

    if ("error" in result) {
      setError(result.error);
      return;
    }

    onSuccess?.();
    onClose();
  }, [admin, selectedPermissions, onSuccess, onClose]);

  return {
    selectedPermissions,
    isSaving,
    error,
    isLoading,
    handleTogglePermission,
    handleSave,
  };
};
