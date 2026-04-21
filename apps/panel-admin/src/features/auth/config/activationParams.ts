export const ACTIVATION_HASH_PARAMS = Object.freeze({
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
  TYPE: "type",
} as const);

export const ACTIVATION_INVITE_TYPE = "invite" as const;

export const ACTIVATION_FORM_FIELDS = Object.freeze({
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
  PASSWORD: "password",
  CONFIRM_PASSWORD: "confirm_password",
} as const);
