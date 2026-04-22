"use client";


import { useI18n } from "@/locales";

export default function NotFound() {
  const { t } = useI18n();

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center p-8">
      <div className="flex flex-col items-center rounded-2xl bg-emerald-50/50 p-12 text-center border border-emerald-100 shadow-sm">
        <h2 className="mb-4 text-4xl font-bold text-emerald-950">
          {t.COMMON.STATUS.NOT_FOUND_TITLE}
        </h2>
        <p className="mb-8 text-emerald-800/80">
          {t.COMMON.STATUS.NOT_FOUND_MESSAGE}
        </p>
        <a 
          href="/" 
          className="rounded-lg bg-emerald-900 px-8 py-3 text-sm font-semibold text-emerald-50 transition-colors hover:bg-emerald-800"
        >
          {t.COMMON.STATUS.RETURN_HOME}
        </a>
      </div>
    </div>
  );
}
