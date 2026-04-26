"use client";

import { ActivationLoading, ActivationPasswordForm, ActivationSuccess, ActivationTokenError } from "@/features/auth/components";
import { ACTIVATION_ERRORS, isActivateSuccess, isVerifySuccess } from "@/features/auth/domain/adminActivation";
import { useActivationToken } from "@/features/auth/hooks/useActivationToken";
import { useAdminActivation } from "@/features/auth/hooks/useAdminActivation";

export const ActivateAdminForm = () => {
  const { tokens, verifyState, isVerifying } = useActivationToken();
  const { activateState, activateFormAction, isPending } = useAdminActivation();

  if (isVerifying || verifyState === null) return <ActivationLoading />;

  if (!isVerifySuccess(verifyState)) return <ActivationTokenError errorKey={verifyState.error} />;

  if (isActivateSuccess(activateState)) return <ActivationSuccess />;

  if (tokens === null) return <ActivationTokenError errorKey={ACTIVATION_ERRORS.INVALID_TOKEN} />;

  return (
    <ActivationPasswordForm
      tokens={tokens}
      action={activateFormAction}
      isPending={isPending}
      activateState={activateState}
    />
  );
};
