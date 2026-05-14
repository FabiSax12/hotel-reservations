"use client";

import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { useActionState } from "react";
import { useI18n } from "@/locales";
import type { InviteAdminFormProps } from "./InviteAdminForm.interface";
import { INVITE_ADMIN_FORM_STYLES as STYLES } from "./InviteAdminForm.styles";

export const InviteAdminForm = ({ formAction }: InviteAdminFormProps) => {
  const { t } = useI18n();
  const [state, dispatch, isPending] = useActionState(formAction, null);

  const hasError = state !== null && "error" in state;

  return (
    <section className={STYLES.section}>
      <h2 className={STYLES.title}>{t.ADMINS.INVITATIONS.SEND_BUTTON}</h2>
      <Form action={dispatch} className={STYLES.form}>
        <div className={STYLES.inputWrapper}>
          <TextField name="email" type="email" isInvalid={hasError}>
            <Label>{t.ADMINS.INVITATIONS.EMAIL_LABEL}</Label>
            <Input placeholder={t.ADMINS.INVITATIONS.EMAIL_PLACEHOLDER} />
            <FieldError>
              {hasError
                ? t.ADMINS.INVITATIONS.ERRORS[
                    (state as { error: string }).error as keyof typeof t.ADMINS.INVITATIONS.ERRORS
                  ]
                : undefined}
            </FieldError>
          </TextField>
        </div>
        <Button type="submit" isDisabled={isPending}>
          {isPending ? t.ADMINS.INVITATIONS.ACTION_RESENDING : t.ADMINS.INVITATIONS.SEND_BUTTON}
        </Button>
      </Form>
    </section>
  );
};
