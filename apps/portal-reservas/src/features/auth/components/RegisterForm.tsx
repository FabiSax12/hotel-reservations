"use client";

import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { useRegisterForm } from "@/features/auth/hooks/useRegisterForm";
import { useI18n } from "@/locales";
import { AUTH_FORM_STYLES as S } from "@/features/auth/theme/auth.theme";

export const RegisterForm = () => {
  const { t } = useI18n();
  const {
    formAction,
    isPending,
    showPassword,
    showConfirmPassword,
    handleTogglePassword,
    handleToggleConfirmPassword,
    fullNameError,
    emailError,
    passwordError,
    confirmPasswordError,
    globalError,
  } = useRegisterForm();

  return (
    <div className={S.pageWrapper}>
      <div className={S.card}>
        <h1 className={S.heading}>{t.AUTH.REGISTER.TITLE}</h1>

        <Form action={formAction} className={S.form}>
          <TextField name="fullName" autoComplete="name" isInvalid={!!fullNameError} fullWidth>
            <Label>{t.AUTH.REGISTER.FULL_NAME_LABEL}</Label>
            <Input placeholder={t.AUTH.REGISTER.FULL_NAME_PLACEHOLDER} />
            {fullNameError && <FieldError>{t.AUTH.VALIDATION[fullNameError]}</FieldError>}
          </TextField>

          <TextField
            name="email"
            type="email"
            autoComplete="email"
            isInvalid={!!emailError}
            fullWidth
          >
            <Label>{t.AUTH.REGISTER.EMAIL_LABEL}</Label>
            <Input placeholder={t.AUTH.REGISTER.EMAIL_PLACEHOLDER} />
            {emailError && <FieldError>{t.AUTH.VALIDATION[emailError]}</FieldError>}
          </TextField>

          <TextField
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            isInvalid={!!passwordError}
            fullWidth
          >
            <Label>{t.AUTH.REGISTER.PASSWORD_LABEL}</Label>
            <div className={S.passwordFieldWrapper}>
              <Input placeholder={t.AUTH.REGISTER.PASSWORD_PLACEHOLDER} className={S.passwordInput} />
              <Button
                isIconOnly
                variant="ghost"
                size="sm"
                aria-label={
                  showPassword ? t.AUTH.REGISTER.HIDE_PASSWORD : t.AUTH.REGISTER.SHOW_PASSWORD
                }
                onPress={handleTogglePassword}
                className={S.passwordToggleBtn}
              >
                {showPassword ? "🙈" : "👁"}
              </Button>
            </div>
            {passwordError && <FieldError>{t.AUTH.VALIDATION[passwordError]}</FieldError>}
          </TextField>

          <TextField
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="new-password"
            isInvalid={!!confirmPasswordError}
            fullWidth
          >
            <Label>{t.AUTH.REGISTER.CONFIRM_PASSWORD_LABEL}</Label>
            <div className={S.passwordFieldWrapper}>
              <Input placeholder={t.AUTH.REGISTER.CONFIRM_PASSWORD_PLACEHOLDER} className={S.passwordInput} />
              <Button
                isIconOnly
                variant="ghost"
                size="sm"
                aria-label={
                  showConfirmPassword
                    ? t.AUTH.REGISTER.HIDE_CONFIRM_PASSWORD
                    : t.AUTH.REGISTER.SHOW_CONFIRM_PASSWORD
                }
                onPress={handleToggleConfirmPassword}
                className={S.passwordToggleBtn}
              >
                {showConfirmPassword ? "🙈" : "👁"}
              </Button>
            </div>
            {confirmPasswordError && (
              <FieldError>{t.AUTH.VALIDATION[confirmPasswordError]}</FieldError>
            )}
          </TextField>

          {globalError && (
            <p role="alert" className={S.globalError}>
              {t.AUTH.ERRORS[globalError]}
            </p>
          )}

          <Button type="submit" variant="primary" fullWidth isPending={isPending} className={S.submitBtn}>
            {isPending ? t.AUTH.REGISTER.SUBMITTING_BUTTON : t.AUTH.REGISTER.SUBMIT_BUTTON}
          </Button>
        </Form>
      </div>
    </div>
  );
};
