"use client";

import { useI18n } from "@/locales";
import { EMPTY_STATE } from "../constants/styles";

export const EmptyState = () => {
  const { t } = useI18n();
  return (
    <div className={EMPTY_STATE.WRAPPER}>
      <svg
        className={EMPTY_STATE.ICON}
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
      <p className={EMPTY_STATE.TITLE}>{t.RESERVATIONS.EMPTY.TITLE}</p>
      <p className={EMPTY_STATE.DESCRIPTION}>{t.RESERVATIONS.EMPTY.DESCRIPTION}</p>
    </div>
  );
};
