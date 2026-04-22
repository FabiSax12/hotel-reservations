"use client";

import { useI18n } from "@/locales";

export default function PortalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useI18n();

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center p-8">
      <div className="flex flex-col items-center rounded-2xl bg-emerald-50/50 p-12 text-center border border-emerald-100 shadow-sm" role="alert">
        <h2 className="mb-4 text-3xl font-bold text-emerald-900">
          {t.COMMON.ERRORS.GENERIC}
        </h2>
        <p className="mb-8 text-emerald-800/80">
          {error.message || t.COMMON.ERRORS.GENERIC}
        </p>
        <button
          type="button"
          onClick={reset}
          className="rounded-lg bg-emerald-900 px-8 py-3 text-sm font-semibold text-emerald-50 transition-colors hover:bg-emerald-800"
        >
          {t.COMMON.ACTIONS.CANCEL}
        </button>
      </div>
    </div>
  );
}
