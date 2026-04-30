"use client";

import { useCallback, useState } from "react";
import { COPY_FEEDBACK_DURATION_MS } from "../../constants/timing";

export const useCopyCode = (code: string) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), COPY_FEEDBACK_DURATION_MS);
  }, [code]);

  return { copied, handleCopyCode };
};
