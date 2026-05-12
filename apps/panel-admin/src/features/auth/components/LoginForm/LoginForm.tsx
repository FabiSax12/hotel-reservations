"use client";

import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { useActionState, useId } from "react";
import type { LoginActionState } from "@/features/auth/domain/credentials";
import { createEmailValidator } from "@/features/auth/domain/credentials";
import { useI18n } from "@/locales";
import { LOGIN_FORM_FIELDS } from "../../constants/loginFormFields";
import type { LoginFormProps } from "./LoginForm.interface";
import { LOGIN_FORM_STYLES as S } from "./LoginForm.styles";

export const LoginForm = ({ action }: LoginFormProps) => {
  const [state, formAction, isPending] = useActionState<LoginActionState, FormData>(action, null);
  const { t } = useI18n();

  const validateEmail = createEmailValidator(t.AUTH.VALIDATION.INVALID_EMAIL);

  const emailInputId = useId();
  const passwordInputId = useId();

  return (
    <main className={S.wrapper}>
      <div className={S.card}>
        <h1 className={S.title}>{t.AUTH.LOGIN.TITLE}</h1>

        <Form className={S.form} action={formAction}>
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

          {state?.error && (
            <p role="alert" className={S.errorAlert}>
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
