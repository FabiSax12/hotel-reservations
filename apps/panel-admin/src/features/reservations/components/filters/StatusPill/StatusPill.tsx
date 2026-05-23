"use client";

import { Button } from "@heroui/react";
import { useI18n } from "@/locales";
import { STATUS_PILL_STYLES as STYLES, STATUS_DOT_COLOR } from "./StatusPill.styles";
import { STATUS_I18N_KEY } from "../../../constants/status-i18n";
import type { StatusPillProps } from "./StatusPill.interface";

export const StatusPill = ({ status, isOn, count, onStatusToggle }: StatusPillProps) => {
  const { t } = useI18n();
  const handlePress = () => onStatusToggle(status);

  return (
    <Button
      variant="ghost"
      aria-pressed={isOn}
      className={`${STYLES.pill} ${isOn ? STYLES.pillActive : STYLES.pillInactive}`}
      onPress={handlePress}
    >
      <span className={`${STYLES.pillStatusDot} ${STATUS_DOT_COLOR[status]}`} />
      {t.RESERVATIONS.STATUS[STATUS_I18N_KEY[status]]}
      <span className={STYLES.pillCount}>{count}</span>
    </Button>
  );
};
