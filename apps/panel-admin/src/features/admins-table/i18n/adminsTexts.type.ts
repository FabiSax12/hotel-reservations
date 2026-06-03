import type { UpdatePermissionError } from "@/features/admins-table/constants/permissionErrors";
import type { PERMISSION_CATEGORY_KEYS } from "@/shared/constants/permissions";
import type { DB_ENUMS } from "../../../../../../packages/db/src/enums/enums.constants";

export type AdminsTexts = {
  PAGE: {
    TITLE_PREFIX: string;
    TITLE_ACCENT: string;
    DESCRIPTION: string;
  };
  TABLE: {
    COL_NAME: string;
    COL_EMAIL: string;
    COL_STATUS: string;
    COL_ROLE: string;
    COL_ACTIONS: string;
    NO_RESULTS: string;
    STATUS_ACTIVE: string;
    STATUS_INACTIVE: string;
  };
  STATS: {
    ACTIVE_LABEL: string;
    ACTIVE_NOTE: string;
    INACTIVE_LABEL: string;
    INACTIVE_NOTE: string;
    TOTAL_LABEL: string;
    TOTAL_NOTE: string;
  };
  EMPTY: {
    TITLE: string;
    DESCRIPTION: string;
  };
  INVITATIONS: {
    SECTION_TITLE: string;
    TAB_PENDING: string;
    TAB_HISTORY: string;
    COL_EMAIL: string;
    COL_SENT: string;
    COL_EXPIRES: string;
    COL_STATUS: string;
    COL_ACTIONS: string;
    COL_INVITED_BY: string;
    STATUS_PENDING: string;
    STATUS_ACCEPTED: string;
    STATUS_REVOKED: string;
    STATUS_EXPIRED: string;
    ACTION_RESEND: string;
    ACTION_RESENDING: string;
    ACTION_REVOKE: string;
    ACTION_REVOKING: string;
    EMPTY_TITLE: string;
    EMPTY_HISTORY: string;
    EMAIL_LABEL: string;
    EMAIL_PLACEHOLDER: string;
    SEND_BUTTON: string;
    INVITE: string;
    ERRORS: {
      INVALID_EMAIL: string;
      EMAIL_ALREADY_INVITED: string;
      USER_ALREADY_EXISTS: string;
      UNKNOWN_ERROR: string;
    };
  };
  PERMISSIONS: {
    TITLE: string;
    COL_PERMISSIONS: string;
    MANAGE_BUTTON: string;
    CATEGORIES: {
      [key in Uppercase<keyof typeof PERMISSION_CATEGORY_KEYS>]: string;
    };
    PERMISSION_LABELS: {
      [key in (typeof DB_ENUMS.user_permission)[keyof typeof DB_ENUMS.user_permission]]: string;
    };
    ERRORS: {
      [key in UpdatePermissionError]: string;
    };
    SUCCESS: string;
  };
};
