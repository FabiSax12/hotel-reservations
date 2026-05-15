"use client";

import { useCallback, useState } from "react";
import { resendInvitation } from "../services/resendInvitation";
import { revokeInvitation } from "../services/revokeInvitation";

export const useInvitationActions = (onSuccess: () => void) => {
  const [isRevoking, setIsRevoking] = useState<string | null>(null);
  const [isResending, setIsResending] = useState<string | null>(null);

  const handleRevoke = useCallback(
    async (id: string) => {
      setIsRevoking(id);
      const result = await revokeInvitation(id);
      setIsRevoking(null);
      if ("success" in result) onSuccess();
    },
    [onSuccess],
  );

  const handleResend = useCallback(
    async (id: string) => {
      setIsResending(id);
      const result = await resendInvitation(id);
      setIsResending(null);
      if ("success" in result) onSuccess();
    },
    [onSuccess],
  );

  return { handleRevoke, handleResend, isRevoking, isResending };
};
