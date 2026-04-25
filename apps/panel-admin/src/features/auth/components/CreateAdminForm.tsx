"use client";

import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { useActionState } from "react";
import type { CreateAdminActionState } from "@/features/auth/domain/adminInvite";
import { useI18n } from "@/locales";

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

interface CreateAdminFormProps {
  action: (prevState: CreateAdminActionState, formData: FormData) => Promise<CreateAdminActionState>;
}

export const CreateAdminForm = ({ action }: CreateAdminFormProps) => {
  const [state, formAction, isPending] = useActionState<CreateAdminActionState, FormData>(
    action,
    null,
  );
  const { t } = useI18n();
  const { CREATE_ADMIN, VALIDATION, ERRORS } = t.AUTH.ADMIN;

  if (state !== null && "success" in state) {
    return (
      <div
        role="alert"
        className="rounded-md border border-success bg-success-soft px-4 py-3 text-sm text-success"
      >
        {CREATE_ADMIN.SUCCESS_PREFIX} <strong>{state.email}</strong>.
      </div>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-md">
        <h1 className="mb-6 text-2xl font-semibold text-gray-900">{CREATE_ADMIN.TITLE}</h1>

        <Form className="flex flex-col gap-4" action={formAction}>
          <TextField
            isRequired
            name="name"
            type="text"
            validate={(v) => (v.trim().length >= 2 ? null : VALIDATION.NAME_TOO_SHORT)}
          >
            <Label>{CREATE_ADMIN.NAME_LABEL}</Label>
            <Input placeholder={CREATE_ADMIN.NAME_PLACEHOLDER} autoComplete="name" />
            <FieldError />
          </TextField>

          <TextField
            isRequired
            name="email"
            type="email"
            validate={(v) => (EMAIL_REGEX.test(v) ? null : VALIDATION.INVALID_EMAIL)}
          >
            <Label>{CREATE_ADMIN.EMAIL_LABEL}</Label>
            <Input placeholder={CREATE_ADMIN.EMAIL_PLACEHOLDER} autoComplete="email" />
            <FieldError />
          </TextField>

          {state !== null && "error" in state && (
            <p
              role="alert"
              className="rounded-md border border-danger bg-danger-soft px-3 py-2 text-sm text-danger"
            >
              {ERRORS[state.error]}
            </p>
          )}

          <Button type="submit" isDisabled={isPending} fullWidth>
            {isPending ? CREATE_ADMIN.SUBMITTING : CREATE_ADMIN.SUBMIT_BUTTON}
          </Button>
        </Form>
      </div>
    </main>
  );
};
