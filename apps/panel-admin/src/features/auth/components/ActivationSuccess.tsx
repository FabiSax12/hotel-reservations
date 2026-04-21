"use client";

import Link from "next/link";
import { ROUTES } from "@/config/routes";
import { useI18n } from "@/locales";

export const ActivationSuccess = () => {
  const { t } = useI18n();
  const { SUCCESS_TITLE, SUCCESS_MESSAGE, SUCCESS_LOGIN_LINK } = t.AUTH.ACTIVATE;

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-md">
        <div
          role="status"
          className="flex flex-col gap-4 rounded-md border border-success bg-success-soft px-4 py-3 text-sm text-success"
        >
          <p className="font-semibold">{SUCCESS_TITLE}</p>
          <p>{SUCCESS_MESSAGE}</p>
        </div>
        <Link
          href={ROUTES.ADMIN.LOGIN}
          className="mt-4 block text-center text-sm text-primary underline"
        >
          {SUCCESS_LOGIN_LINK}
        </Link>
      </div>
    </main>
  );
};
