"use client";

import { useI18n } from "@/locales";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useI18n();

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-8 text-gray-800">
      <div className="flex flex-col items-center rounded-xl bg-gray-50 p-12 text-center shadow-sm border border-gray-100" role="alert">
        <h2 className="mb-4 text-3xl font-semibold text-gray-900">
          {t.COMMON.STATUS.ERROR_TITLE}
        </h2>
        <p className="mb-8 text-gray-600">
          {t.COMMON.STATUS.ERROR_MESSAGE}
        </p>
        <button
          type="button"
          onClick={() => {
            reset();
            window.location.reload();
          }}
          className="rounded-md bg-gray-800 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-700"
        >
          {t.COMMON.STATUS.TRY_AGAIN}
        </button>
      </div>
    </div>
  );
}
