"use client";

import { Button } from "@heroui/react";
import { useI18n } from "@/locales";
import { STATUS_I18N_KEY } from "../../../constants/status-i18n";
import type { StatusPillProps } from "./StatusPill.interface";
import { STATUS_PILL_STYLES as S, STATUS_DOT_COLOR } from "./StatusPill.styles";

export const StatusPill = ({ status, isOn, count, onStatusToggle }: StatusPillProps) => {
  const { t } = useI18n();
  const handlePress = () => onStatusToggle(status);

  return (
    <Button
      variant="ghost"
      aria-pressed={isOn}
      className={`${S.pill} ${isOn ? S.pillActive : S.pillInactive}`}
      onPress={handlePress}
    >
      <span className={`${S.pillStatusDot} ${STATUS_DOT_COLOR[status]}`} />
      {t.RESERVATIONS.STATUS[STATUS_I18N_KEY[status]]}
      <span className={S.pillCount}>{count}</span>
    </Button>
  );
};
