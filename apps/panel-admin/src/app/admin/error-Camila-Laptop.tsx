"use client";

import { useEffect } from "react";
import { useI18n } from "@/locales";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useI18n();

  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-50 p-6" role="alert">
      <h2 className="text-3xl font-bold text-neutral-900 mb-4">{t.COMMON.STATUS.ERROR.TITLE}</h2>
      <p className="text-lg text-neutral-600 mb-8">{t.COMMON.STATUS.ERROR.MESSAGE}</p>
      <button
        onClick={() => {
          reset();
          window.location.reload();
        }}
        className="px-6 py-3 bg-neutral-900 text-neutral-50 rounded-md hover:bg-neutral-800 transition-colors font-medium"
        type="button"
      >
        {t.COMMON.STATUS.ERROR.RETRY}
      </button>
    </div>
  );
}
