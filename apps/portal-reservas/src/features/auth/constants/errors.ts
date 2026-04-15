export enum AUTH_ERRORS {
  EMAIL_ALREADY_REGISTERED,
  UNKNOWN_ERROR,
}

export const ERROR_MESSAGES = {
  [AUTH_ERRORS.EMAIL_ALREADY_REGISTERED]:
    "Si este email no está registrado, recibirás un correo de verificación.",
  [AUTH_ERRORS.UNKNOWN_ERROR]: "Ocurrió un error inesperado. Intente nuevamente.",
} as const;
