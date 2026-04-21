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
    STAFF: {
      CREATE_ADMIN: {
        TITLE: "Crear administrador",
        NAME_LABEL: "Nombre completo",
        NAME_PLACEHOLDER: "Juan Pérez",
        EMAIL_LABEL: "Correo electrónico",
        EMAIL_PLACEHOLDER: "juan@ejemplo.com",
        SUBMIT_BUTTON: "Enviar invitación",
        SUBMITTING: "Enviando...",
        SUCCESS_PREFIX: "El enlace de activación fue enviado a",
      },
      VALIDATION: {
        NAME_TOO_SHORT: "El nombre debe tener al menos 2 caracteres",
        INVALID_EMAIL: "Ingresá un email válido",
      },
      ERRORS: {
        EMAIL_ALREADY_INVITED: "Este correo ya tiene una invitación pendiente.",
        UNKNOWN_ERROR: "Algo salió mal. Intentá de nuevo.",
      },
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
    STAFF: {
      CREATE_ADMIN: {
        TITLE: "Create administrator",
        NAME_LABEL: "Full name",
        NAME_PLACEHOLDER: "John Doe",
        EMAIL_LABEL: "Email address",
        EMAIL_PLACEHOLDER: "john@example.com",
        SUBMIT_BUTTON: "Send invitation",
        SUBMITTING: "Sending...",
        SUCCESS_PREFIX: "The activation link was sent to",
      },
      VALIDATION: {
        NAME_TOO_SHORT: "Name must be at least 2 characters",
        INVALID_EMAIL: "Please enter a valid email address",
      },
      ERRORS: {
        EMAIL_ALREADY_INVITED: "This email already has a pending invitation.",
        UNKNOWN_ERROR: "Something went wrong. Please try again.",
      },
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
