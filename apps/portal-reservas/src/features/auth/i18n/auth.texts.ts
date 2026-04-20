import type { SupportedLocale } from "@hotel/i18n";
import type { AuthTexts } from "./authTexts.type";

export const AUTH_TEXTS: Record<SupportedLocale, AuthTexts> = {
  es: {
    REGISTER: {
      TITLE: "Crear cuenta",
      FULL_NAME_LABEL: "Nombre completo",
      FULL_NAME_PLACEHOLDER: "Juan Pérez",
      EMAIL_LABEL: "Correo electrónico",
      EMAIL_PLACEHOLDER: "juan@ejemplo.com",
      PASSWORD_LABEL: "Contraseña",
      PASSWORD_PLACEHOLDER: "Mínimo 8 caracteres",
      CONFIRM_PASSWORD_LABEL: "Confirmar contraseña",
      CONFIRM_PASSWORD_PLACEHOLDER: "Repetí tu contraseña",
      SHOW_PASSWORD: "Mostrar contraseña",
      HIDE_PASSWORD: "Ocultar contraseña",
      SHOW_CONFIRM_PASSWORD: "Mostrar confirmación de contraseña",
      HIDE_CONFIRM_PASSWORD: "Ocultar confirmación de contraseña",
      SUBMIT_BUTTON: "Crear cuenta",
      SUBMITTING_BUTTON: "Creando cuenta...",
    },
    LOGIN: {
      TITLE: "Iniciar sesión",
      EMAIL_LABEL: "Correo electrónico",
      EMAIL_PLACEHOLDER: "juan@ejemplo.com",
      PASSWORD_LABEL: "Contraseña",
      PASSWORD_PLACEHOLDER: "Ingresá tu contraseña",
      PASSWORD_HINT: "Mínimo 8 caracteres",
      SUBMIT_BUTTON: "Iniciar sesión",
      SUBMITTING_BUTTON: "Iniciando sesión...",
      REGISTER_LINK: "¿No tenés cuenta? Registrate aquí",
      SHOW_PASSWORD: "Mostrar contraseña",
      HIDE_PASSWORD: "Ocultar contraseña",
      OR: "O continuar con",
    },

    VERIFY_EMAIL: {
      TITLE: "Revisá tu bandeja de entrada",
      DESCRIPTION:
        "Te enviamos un enlace de verificación a tu correo. Revisá también la carpeta de spam.",
      BACK_TO_LOGIN: "Volver al inicio de sesión",
    },
    VALIDATION: {
      FULL_NAME_TOO_SHORT: "El nombre debe tener al menos 2 caracteres",
      INVALID_EMAIL: "Ingresá un email válido",
      PASSWORD_TOO_SHORT: "La contraseña debe tener al menos 8 caracteres",
      PASSWORDS_DO_NOT_MATCH: "Las contraseñas no coinciden",
    },
    ERRORS: {
      EMAIL_ALREADY_REGISTERED:
        "Si este email no está registrado, recibirás un correo de verificación.",
      UNKNOWN_ERROR: "Ocurrió un error inesperado. Intentá de nuevo.",
      INVALID_CREDENTIALS: "Email o contraseña incorrectos.",
      EMAIL_NOT_CONFIRMED: "Verificá tu correo antes de iniciar sesión.",
    },
  },
  en: {
    REGISTER: {
      TITLE: "Create account",
      FULL_NAME_LABEL: "Full name",
      FULL_NAME_PLACEHOLDER: "John Doe",
      EMAIL_LABEL: "Email address",
      EMAIL_PLACEHOLDER: "john@example.com",
      PASSWORD_LABEL: "Password",
      PASSWORD_PLACEHOLDER: "At least 8 characters",
      CONFIRM_PASSWORD_LABEL: "Confirm password",
      CONFIRM_PASSWORD_PLACEHOLDER: "Repeat your password",
      SHOW_PASSWORD: "Show password",
      HIDE_PASSWORD: "Hide password",
      SHOW_CONFIRM_PASSWORD: "Show confirm password",
      HIDE_CONFIRM_PASSWORD: "Hide confirm password",
      SUBMIT_BUTTON: "Create account",
      SUBMITTING_BUTTON: "Creating account...",
    },
    LOGIN: {
      TITLE: "Sign in",
      EMAIL_LABEL: "Email address",
      EMAIL_PLACEHOLDER: "john@example.com",
      PASSWORD_LABEL: "Password",
      PASSWORD_PLACEHOLDER: "Enter your password",
      PASSWORD_HINT: "At least 8 characters",
      SUBMIT_BUTTON: "Sign in",
      SUBMITTING_BUTTON: "Signing in...",
      REGISTER_LINK: "Don't have an account? Sign up here",
      SHOW_PASSWORD: "Show password",
      HIDE_PASSWORD: "Hide password",
      OR: "Or continue with",
    },

    VERIFY_EMAIL: {
      TITLE: "Check your inbox",
      DESCRIPTION: "We sent a verification link to your email. Also check your spam folder.",
      BACK_TO_LOGIN: "Back to sign in",
    },
    VALIDATION: {
      FULL_NAME_TOO_SHORT: "Name must be at least 2 characters",
      INVALID_EMAIL: "Please enter a valid email address",
      PASSWORD_TOO_SHORT: "Password must be at least 8 characters",
      PASSWORDS_DO_NOT_MATCH: "Passwords do not match",
    },
    ERRORS: {
      EMAIL_ALREADY_REGISTERED:
        "If this email is not registered, you will receive a verification email.",
      UNKNOWN_ERROR: "An unexpected error occurred. Please try again.",
      INVALID_CREDENTIALS: "Invalid email or password.",
      EMAIL_NOT_CONFIRMED: "Please verify your email before signing in.",
    },
  },
} as const;
