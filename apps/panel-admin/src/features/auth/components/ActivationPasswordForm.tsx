"use client";

import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { ACTIVATION_FORM_FIELDS } from "@/features/auth/constants/activationFormFields";
import type { ActivateAdminState } from "@/features/auth/domain/adminActivation";
import { useI18n } from "@/locales";
import { validatePassword } from "../utils/validatePassword";
import { PASSWORD_VALIDATION_ERRORS } from "../constants/passwordValidationErrors";

interface ActivationPasswordFormProps {
  tokens: { accessToken: string; refreshToken: string };
  action: (payload: FormData) => void;
  isPending: boolean;
  activateState: ActivateAdminState;
}

export const ActivationPasswordForm = ({
  tokens,
  action,
  isPending,
  activateState,
}: ActivationPasswordFormProps) => {
  const { t } = useI18n();
  const { ACTIVATE, VALIDATION } = t.AUTH;

  const handleValidatePassword = (password: string) => {
    const error = validatePassword(password);

    switch (error) {
      case PASSWORD_VALIDATION_ERRORS.TOO_SHORT:
        return VALIDATION.PASSWORD_TOO_SHORT;
      default:
        return null;
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-md">
        <h1 className="mb-2 text-2xl font-semibold text-gray-900">{ACTIVATE.TITLE}</h1>
        <p className="mb-6 text-sm text-gray-500">{ACTIVATE.SUBTITLE}</p>

        <Form className="flex flex-col gap-4" action={action}>
          <input type="hidden" name={ACTIVATION_FORM_FIELDS.ACCESS_TOKEN} value={tokens.accessToken} />
          <input type="hidden" name={ACTIVATION_FORM_FIELDS.REFRESH_TOKEN} value={tokens.refreshToken} />

          <TextField
            isRequired
            name={ACTIVATION_FORM_FIELDS.PASSWORD}
            type="password"
            validate={handleValidatePassword}
          >
            <Label>{ACTIVATE.PASSWORD_LABEL}</Label>
            <Input placeholder={ACTIVATE.PASSWORD_PLACEHOLDER} autoComplete="new-password" />
            <FieldError />
          </TextField>

          <TextField
            isRequired
            name={ACTIVATION_FORM_FIELDS.CONFIRM_PASSWORD}
            type="password"
            validate={handleValidatePassword}
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
