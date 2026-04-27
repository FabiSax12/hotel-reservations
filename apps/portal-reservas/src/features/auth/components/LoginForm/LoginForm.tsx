"use client";
 
import { useActionState } from "react";
import Link from "next/link";
import { Form, TextField, Label, InputGroup, Button } from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";
import { ROUTES } from "@/config/routes";
import { LOGIN_FIELDS } from "@/features/auth/constants/fields";
import { INPUT_TYPES as IT, AUTOCOMPLETE as AC, BUTTON_UI as BU, ARIA_ROLES as AR } from "@/features/auth/constants/ui";
import type { LoginActionState } from "@/features/auth/domain/credentials";
import { useLoginForm } from "@/features/auth/hooks/useLoginForm";
import { useI18n } from "@/locales";
import { GoogleIcon } from "@/features/auth/components/icons/GoogleIcon";
import { AUTH_STYLES as AS, AUTH_BACKGROUND_IMAGE } from "@/features/auth/theme/auth.theme";
import { LOGIN_FORM_STYLES as LS } from "@/features/auth/components/LoginForm/LoginForm.styles";
import type { LoginFormProps } from "@/features/auth/components/LoginForm/LoginForm.interface";
 
export const LoginForm = ({ action }: LoginFormProps) => {
  const [state, formAction, isPending] = useActionState<LoginActionState, FormData>(action, null);
  const { t } = useI18n();
  const { callbackUrl, showPassword, handleTogglePassword, handleGoogleLogin } = useLoginForm();
 
  return (
    <main className={AS.main}>
      <div className={AS.background}>
        <div 
          className={AS.bgImage} 
          style={{ backgroundImage: AUTH_BACKGROUND_IMAGE }} 
        />
        <div className={AS.bgOverlay} />
        <div className={AS.bgGradient} />
      </div>
 
      <div className={AS.card}>
        <div className={LS.header}>
          <h1 className={AS.title}>{t.AUTH.LOGIN.TITLE}</h1>
          <p className={AS.subtitle}>{t.AUTH.LOGIN.SUBTITLE}</p>
        </div>
 
        <Form className={AS.form} action={formAction}>
          <input type={IT.HIDDEN} name={LOGIN_FIELDS.CALLBACK_URL} value={callbackUrl} />
 
          <TextField
            id={LOGIN_FIELDS.EMAIL}
            name={LOGIN_FIELDS.EMAIL}
            type={IT.EMAIL}
            isRequired
            autoComplete={AC.EMAIL}
            className={LS.fieldWrapper}
          >
            <Label className={AS.label}>{t.AUTH.LOGIN.EMAIL_LABEL}</Label>
            <InputGroup>
              <InputGroup.Input
                placeholder={t.AUTH.LOGIN.EMAIL_PLACEHOLDER}
                className={AS.input}
              />
            </InputGroup>
          </TextField>
 
          <TextField
            id={LOGIN_FIELDS.PASSWORD}
            name={LOGIN_FIELDS.PASSWORD}
            type={showPassword ? IT.TEXT : IT.PASSWORD}
            isRequired
            autoComplete={AC.CURRENT_PASSWORD}
            className={LS.fieldWrapper}
          >
            <Label className={AS.label}>{t.AUTH.LOGIN.PASSWORD_LABEL}</Label>
            <InputGroup>
              <InputGroup.Input
                placeholder={t.AUTH.LOGIN.PASSWORD_PLACEHOLDER}
                className={AS.input}
              />
              <InputGroup.Suffix className={LS.passwordSuffix}>
                <Button
                  variant={BU.VARIANT_GHOST}
                  isIconOnly
                  size={BU.SIZE_SM}
                  className={LS.passwordToggleBtn}
                  type={IT.BUTTON}
                  onPress={handleTogglePassword}
                  aria-label={showPassword ? t.AUTH.LOGIN.HIDE_PASSWORD : t.AUTH.LOGIN.SHOW_PASSWORD}
                >
                  {showPassword ? (
                    <EyeOff className={LS.eyeIcon} />
                  ) : (
                    <Eye className={LS.eyeIcon} />
                  )}
                </Button>
              </InputGroup.Suffix>
            </InputGroup>
          </TextField>
 
          {state?.error && (
            <p role={AR.ALERT} className={AS.error}>
              {t.AUTH.ERRORS[state.error]}
            </p>
          )}
 
          <div className={LS.actionsWrapper}>
            <Button 
              type={IT.SUBMIT} 
              isPending={isPending}
              className={AS.submitBtn}
            >
              {isPending ? t.AUTH.LOGIN.SUBMITTING_BUTTON : t.AUTH.LOGIN.SUBMIT_BUTTON}
            </Button>
 
            <div className={AS.dividerWrapper}>
              <div className={AS.dividerLine}>
                <div className={AS.dividerStroke} />
              </div>
              <div className={AS.dividerTextWrapper}>
                <span className={AS.dividerText}>{t.AUTH.LOGIN.OR}</span>
              </div>
            </div>
 
            <Button
              type={IT.BUTTON}
              className={AS.googleBtn}
              onPress={handleGoogleLogin}
            >
              <GoogleIcon className={LS.googleIcon} />
              {t.AUTH.LOGIN.CONTINUE_WITH_GOOGLE}
            </Button>
          </div>
 
          <Link href={ROUTES.AUTH.REGISTER} className={AS.link}>
            {t.AUTH.LOGIN.REGISTER_LINK}
          </Link>
        </Form>
      </div>
    </main>
  );
};
