export type AuthTexts = {
  LOGIN: {
    TITLE: string;
    EMAIL_LABEL: string;
    EMAIL_PLACEHOLDER: string;
    PASSWORD_LABEL: string;
    PASSWORD_PLACEHOLDER: string;
    PASSWORD_HINT: string;
    SUBMIT_BUTTON: string;
  };
  STAFF: {
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
    SUBMIT_BUTTON: string;
    SUBMITTING: string;
    SUCCESS_TITLE: string;
    SUCCESS_MESSAGE: string;
    SUCCESS_LOGIN_LINK: string;
    LOADING: string;
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
  ERRORS: {
    INVALID_CREDENTIALS: string;
    ACCESS_DENIED: string;
  };
};
