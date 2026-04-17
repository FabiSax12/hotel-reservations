"use client";

import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { useRegisterForm } from "@/features/auth/hooks/useRegisterForm";
import { useI18n } from "@/locales";

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
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="mb-6 text-2xl font-bold text-gray-900">{t.AUTH.REGISTER.TITLE}</h1>

        <Form action={formAction} className="flex flex-col gap-5">
          <TextField name="fullName" autoComplete="name" isInvalid={!!fullNameError} fullWidth>
            <Label>{t.AUTH.REGISTER.FULL_NAME_LABEL}</Label>
            <Input placeholder={t.AUTH.REGISTER.FULL_NAME_PLACEHOLDER} />
            {fullNameError && (
              <FieldError>{t.AUTH.VALIDATION[fullNameError]}</FieldError>
            )}
          </TextField>

          <TextField name="email" type="email" autoComplete="email" isInvalid={!!emailError} fullWidth>
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
            <div className="relative w-full">
              <Input placeholder={t.AUTH.REGISTER.PASSWORD_PLACEHOLDER} className="pr-10" />
              <Button
                isIconOnly
                variant="ghost"
                size="sm"
                aria-label={showPassword ? t.AUTH.REGISTER.HIDE_PASSWORD : t.AUTH.REGISTER.SHOW_PASSWORD}
                onPress={handleTogglePassword}
                className="absolute inset-y-0 right-0 h-full"
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
            <div className="relative w-full">
              <Input placeholder={t.AUTH.REGISTER.CONFIRM_PASSWORD_PLACEHOLDER} className="pr-10" />
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
                className="absolute inset-y-0 right-0 h-full"
              >
                {showConfirmPassword ? "🙈" : "👁"}
              </Button>
            </div>
            {confirmPasswordError && (
              <FieldError>{t.AUTH.VALIDATION[confirmPasswordError]}</FieldError>
            )}
          </TextField>

          {globalError && (
            <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              {t.AUTH.ERRORS[globalError]}
            </p>
          )}

          <Button type="submit" variant="primary" fullWidth isPending={isPending} className="mt-1">
            {isPending ? t.AUTH.REGISTER.SUBMITTING_BUTTON : t.AUTH.REGISTER.SUBMIT_BUTTON}
          </Button>
        </Form>
      </div>
    </div>
  );
};
