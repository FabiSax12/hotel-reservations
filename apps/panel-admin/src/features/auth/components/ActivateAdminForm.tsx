"use client";

import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import Link from "next/link";
import { ROUTES } from "@/config/routes";
import { ACTIVATION_FORM_FIELDS } from "@/features/auth/config/activationParams";
import { isActivateSuccess, isVerifySuccess } from "@/features/auth/domain/adminActivation";
import { useActivationToken } from "@/features/auth/hooks/useActivationToken";
import { useAdminActivation } from "@/features/auth/hooks/useAdminActivation";
import { useI18n } from "@/locales";

export const ActivateAdminForm = () => {
  const { t } = useI18n();
  const { ACTIVATE, VALIDATION } = t.AUTH;

  const { tokens, verifyState, isVerifying } = useActivationToken();
  const { activateState, activateFormAction, isPending } = useAdminActivation();

  if (isVerifying || verifyState === null) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-gray-500" aria-live="polite">
          {ACTIVATE.LOADING}
        </p>
      </main>
    );
  }

  if (!isVerifySuccess(verifyState)) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-md">
          <div role="alert" className="flex flex-col gap-3">
            <p className="text-sm text-danger">{ACTIVATE.ERRORS[verifyState.error]}</p>
            <p className="text-sm text-gray-500">{ACTIVATE.ERRORS.CONTACT_ADMIN}</p>
          </div>
        </div>
      </main>
    );
  }

  if (isActivateSuccess(activateState)) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-md">
          <div
            role="status"
            className="flex flex-col gap-4 rounded-md border border-success bg-success-soft px-4 py-3 text-sm text-success"
          >
            <p className="font-semibold">{ACTIVATE.SUCCESS_TITLE}</p>
            <p>{ACTIVATE.SUCCESS_MESSAGE}</p>
          </div>
          <Link
            href={ROUTES.ADMIN.LOGIN}
            className="mt-4 block text-center text-sm text-primary underline"
          >
            {ACTIVATE.SUCCESS_LOGIN_LINK}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-md">
        <h1 className="mb-2 text-2xl font-semibold text-gray-900">{ACTIVATE.TITLE}</h1>
        <p className="mb-6 text-sm text-gray-500">{ACTIVATE.SUBTITLE}</p>

        <Form className="flex flex-col gap-4" action={activateFormAction}>
          <input type="hidden" name={ACTIVATION_FORM_FIELDS.ACCESS_TOKEN} value={tokens?.accessToken ?? ""} />
          <input type="hidden" name={ACTIVATION_FORM_FIELDS.REFRESH_TOKEN} value={tokens?.refreshToken ?? ""} />

          <TextField
            isRequired
            name={ACTIVATION_FORM_FIELDS.PASSWORD}
            type="password"
            validate={(v) => (v.length >= 8 ? null : VALIDATION.PASSWORD_TOO_SHORT)}
          >
            <Label>{ACTIVATE.PASSWORD_LABEL}</Label>
            <Input placeholder={ACTIVATE.PASSWORD_PLACEHOLDER} autoComplete="new-password" />
            <FieldError />
          </TextField>

          <TextField
            isRequired
            name={ACTIVATION_FORM_FIELDS.CONFIRM_PASSWORD}
            type="password"
            validate={(v) => (v.length >= 8 ? null : VALIDATION.PASSWORD_TOO_SHORT)}
          >
            <Label>{ACTIVATE.CONFIRM_PASSWORD_LABEL}</Label>
            <Input
              placeholder={ACTIVATE.CONFIRM_PASSWORD_PLACEHOLDER}
              autoComplete="new-password"
            />
            <FieldError />
          </TextField>

          {activateState !== null && "error" in activateState && (
            <p
              role="alert"
              className="rounded-md border border-danger bg-danger-soft px-3 py-2 text-sm text-danger"
            >
              {ACTIVATE.ERRORS[activateState.error]}
            </p>
          )}

          <Button type="submit" isDisabled={isPending} fullWidth>
            {isPending ? ACTIVATE.SUBMITTING : ACTIVATE.SUBMIT_BUTTON}
          </Button>
        </Form>
      </div>
    </main>
  );
};
