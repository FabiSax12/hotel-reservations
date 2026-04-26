"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Form, TextField, Label, InputGroup, Button } from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";
import { ROUTES } from "@/config/routes";
import { LOGIN_FIELDS } from "@/features/auth/constants/fields";
import type { LoginActionState } from "@/features/auth/domain/credentials";
import { useLoginForm } from "@/features/auth/hooks/useLoginForm";
import { useI18n } from "@/locales";
import { GoogleIcon } from "@/features/auth/components/icons/GoogleIcon";
import { AUTH_STYLES as S, AUTH_BACKGROUND_IMAGE } from "@/features/auth/theme/auth.theme";
import { LOGIN_FORM_STYLES as LS } from "@/features/auth/components/LoginForm/LoginForm.styles";
import type { LoginFormProps } from "@/features/auth/components/LoginForm/LoginForm.interface";

export const LoginForm = ({ action }: LoginFormProps) => {
  const [state, formAction, isPending] = useActionState<LoginActionState, FormData>(action, null);
  const { t } = useI18n();
  const { callbackUrl, showPassword, handleTogglePassword, handleGoogleLogin } = useLoginForm();

  return (
    <main className={S.main}>
      {/* Immersive Background */}
      <div className={S.background}>
        <div 
          className={S.bgImage} 
          style={{ backgroundImage: AUTH_BACKGROUND_IMAGE }} 
        />
        <div className={S.bgOverlay} />
        <div className={S.bgGradient} />
      </div>

      <div className={S.card}>
        <div className={LS.header}>
          <h1 className={S.title}>{t.AUTH.LOGIN.TITLE}</h1>
          <p className={S.subtitle}>{t.AUTH.LOGIN.SUBTITLE}</p>
        </div>

        <Form className={S.form} action={formAction}>
          <input type="hidden" name={LOGIN_FIELDS.CALLBACK_URL} value={callbackUrl} />

          {/* Email Field */}
          <TextField
            id={LOGIN_FIELDS.EMAIL}
            name={LOGIN_FIELDS.EMAIL}
            type="email"
            isRequired
            autoComplete="email"
            className="flex flex-col gap-2"
          >
            <Label className={S.label}>{t.AUTH.LOGIN.EMAIL_LABEL}</Label>
            <InputGroup>
              <InputGroup.Input
                placeholder={t.AUTH.LOGIN.EMAIL_PLACEHOLDER}
                className={S.input}
              />
            </InputGroup>
          </TextField>

          {/* Password Field */}
          <TextField
            id={LOGIN_FIELDS.PASSWORD}
            name={LOGIN_FIELDS.PASSWORD}
            type={showPassword ? "text" : "password"}
            isRequired
            autoComplete="current-password"
            className="flex flex-col gap-2"
          >
            <Label className={S.label}>{t.AUTH.LOGIN.PASSWORD_LABEL}</Label>
            <InputGroup>
              <InputGroup.Input
                placeholder={t.AUTH.LOGIN.PASSWORD_PLACEHOLDER}
                className={S.input}
              />
              <InputGroup.Suffix className="flex items-center pr-1">
                <Button
                  variant="ghost"
                  isIconOnly
                  size="sm"
                  className="min-w-8 h-8 focus:outline-none"
                  type="button"
                  onPress={handleTogglePassword}
                  aria-label={showPassword ? t.AUTH.LOGIN.HIDE_PASSWORD : t.AUTH.LOGIN.SHOW_PASSWORD}
                >
                  {showPassword ? (
                    <EyeOff className="size-4 text-neutral-400" />
                  ) : (
                    <Eye className="size-4 text-neutral-400" />
                  )}
                </Button>
              </InputGroup.Suffix>
            </InputGroup>
          </TextField>

          {state?.error && (
            <p role="alert" className={S.error}>
              {t.AUTH.ERRORS[state.error]}
            </p>
          )}

          <div className={LS.actionsWrapper}>
            <Button 
              type="submit" 
              isPending={isPending}
              className={S.submitBtn}
            >
              {isPending ? t.AUTH.LOGIN.SUBMITTING_BUTTON : t.AUTH.LOGIN.SUBMIT_BUTTON}
            </Button>

            <div className={S.dividerWrapper}>
              <div className={S.dividerLine}>
                <div className={S.dividerStroke} />
              </div>
              <div className={S.dividerTextWrapper}>
                <span className={S.dividerText}>{t.AUTH.LOGIN.OR}</span>
              </div>
            </div>

            <Button
              type="button"
              className={S.googleBtn}
              onPress={handleGoogleLogin}
            >
              <GoogleIcon className={LS.googleIcon} />
              {t.AUTH.LOGIN.CONTINUE_WITH_GOOGLE}
            </Button>
          </div>

          <Link href={ROUTES.AUTH.REGISTER} className={S.link}>
            {t.AUTH.LOGIN.REGISTER_LINK}
          </Link>
        </Form>
      </div>
    </main>
  );
};
