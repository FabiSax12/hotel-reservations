"use client";


import { useI18n } from "@/locales";
import { ROUTES } from "@/config/routes";

export default function NotFound() {
  const { t } = useI18n();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-50 text-neutral-900 p-6">
      <h2 className="text-3xl font-bold mb-4">{t.COMMON.STATUS.NOT_FOUND.TITLE}</h2>
      <p className="text-lg text-neutral-600 mb-8">{t.COMMON.STATUS.NOT_FOUND.MESSAGE}</p>
      <a 
        href={ROUTES.HOME} 
        className="px-6 py-3 bg-neutral-900 text-neutral-50 rounded-md hover:bg-neutral-800 transition-colors font-medium"
      >
        {t.COMMON.STATUS.NOT_FOUND.RETURN_LINK}
      </a>
    </div>
  );
}
