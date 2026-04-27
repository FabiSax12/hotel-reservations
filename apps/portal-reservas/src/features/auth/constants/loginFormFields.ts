export const LOGIN_FORM_FIELDS = Object.freeze({
  EMAIL: "email",
  PASSWORD: "password",
  CALLBACK_URL: "callbackUrl",
} as const);

export type LoginFormField = (typeof LOGIN_FORM_FIELDS)[keyof typeof LOGIN_FORM_FIELDS];
