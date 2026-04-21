"use client";

import { isActivateSuccess, isVerifySuccess } from "@/features/auth/domain/adminActivation";
import { useActivationToken } from "@/features/auth/hooks/useActivationToken";
import { useAdminActivation } from "@/features/auth/hooks/useAdminActivation";
import { ActivationLoading } from "./ActivationLoading";
import { ActivationPasswordForm } from "./ActivationPasswordForm";
import { ActivationSuccess } from "./ActivationSuccess";
import { ActivationTokenError } from "./ActivationTokenError";

export const ActivateAdminForm = () => {
  const { tokens, verifyState, isVerifying } = useActivationToken();
  const { activateState, activateFormAction, isPending } = useAdminActivation();

  if (isVerifying || verifyState === null) return <ActivationLoading />;

  if (!isVerifySuccess(verifyState)) return <ActivationTokenError errorKey={verifyState.error} />;

  if (isActivateSuccess(activateState)) return <ActivationSuccess />;

  return (
    <ActivationPasswordForm
      tokens={tokens}
      action={activateFormAction}
      isPending={isPending}
      activateState={activateState}
    />
  );
};
