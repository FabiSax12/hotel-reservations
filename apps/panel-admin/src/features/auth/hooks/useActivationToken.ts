"use client";

import { useEffect, useState, useTransition } from "react";
import {
  ACTIVATION_HASH_PARAMS,
  ACTIVATION_INVITE_TYPE,
} from "@/features/auth/config/activationParams";
import { ACTIVATION_ERRORS } from "@/features/auth/domain/adminActivation";
import type { VerifyTokenState } from "@/features/auth/domain/adminActivation";
import { verifyTokenAction } from "@/features/auth/services/verifyTokenAction";

type ActivationTokens = { accessToken: string; refreshToken: string };

export const useActivationToken = () => {
  const [tokens, setTokens] = useState<ActivationTokens | null>(null);
  const [verifyState, setVerifyState] = useState<VerifyTokenState>(null);
  const [isVerifying, startVerifying] = useTransition();

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get(ACTIVATION_HASH_PARAMS.ACCESS_TOKEN) ?? "";
    const refreshToken = params.get(ACTIVATION_HASH_PARAMS.REFRESH_TOKEN) ?? "";
    const type = params.get(ACTIVATION_HASH_PARAMS.TYPE);

    if (!accessToken || type !== ACTIVATION_INVITE_TYPE) {
      setVerifyState({ error: ACTIVATION_ERRORS.INVALID_TOKEN });
      return;
    }

    setTokens({ accessToken, refreshToken });
    startVerifying(async () => {
      const result = await verifyTokenAction(accessToken, refreshToken);
      setVerifyState(result);
    });
  }, []);

  return { tokens, verifyState, isVerifying };
};
