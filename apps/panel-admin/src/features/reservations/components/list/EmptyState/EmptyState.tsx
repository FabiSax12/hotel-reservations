"use client";

import { useI18n } from "@/locales";
import { ICON_PATHS } from "../../../constants/reservations-icons";
import { EMPTY_STATE_STYLES as S } from "./EmptyState.styles";

export const EmptyState = () => {
  const { t } = useI18n();
  return (
    <div className={S.wrapper}>
      <svg
        className={S.icon}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d={ICON_PATHS.EMPTY_STATE.path}
        />
      </svg>
      <p className={S.title}>{t.RESERVATIONS.EMPTY.TITLE}</p>
      <p className={S.description}>{t.RESERVATIONS.EMPTY.DESCRIPTION}</p>
    </div>
  );
};
