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
  VALIDATION: {
    INVALID_EMAIL: string;
    PASSWORD_TOO_SHORT: string;
  };
  ERRORS: {
    INVALID_CREDENTIALS: string;
    ACCESS_DENIED: string;
  };
};
