import type { Metadata } from "next";
import Link from "next/link";
import { ROUTES } from "@/config/routes";
import { defaultLocale, TRANSLATIONS } from "@/locales";

const t = TRANSLATIONS[defaultLocale];

export const metadata: Metadata = {
  title: t.AUTH.VERIFY_EMAIL.TITLE,
};

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <div className="mb-4 text-5xl" aria-hidden="true">
          ✉️
        </div>

        <h1 className="mb-2 text-2xl font-bold text-gray-900">{t.AUTH.VERIFY_EMAIL.TITLE}</h1>

        <p className="mb-6 text-sm text-gray-600">{t.AUTH.VERIFY_EMAIL.DESCRIPTION}</p>

        <Link
          href={ROUTES.AUTH.LOGIN}
          className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
        >
          {t.AUTH.VERIFY_EMAIL.BACK_TO_LOGIN}
        </Link>
      </div>
    </div>
  );
}
