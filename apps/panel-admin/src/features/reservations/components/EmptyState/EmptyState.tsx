"use client";

import { useI18n } from "@/locales";
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
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
      <p className={S.title}>{t.RESERVATIONS.EMPTY.TITLE}</p>
      <p className={S.description}>{t.RESERVATIONS.EMPTY.DESCRIPTION}</p>
    </div>
  );
};
