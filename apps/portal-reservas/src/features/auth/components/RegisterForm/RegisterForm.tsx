"use client";

import { Button, FieldError, Form, InputGroup, Label, TextField } from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/config/routes";
import { PasswordStrengthChecklist } from "@/features/auth/components/PasswordStrengthChecklist/PasswordStrengthChecklist";
import { useRegisterForm } from "@/features/auth/hooks/useRegisterForm";
import { useI18n } from "@/locales";
import { REGISTER_FORM_FIELDS } from "@/features/auth/constants/registerFormFields";
import {
  AUTOCOMPLETE as AC,
  ARIA_ROLES as AR,
  BUTTON_UI as BU,
  INPUT_TYPES as IT,
  FALLBACK_TEXTS as FT,
} from "@/features/auth/constants/ui";
import {
  REGISTER_THEME_STYLES as AS,
  AUTH_BACKGROUND_IMAGE,
  REGISTER_FORM_STYLES as RS,
} from "./RegisterForm.styles";

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
    <main className={AS.main}>
      <div className={AS.background}>
        <div className={AS.bgImage} style={{ backgroundImage: AUTH_BACKGROUND_IMAGE }} />
        <div className={AS.bgOverlay} />
        <div className={AS.bgGradient} />
      </div>

      <div className={AS.card}>
        <div className={RS.header}>
          <h1 className={AS.title}>{t.AUTH.REGISTER.TITLE}</h1>
          <p className={AS.subtitle}>{t.AUTH.REGISTER.SUBTITLE || FT.REGISTER_SUBTITLE}</p>
        </div>

        <Form action={formAction} className={AS.form}>
          <TextField
            name={REGISTER_FORM_FIELDS.FULL_NAME}
            autoComplete={AC.NAME}
            isInvalid={!!fullNameError}
            className={RS.fieldWrapper}
          >
            <Label className={AS.label}>{t.AUTH.REGISTER.FULL_NAME_LABEL}</Label>
            <InputGroup>
              <InputGroup.Input
                placeholder={t.AUTH.REGISTER.FULL_NAME_PLACEHOLDER}
                className={AS.input}
              />
            </InputGroup>
            {fullNameError && (
              <FieldError className={AS.error}>{t.AUTH.VALIDATION[fullNameError]}</FieldError>
            )}
          </TextField>

          <TextField
            name={REGISTER_FORM_FIELDS.EMAIL}
            type={IT.EMAIL}
            autoComplete={AC.EMAIL}
            isInvalid={!!emailError}
            onChange={markDirty}
            className={RS.fieldWrapper}
          >
            <Label className={AS.label}>{t.AUTH.REGISTER.EMAIL_LABEL}</Label>
            <InputGroup>
              <InputGroup.Input
                placeholder={t.AUTH.REGISTER.EMAIL_PLACEHOLDER}
                className={AS.input}
              />
            </InputGroup>
            {emailError && (
              <FieldError className={AS.error}>{t.AUTH.VALIDATION[emailError]}</FieldError>
            )}
          </TextField>

          <div className={RS.fieldWrapper}>
            <TextField
              name={REGISTER_FORM_FIELDS.PASSWORD}
              type={showPassword ? IT.TEXT : IT.PASSWORD}
              autoComplete={AC.NEW_PASSWORD}
              isInvalid={!!passwordError}
              value={password}
              onChange={handlePasswordChange}
              className="flex flex-col gap-2"
            >
              <Label className={AS.label}>{t.AUTH.REGISTER.PASSWORD_LABEL}</Label>
              <InputGroup>
                <InputGroup.Input
                  placeholder={t.AUTH.REGISTER.PASSWORD_PLACEHOLDER}
                  className={AS.input}
                />
                <InputGroup.Suffix className={RS.passwordSuffix}>
                  <Button
                    isIconOnly
                    variant={BU.VARIANT_GHOST}
                    size={BU.SIZE_SM}
                    aria-label={
                      showPassword ? t.AUTH.REGISTER.HIDE_PASSWORD : t.AUTH.REGISTER.SHOW_PASSWORD
                    }
                    onPress={handleTogglePassword}
                    className={RS.passwordToggleBtn}
                  >
                    {showPassword ? (
                      <EyeOff className={RS.eyeIcon} />
                    ) : (
                      <Eye className={RS.eyeIcon} />
                    )}
                  </Button>
                </InputGroup.Suffix>
              </InputGroup>
              {passwordError && (
                <FieldError className={AS.error}>{t.AUTH.VALIDATION[passwordError]}</FieldError>
              )}
            </TextField>
            {password.length > 0 && <PasswordStrengthChecklist criteria={criteria} />}
          </div>

          <TextField
            name={REGISTER_FORM_FIELDS.CONFIRM_PASSWORD}
            type={showConfirmPassword ? IT.TEXT : IT.PASSWORD}
            autoComplete={AC.NEW_PASSWORD}
            isInvalid={!!confirmPasswordError}
            onChange={markDirty}
            className={RS.fieldWrapper}
          >
            <Label className={AS.label}>{t.AUTH.REGISTER.CONFIRM_PASSWORD_LABEL}</Label>
            <InputGroup>
              <InputGroup.Input
                placeholder={t.AUTH.REGISTER.CONFIRM_PASSWORD_PLACEHOLDER}
                className={AS.input}
              />
              <InputGroup.Suffix className={RS.passwordSuffix}>
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
                  className={RS.passwordToggleBtn}
                >
                  {showConfirmPassword ? (
                    <EyeOff className={RS.eyeIcon} />
                  ) : (
                    <Eye className={RS.eyeIcon} />
                  )}
                </Button>
              </InputGroup.Suffix>
            </InputGroup>
            {confirmPasswordError && (
              <FieldError className={AS.error}>
                {t.AUTH.VALIDATION[confirmPasswordError]}
              </FieldError>
            )}
          </TextField>

          {globalError && (
            <p role={AR.ALERT} className={AS.error}>
              {t.AUTH.ERRORS[globalError]}
            </p>
          )}

          <div className={RS.actionsWrapper}>
            <Button
              type={IT.SUBMIT}
              isPending={isPending}
              isDisabled={isSubmitDisabled}
              className={AS.submitBtn}
            >
              {isPending ? t.AUTH.REGISTER.SUBMITTING_BUTTON : t.AUTH.REGISTER.SUBMIT_BUTTON}
            </Button>
          </div>

          <Link href={ROUTES.AUTH.LOGIN} className={AS.link}>
            {t.AUTH.REGISTER.LOGIN_LINK}
          </Link>
        </Form>
      </div>
    </main>
  );
};
