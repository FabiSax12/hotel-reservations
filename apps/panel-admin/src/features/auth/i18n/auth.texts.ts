import type { SupportedLocale } from "@hotel/i18n";
import type { AuthTexts } from "./authTexts.type";

export const AUTH_TEXTS: Record<SupportedLocale, AuthTexts> = {
  es: {
    LOGIN: {
      TITLE: "Panel de Administración",
      EMAIL_LABEL: "Email",
      EMAIL_PLACEHOLDER: "juan@ejemplo.com",
      PASSWORD_LABEL: "Contraseña",
      PASSWORD_PLACEHOLDER: "Ingresá tu contraseña",
      PASSWORD_HINT: "Mínimo 8 caracteres",
      SUBMIT_BUTTON: "Iniciar sesión",
    },
    VALIDATION: {
      INVALID_EMAIL: "Ingresá un email válido",
      PASSWORD_TOO_SHORT: "La contraseña debe tener al menos 8 caracteres",
    },
    ERRORS: {
      INVALID_CREDENTIALS: "Credenciales inválidas",
      ACCESS_DENIED: "Acceso denegado",
    },
  },
  en: {
    LOGIN: {
      TITLE: "Administration Panel",
      EMAIL_LABEL: "Email",
      EMAIL_PLACEHOLDER: "john@example.com",
      PASSWORD_LABEL: "Password",
      PASSWORD_PLACEHOLDER: "Enter your password",
      PASSWORD_HINT: "At least 8 characters",
      SUBMIT_BUTTON: "Sign in",
    },
    VALIDATION: {
      INVALID_EMAIL: "Please enter a valid email address",
      PASSWORD_TOO_SHORT: "Password must be at least 8 characters",
    },
    ERRORS: {
      INVALID_CREDENTIALS: "Invalid credentials",
      ACCESS_DENIED: "Access denied",
    },
  },
} as const;
