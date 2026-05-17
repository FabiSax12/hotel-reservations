"use client";

import { useCallback, useState } from "react";
import { toggleAdminStatus } from "../services/toggleAdminStatus";

export const useToggleAdminStatus = (onSuccess: () => void) => {
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const handleToggle = useCallback(
    async (adminId: string, currentIsActive: boolean) => {
      setTogglingId(adminId);
      const result = await toggleAdminStatus(adminId, currentIsActive);
      setTogglingId(null);
      if ("success" in result) onSuccess();
    },
    [onSuccess],
  );

  return { handleToggle, togglingId };
};
