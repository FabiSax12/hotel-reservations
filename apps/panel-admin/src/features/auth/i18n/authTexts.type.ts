import type { LoginErrorKey } from "../domain/credentials";

export type AuthTexts = {
  LOGIN: {
    TITLE: string;
    EMAIL_LABEL: string;
    EMAIL_PLACEHOLDER: string;
    PASSWORD_LABEL: string;
    PASSWORD_PLACEHOLDER: string;
    PASSWORD_HINT: string;
    SUBMIT_BUTTON: string;
    ERRORS: {
      [key in LoginErrorKey]: string;
    };
  };
  ADMIN: {
    CREATE_ADMIN: {
      TITLE: string;
      NAME_LABEL: string;
      NAME_PLACEHOLDER: string;
      EMAIL_LABEL: string;
      EMAIL_PLACEHOLDER: string;
      SUBMIT_BUTTON: string;
      SUBMITTING: string;
      SUCCESS_PREFIX: string;
    };
    VALIDATION: {
      NAME_TOO_SHORT: string;
      INVALID_EMAIL: string;
    };
    ERRORS: {
      EMAIL_ALREADY_INVITED: string;
      UNKNOWN_ERROR: string;
    };
  };
  ACTIVATE: {
    TITLE: string;
    SUBTITLE: string;
    PASSWORD_LABEL: string;
    PASSWORD_PLACEHOLDER: string;
    CONFIRM_PASSWORD_LABEL: string;
    CONFIRM_PASSWORD_PLACEHOLDER: string;
    HIDE_PASSWORD: string;
    SHOW_PASSWORD: string;
    HIDE_CONFIRM_PASSWORD: string;
    SHOW_CONFIRM_PASSWORD: string;
    SUBMIT_BUTTON: string;
    SUBMITTING: string;
    SUCCESS_TITLE: string;
    SUCCESS_MESSAGE: string;
    SUCCESS_LOGIN_LINK: string;
    LOADING: string;
    PASSWORD_CHECKLIST: {
      MIN_LENGTH: string;
      HAS_UPPERCASE: string;
      HAS_LOWERCASE: string;
      HAS_DIGIT: string;
      HAS_SPECIAL_CHAR: string;
    };
    ERRORS: {
      INVALID_TOKEN: string;
      EXPIRED_TOKEN: string;
      PASSWORDS_DONT_MATCH: string;
      UNKNOWN_ERROR: string;
      CONTACT_ADMIN: string;
    };
  };
  VALIDATION: {
    INVALID_EMAIL: string;
    PASSWORD_TOO_SHORT: string;
  };
};
