export type AuthTexts = {
  REGISTER: {
    TITLE: string;
    FULL_NAME_LABEL: string;
    FULL_NAME_PLACEHOLDER: string;
    EMAIL_LABEL: string;
    EMAIL_PLACEHOLDER: string;
    PASSWORD_LABEL: string;
    PASSWORD_PLACEHOLDER: string;
    CONFIRM_PASSWORD_LABEL: string;
    CONFIRM_PASSWORD_PLACEHOLDER: string;
    SHOW_PASSWORD: string;
    HIDE_PASSWORD: string;
    SHOW_CONFIRM_PASSWORD: string;
    HIDE_CONFIRM_PASSWORD: string;
    SUBMIT_BUTTON: string;
    SUBMITTING_BUTTON: string;
  };
  LOGIN: {
    TITLE: string;
    SUBTITLE: string;
    EMAIL_LABEL: string;
    EMAIL_PLACEHOLDER: string;
    PASSWORD_LABEL: string;
    PASSWORD_PLACEHOLDER: string;
    PASSWORD_HINT: string;
    SUBMIT_BUTTON: string;
    SUBMITTING_BUTTON: string;
    REGISTER_LINK: string;
    SHOW_PASSWORD: string;
    HIDE_PASSWORD: string;
    OR: string;
    CONTINUE_WITH_GOOGLE: string;
    LOADING: string;
  };
 
  VERIFY_EMAIL: {
    TITLE: string;
    DESCRIPTION: string;
    BACK_TO_LOGIN: string;
  };
  VALIDATION: {
    FULL_NAME_TOO_SHORT: string;
    INVALID_EMAIL: string;
    PASSWORD_TOO_SHORT: string;
    PASSWORDS_DO_NOT_MATCH: string;
  };
  ERRORS: {
    EMAIL_ALREADY_REGISTERED: string;
    UNKNOWN_ERROR: string;
    INVALID_CREDENTIALS: string;
    EMAIL_NOT_CONFIRMED: string;
    AUTH_ERROR_TITLE: string;
    AUTH_ERROR_CODE: string;
    BACK_TO_LOGIN: string;
    ERROR_BOUNDARY_TITLE: string;
    TRY_AGAIN: string;
  };
};
