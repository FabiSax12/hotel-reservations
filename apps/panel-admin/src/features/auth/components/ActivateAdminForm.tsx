"use client";

import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import Link from "next/link";
import { useActionState, useEffect, useState, useTransition } from "react";
import { ROUTES } from "@/config/routes";
import {
  ACTIVATION_HASH_PARAMS,
  ACTIVATION_INVITE_TYPE,
} from "@/features/auth/config/activationParams";
import {
  ACTIVATION_ERRORS,
  isActivateSuccess,
  isVerifySuccess,
} from "@/features/auth/domain/adminActivation";
import type { ActivateAdminState, VerifyTokenState } from "@/features/auth/domain/adminActivation";
import { activateAdminAction } from "@/features/auth/services/activateAdminAction";
import { verifyTokenAction } from "@/features/auth/services/verifyTokenAction";
import { useI18n } from "@/locales";

export const ActivateAdminForm = () => {
  const { t } = useI18n();
  const { ACTIVATE, VALIDATION } = t.AUTH;

  const [tokens, setTokens] = useState<{ accessToken: string; refreshToken: string } | null>(null);
  const [verifyState, setVerifyState] = useState<VerifyTokenState>(null);
  const [isVerifying, startVerifying] = useTransition();

  const [activateState, activateFormAction, isPending] = useActionState<ActivateAdminState, FormData>(
    activateAdminAction,
    null,
  );

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get(ACTIVATION_HASH_PARAMS.ACCESS_TOKEN) ?? "";
    const refreshToken = params.get(ACTIVATION_HASH_PARAMS.REFRESH_TOKEN) ?? "";
    const type = params.get(ACTIVATION_HASH_PARAMS.TYPE);

    if (!accessToken || type !== ACTIVATION_INVITE_TYPE) {
      setVerifyState({ error: ACTIVATION_ERRORS.INVALID_TOKEN });
      return;
    }

    setTokens({ accessToken, refreshToken });
    startVerifying(async () => {
      const result = await verifyTokenAction(accessToken, refreshToken);
      setVerifyState(result);
    });
  }, []);

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
          <input type="hidden" name="access_token" value={tokens?.accessToken ?? ""} />
          <input type="hidden" name="refresh_token" value={tokens?.refreshToken ?? ""} />

          <TextField
            isRequired
            name="password"
            type="password"
            validate={(v) => (v.length >= 8 ? null : VALIDATION.PASSWORD_TOO_SHORT)}
          >
            <Label>{ACTIVATE.PASSWORD_LABEL}</Label>
            <Input placeholder={ACTIVATE.PASSWORD_PLACEHOLDER} autoComplete="new-password" />
            <FieldError />
          </TextField>

          <TextField
            isRequired
            name="confirm_password"
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
