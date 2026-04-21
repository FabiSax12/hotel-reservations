"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { signInWithGoogle } from "../services/oauthService";

export const useLoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "";
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
