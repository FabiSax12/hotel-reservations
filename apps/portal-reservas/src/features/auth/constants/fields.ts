export const REGISTER_FIELDS = Object.freeze({
  FULL_NAME: "fullName",
  EMAIL: "email",
  PASSWORD: "password",
  CONFIRM_PASSWORD: "confirmPassword",
} as const);

export const LOGIN_FIELDS = Object.freeze({
  EMAIL: "email",
  PASSWORD: "password",
  CALLBACK_URL: "callbackUrl",
} as const);

export type RegisterField = (typeof REGISTER_FIELDS)[keyof typeof REGISTER_FIELDS];

