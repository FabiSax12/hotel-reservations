"use client";

import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { useActionState } from "react";
import type { LoginActionState } from "@/features/auth/domain/credentials";
import { createEmailValidator, createPasswordValidator } from "@/features/auth/domain/credentials";
import { useI18n } from "@/locales";

interface LoginFormProps {
  action: (prevState: LoginActionState, formData: FormData) => Promise<LoginActionState>;
}

export const LoginForm = ({ action }: LoginFormProps) => {
  const [state, formAction, isPending] = useActionState<LoginActionState, FormData>(action, null);
  const { t } = useI18n();

  const validateEmail = createEmailValidator(t.AUTH.VALIDATION.INVALID_EMAIL);
  const validatePassword = createPasswordValidator(t.AUTH.VALIDATION.PASSWORD_TOO_SHORT);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-md">
        <h1 className="mb-6 text-2xl font-semibold text-gray-900">{t.AUTH.LOGIN.TITLE}</h1>

        <Form className="flex flex-col gap-4" action={formAction}>
          <TextField isRequired name="email" type="email" validate={validateEmail}>
            <Label htmlFor="email">{t.AUTH.LOGIN.EMAIL_LABEL}</Label>
            <Input id="email" placeholder={t.AUTH.LOGIN.EMAIL_PLACEHOLDER} autoComplete="email" />
            <FieldError />
          </TextField>

          <TextField isRequired name="password" type="password" validate={validatePassword}>
            <Label htmlFor="password">{t.AUTH.LOGIN.PASSWORD_LABEL}</Label>
            <Input
              id="password"
              placeholder={t.AUTH.LOGIN.PASSWORD_PLACEHOLDER}
              autoComplete="current-password"
            />
            <Description>{t.AUTH.LOGIN.PASSWORD_HINT}</Description>
            <FieldError />
          </TextField>

          {state?.error && (
            <p
              role="alert"
              className="rounded-md border border-danger bg-danger-soft px-3 py-2 text-sm text-danger"
            >
              {t.AUTH.ERRORS[state.error]}
            </p>
          )}

          <Button type="submit" isDisabled={isPending} fullWidth>
            {t.AUTH.LOGIN.SUBMIT_BUTTON}
          </Button>
        </Form>
      </div>
    </main>
  );
};
