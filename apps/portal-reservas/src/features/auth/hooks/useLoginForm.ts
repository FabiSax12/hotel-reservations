"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { CALLBACK_SEARCH_PARAMS } from "../constants/callback-search-params";
import { EMPTY_STRING } from "../constants/common";
import { AUTH_LOG_MESSAGES as LOG } from "../constants/log-messages";
import { signInWithGoogle } from "../services/oauthService";

export const useLoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get(CALLBACK_SEARCH_PARAMS.CALLBACK_URL) || EMPTY_STRING;
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle(callbackUrl);
    } catch (error) {
      console.error(LOG.GOOGLE_OAUTH_ERROR, error);
    }
  };

  return {
    callbackUrl,
    showPassword,
    handleTogglePassword,
    handleGoogleLogin,
  };
};
