"use client";

import type { ActivateAdminErrorKey } from "@/features/auth/domain/adminActivation";
import { useI18n } from "@/locales";

interface ActivationTokenErrorProps {
  errorKey: ActivateAdminErrorKey;
}

export const ActivationTokenError = ({ errorKey }: ActivationTokenErrorProps) => {
  const { t } = useI18n();
  const { ERRORS } = t.AUTH.ACTIVATE;

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-md">
        <div role="alert" className="flex flex-col gap-3">
          <p className="text-sm text-danger">{ERRORS[errorKey]}</p>
          <p className="text-sm text-gray-500">{ERRORS.CONTACT_ADMIN}</p>
        </div>
      </div>
    </main>
  );
};
