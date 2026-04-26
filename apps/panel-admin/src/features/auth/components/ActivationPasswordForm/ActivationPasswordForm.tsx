"use client";

import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { ACTIVATION_FORM_FIELDS } from "@/features/auth/constants/activationFormFields";
import { PASSWORD_VALIDATION_ERRORS } from "@/features/auth/constants/passwordValidationErrors";
import { validatePassword } from "@/features/auth/utils/validatePassword";
import { useI18n } from "@/locales";
import type { ActivationPasswordFormProps } from "./ActivationPasswordForm.interface";
import { ACTIVATION_PASSWORD_FORM_STYLES as S } from "./ActivationPasswordForm.styles";

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
  };

  return (
    <main className={S.wrapper}>
      <div className={S.card}>
        <h1 className={S.title}>{ACTIVATE.TITLE}</h1>
        <p className={S.subtitle}>{ACTIVATE.SUBTITLE}</p>

        <Form className={S.form} action={action}>
          <input
            type="hidden"
            name={ACTIVATION_FORM_FIELDS.ACCESS_TOKEN}
            value={tokens.accessToken}
          />
          <input
            type="hidden"
            name={ACTIVATION_FORM_FIELDS.REFRESH_TOKEN}
            value={tokens.refreshToken}
          />

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
            <p role="alert" className={S.errorAlert}>
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
