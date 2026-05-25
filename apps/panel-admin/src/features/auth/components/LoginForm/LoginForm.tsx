"use client";

import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { useId } from "react";
import { createEmailValidator } from "@/features/auth/domain/credentials";
import { useI18n } from "@/locales";
import { LOGIN_FORM_FIELDS } from "../../constants/loginFormFields";
import { useAdminLogin } from "../../hooks/useAdminLogin";
import type { LoginFormProps } from "./LoginForm.interface";
import { LOGIN_FORM_STYLES as STYLES } from "./LoginForm.styles";

export const LoginForm = ({ action }: LoginFormProps) => {
  const { activeError, formAction, isPending } = useAdminLogin(action)
  const { t } = useI18n();

  const emailInputId = useId();
  const passwordInputId = useId();

  const validateEmail = createEmailValidator(t.AUTH.VALIDATION.INVALID_EMAIL);

  return (
    <main className={STYLES.wrapper}>
      <div className={STYLES.card}>
        <h1 className={STYLES.title}>{t.AUTH.LOGIN.TITLE}</h1>

        <Form className={STYLES.form} action={formAction}>
          <TextField
            isRequired
            name={LOGIN_FORM_FIELDS.EMAIL}
            type="email"
            validate={validateEmail}
          >
            <Label htmlFor={emailInputId}>{t.AUTH.LOGIN.EMAIL_LABEL}</Label>
            <Input
              id={emailInputId}
              placeholder={t.AUTH.LOGIN.EMAIL_PLACEHOLDER}
              autoComplete="email"
            />
            <FieldError />
          </TextField>

          <TextField isRequired name={LOGIN_FORM_FIELDS.PASSWORD} type="password">
            <Label htmlFor={passwordInputId}>{t.AUTH.LOGIN.PASSWORD_LABEL}</Label>
            <Input
              id={passwordInputId}
              placeholder={t.AUTH.LOGIN.PASSWORD_PLACEHOLDER}
              autoComplete="current-password"
            />
            <Description>{t.AUTH.LOGIN.PASSWORD_HINT}</Description>
            <FieldError />
          </TextField>

          {activeError && (
            <p role="alert" className={STYLES.errorAlert}>
              {t.AUTH.LOGIN.ERRORS[activeError]}
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
