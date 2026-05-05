export const REGISTER_FORM_FIELDS = Object.freeze({
  FULL_NAME: "fullName",
  EMAIL: "email",
  PASSWORD: "password",
  CONFIRM_PASSWORD: "confirmPassword",
} as const);

export type RegisterFormField = (typeof REGISTER_FORM_FIELDS)[keyof typeof REGISTER_FORM_FIELDS];
