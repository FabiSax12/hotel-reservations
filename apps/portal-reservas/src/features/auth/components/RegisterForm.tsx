"use client";

import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { Eye, EyeClosed } from "lucide-react";
import { PasswordStrengthChecklist } from "@/features/auth/components/PasswordStrengthChecklist/PasswordStrengthChecklist";
import { useRegisterForm } from "@/features/auth/hooks/useRegisterForm";
import { AUTH_FORM_STYLES as S } from "@/features/auth/theme/auth.theme";
import { useI18n } from "@/locales";
import { REGISTER_FORM_FIELDS } from "../constants/registerFormFields";
import {
  AUTOCOMPLETE as AC,
  ARIA_ROLES as AR,
  BUTTON_UI as BU,
  INPUT_TYPES as IT,
} from "../constants/ui";

export const RegisterForm = () => {
  const { t } = useI18n();
  const {
    formAction,
    isPending,
    showPassword,
    showConfirmPassword,
    handleTogglePassword,
    handleToggleConfirmPassword,
    password,
    handlePasswordChange,
    criteria,
    markDirty,
    isSubmitDisabled,
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
          <TextField
            name={REGISTER_FORM_FIELDS.FULL_NAME}
            autoComplete={AC.NAME}
            isInvalid={!!fullNameError}
            fullWidth
          >
            <Label>{t.AUTH.REGISTER.FULL_NAME_LABEL}</Label>
            <Input placeholder={t.AUTH.REGISTER.FULL_NAME_PLACEHOLDER} />
            {fullNameError && <FieldError>{t.AUTH.VALIDATION[fullNameError]}</FieldError>}
          </TextField>

          <TextField
            name={REGISTER_FORM_FIELDS.EMAIL}
            type={IT.EMAIL}
            autoComplete={AC.EMAIL}
            isInvalid={!!emailError}
            onChange={markDirty}
            fullWidth
          >
            <Label>{t.AUTH.REGISTER.EMAIL_LABEL}</Label>
            <Input placeholder={t.AUTH.REGISTER.EMAIL_PLACEHOLDER} />
            {emailError && <FieldError>{t.AUTH.VALIDATION[emailError]}</FieldError>}
          </TextField>

          <div>
            <TextField
              name={REGISTER_FORM_FIELDS.PASSWORD}
              type={showPassword ? IT.TEXT : IT.PASSWORD}
              autoComplete={AC.NEW_PASSWORD}
              isInvalid={!!passwordError}
              value={password}
              onChange={handlePasswordChange}
              fullWidth
            >
              <Label>{t.AUTH.REGISTER.PASSWORD_LABEL}</Label>
              <div className={S.passwordFieldWrapper}>
                <Input
                  placeholder={t.AUTH.REGISTER.PASSWORD_PLACEHOLDER}
                  className={S.passwordInput}
                />
                <Button
                  isIconOnly
                  variant={BU.VARIANT_GHOST}
                  size={BU.SIZE_SM}
                  aria-label={
                    showPassword ? t.AUTH.REGISTER.HIDE_PASSWORD : t.AUTH.REGISTER.SHOW_PASSWORD
                  }
                  onPress={handleTogglePassword}
                  className={S.passwordToggleBtn}
                >
                  {showPassword ? <EyeClosed /> : <Eye />}
                </Button>
              </div>
              {passwordError && <FieldError>{t.AUTH.VALIDATION[passwordError]}</FieldError>}
            </TextField>
            {password.length > 0 && <PasswordStrengthChecklist criteria={criteria} />}
          </div>

          <TextField
            name={REGISTER_FORM_FIELDS.CONFIRM_PASSWORD}
            type={showConfirmPassword ? IT.TEXT : IT.PASSWORD}
            autoComplete={AC.NEW_PASSWORD}
            isInvalid={!!confirmPasswordError}
            onChange={markDirty}
            fullWidth
          >
            <Label>{t.AUTH.REGISTER.CONFIRM_PASSWORD_LABEL}</Label>
            <div className={S.passwordFieldWrapper}>
              <Input
                placeholder={t.AUTH.REGISTER.CONFIRM_PASSWORD_PLACEHOLDER}
                className={S.passwordInput}
              />
              <Button
                isIconOnly
                variant={BU.VARIANT_GHOST}
                size={BU.SIZE_SM}
                aria-label={
                  showConfirmPassword
                    ? t.AUTH.REGISTER.HIDE_CONFIRM_PASSWORD
                    : t.AUTH.REGISTER.SHOW_CONFIRM_PASSWORD
                }
                onPress={handleToggleConfirmPassword}
                className={S.passwordToggleBtn}
              >
                {showConfirmPassword ? <EyeClosed /> : <Eye />}
              </Button>
            </div>
            {confirmPasswordError && (
              <FieldError>{t.AUTH.VALIDATION[confirmPasswordError]}</FieldError>
            )}
          </TextField>

          {globalError && (
            <p role={AR.ALERT} className={S.globalError}>
              {t.AUTH.ERRORS[globalError]}
            </p>
          )}

          <Button
            type={IT.SUBMIT}
            variant={BU.VARIANT_PRIMARY}
            fullWidth
            isPending={isPending}
            isDisabled={isSubmitDisabled}
            className={S.submitBtn}
          >
            {isPending ? t.AUTH.REGISTER.SUBMITTING_BUTTON : t.AUTH.REGISTER.SUBMIT_BUTTON}
          </Button>
        </Form>
      </div>
    </div>
  );
};
