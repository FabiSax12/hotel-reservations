"use client";


import { useI18n } from "@/locales";
import { ROUTES } from "@/config/routes";

export default function NotFound() {
  const { t } = useI18n();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-emerald-50 text-emerald-900 p-6">
      <h2 className="text-3xl font-bold mb-4 text-emerald-800">{t.COMMON.STATUS.NOT_FOUND.TITLE}</h2>
      <p className="text-lg text-emerald-700 mb-8">{t.COMMON.STATUS.NOT_FOUND.MESSAGE}</p>
      <a 
        href={ROUTES.HOME} 
        className="px-6 py-3 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors font-medium shadow-sm"
      >
        {t.COMMON.STATUS.NOT_FOUND.RETURN_LINK}
      </a>
    </div>
  );
}
