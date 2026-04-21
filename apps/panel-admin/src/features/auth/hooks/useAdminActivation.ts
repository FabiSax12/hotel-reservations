"use client";

import { useActionState } from "react";
import type { ActivateAdminState } from "@/features/auth/domain/adminActivation";
import { activateAdminAction } from "@/features/auth/services/activateAdminAction";

export const useAdminActivation = () => {
  const [activateState, activateFormAction, isPending] = useActionState<ActivateAdminState, FormData>(
    activateAdminAction,
    null,
  );

  return { activateState, activateFormAction, isPending };
};
