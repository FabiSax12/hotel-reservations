"use client";

import { useState, useCallback } from "react";
import { Copy, Check } from "lucide-react";
import { useI18n } from "@/locales";
import { COPY_EMAIL_RESET_MS, COPY_EMAIL_ICON_SIZE } from "../../../constants/administrators.constants";
import { COPY_EMAIL_BUTTON_STYLES as STYLE } from "./CopyEmailButton.styles";
import type { CopyEmailButtonProps } from "./CopyEmailButton.interfaces";

export const CopyEmailButton = ({ email }: CopyEmailButtonProps) => {
  const { t }             = useI18n();
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), COPY_EMAIL_RESET_MS);
  }, [email]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={t.ADMINISTRATORS.TABLE.COPY_EMAIL}
      title={t.ADMINISTRATORS.TABLE.COPY_EMAIL}
      className={copied ? STYLE.buttonCopied : STYLE.button}
    >
      {copied
        ? <Check size={COPY_EMAIL_ICON_SIZE} className={STYLE.icon} />
        : <Copy  size={COPY_EMAIL_ICON_SIZE} className={STYLE.icon} />
      }
    </button>
  );
};
