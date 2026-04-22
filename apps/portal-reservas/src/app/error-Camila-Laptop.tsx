"use client";

import { useEffect } from "react";
import { useI18n } from "@/locales";

export default function ErrorPage({
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-emerald-50 p-6" role="alert">
      <h2 className="text-3xl font-bold text-emerald-800 mb-4">{t.COMMON.STATUS.ERROR.TITLE}</h2>
      <p className="text-lg text-emerald-700 mb-8">{t.COMMON.STATUS.ERROR.MESSAGE}</p>
      <button
        onClick={() => {
          reset();
          window.location.reload();
        }}
        className="px-6 py-3 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors font-medium shadow-sm"
        type="button"
      >
        {t.COMMON.STATUS.ERROR.RETRY}
      </button>
    </div>
  );
}
