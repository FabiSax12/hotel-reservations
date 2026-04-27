"use client";

import { Button, Form } from "@heroui/react";
import { useState } from "react";
import { ACTIVATION_FORM_FIELDS } from "@/features/auth/constants/activationFormFields";
import { checkPasswordCriteria } from "@/features/auth/utils/checkPasswordCriteria";
import { isPasswordValid } from "@/features/auth/utils/isPasswordValid";
import { useI18n } from "@/locales";
import { PasswordInput } from "../PasswordInput/PasswordInput";
import type { ActivationPasswordFormProps } from "./ActivationPasswordForm.interface";
import { ACTIVATION_PASSWORD_FORM_STYLES as S } from "./ActivationPasswordForm.styles";

export const ActivationPasswordForm = ({
  tokens,
  action,
  isPending,
  activateState,
}: ActivationPasswordFormProps) => {
  const { t } = useI18n();
  const { ACTIVATE } = t.AUTH;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const criteria = checkPasswordCriteria(password);
  const isSubmitDisabled = isPending || !isPasswordValid(criteria) || password !== confirmPassword;

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

          <PasswordInput
            name={ACTIVATION_FORM_FIELDS.PASSWORD}
            label={ACTIVATE.PASSWORD_LABEL}
            placeholder={ACTIVATE.PASSWORD_PLACEHOLDER}
            autoComplete="new-password"
            value={password}
            onChange={setPassword}
            criteria={criteria}
            hideLabel={ACTIVATE.HIDE_PASSWORD}
            showLabel={ACTIVATE.SHOW_PASSWORD}
          />

          <PasswordInput
            name={ACTIVATION_FORM_FIELDS.CONFIRM_PASSWORD}
            label={ACTIVATE.CONFIRM_PASSWORD_LABEL}
            placeholder={ACTIVATE.CONFIRM_PASSWORD_PLACEHOLDER}
            autoComplete="new-password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            hideLabel={ACTIVATE.HIDE_CONFIRM_PASSWORD}
            showLabel={ACTIVATE.SHOW_CONFIRM_PASSWORD}
          />

          {activateState !== null && "error" in activateState && (
            <p role="alert" className={S.errorAlert}>
              {ACTIVATE.ERRORS[activateState.error]}
            </p>
          )}

          <Button type="submit" isDisabled={isSubmitDisabled} fullWidth>
            {isPending ? ACTIVATE.SUBMITTING : ACTIVATE.SUBMIT_BUTTON}
          </Button>
        </Form>
      </div>
    </main>
  );
};
