"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Button, Form } from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";

import { ROUTES } from "@/config/routes";
import { LOGIN_FIELDS } from "../constants/fields";
import type { LoginActionState } from "../domain/credentials";
import { useLoginForm } from "../hooks/useLoginForm";
import { useI18n } from "@/locales";
import { GoogleIcon } from "./icons/GoogleIcon";
import { AUTH_STYLES as S, AUTH_BACKGROUND_IMAGE } from "../theme/auth.theme";

interface LoginFormProps {
  action: (prevState: LoginActionState, formData: FormData) => Promise<LoginActionState>;
}

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
        <div className="mb-10">
          <h1 className={S.title}>{t.AUTH.LOGIN.TITLE}</h1>
          <p className={S.subtitle}>{t.AUTH.LOGIN.SUBTITLE}</p>
        </div>

        <Form className={S.form} action={formAction}>
          <input type="hidden" name={LOGIN_FIELDS.CALLBACK_URL} value={callbackUrl} />

          {/* Email Field */}
          <div className={S.field}>
            <label htmlFor={LOGIN_FIELDS.EMAIL} className={S.label}>
              {t.AUTH.LOGIN.EMAIL_LABEL}
            </label>
            <div className={S.inputWrapper}>
              <input
                id={LOGIN_FIELDS.EMAIL}
                name={LOGIN_FIELDS.EMAIL}
                type="email"
                required
                placeholder={t.AUTH.LOGIN.EMAIL_PLACEHOLDER}
                autoComplete="email"
                className={S.input}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className={S.field}>
            <div className="flex items-center justify-between">
              <label htmlFor={LOGIN_FIELDS.PASSWORD} className={S.label}>
                {t.AUTH.LOGIN.PASSWORD_LABEL}
              </label>
            </div>
            <div className={S.inputWrapper}>
              <input
                id={LOGIN_FIELDS.PASSWORD}
                name={LOGIN_FIELDS.PASSWORD}
                type={showPassword ? "text" : "password"}
                required
                placeholder={t.AUTH.LOGIN.PASSWORD_PLACEHOLDER}
                autoComplete="current-password"
                className={`${S.input} pr-12`}
              />
              <button
                type="button"
                aria-label={showPassword ? t.AUTH.LOGIN.HIDE_PASSWORD : t.AUTH.LOGIN.SHOW_PASSWORD}
                onClick={handleTogglePassword}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-neutral-400 hover:text-emerald-700 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {state?.error && (
            <p role="alert" className={S.error}>
              {t.AUTH.ERRORS[state.error]}
            </p>
          )}

          <div className="flex flex-col gap-4 pt-2">
            <button 
              type="submit" 
              disabled={isPending}
              className={S.submitBtn}
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {t.AUTH.LOGIN.SUBMITTING_BUTTON}
                </span>
              ) : t.AUTH.LOGIN.SUBMIT_BUTTON}
            </button>

            <div className={S.dividerWrapper}>
              <div className={S.dividerLine}>
                <div className={S.dividerStroke} />
              </div>
              <div className={S.dividerTextWrapper}>
                <span className={S.dividerText}>{t.AUTH.LOGIN.OR}</span>
              </div>
            </div>

            <button
              type="button"
              className={S.googleBtn}
              onClick={handleGoogleLogin}
            >
              <GoogleIcon className={S.googleIcon} />
              <span>{t.AUTH.LOGIN.CONTINUE_WITH_GOOGLE}</span>
            </button>
          </div>

          <Link href={ROUTES.AUTH.REGISTER} className={S.link}>
            {t.AUTH.LOGIN.REGISTER_LINK}
          </Link>
        </Form>
      </div>
    </main>
  );
};
