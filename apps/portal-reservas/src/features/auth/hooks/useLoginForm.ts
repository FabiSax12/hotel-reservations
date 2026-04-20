"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export const useLoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "";
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  return {
    callbackUrl,
    showPassword,
    handleTogglePassword,
  };
};
