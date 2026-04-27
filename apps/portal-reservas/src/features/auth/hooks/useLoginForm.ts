"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { signInWithGoogle } from "../services/oauthService";

import { CALLBACK_SEARCH_PARAMS } from "../constants/callback-search-params";

export const useLoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl =
    searchParams.get(CALLBACK_SEARCH_PARAMS.CALLBACK_URL) || "";
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle(callbackUrl);
    } catch (error) {
      console.error("Google OAuth error:", error);
    }
  };

  return {
    callbackUrl,
    showPassword,
    handleTogglePassword,
    handleGoogleLogin,
  };
};
