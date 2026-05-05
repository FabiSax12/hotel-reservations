export type ReservationsTexts = {
  PAGE: {
    TITLE_PREFIX: string;
    TITLE_ACCENT: string;
    DESCRIPTION: string;
    NEW_RESERVATION: string;
  };
  TABLE: {
    ARIA_LABEL: string;
    COL_CODE: string;
    COL_GUEST: string;
    COL_ROOM: string;
    COL_CHECKIN: string;
    COL_CHECKOUT: string;
    COL_NIGHTS: string;
    COL_TOTAL: string;
    COL_STATUS: string;
    COL_ACTIONS: string;
  };
  STATUS: {
    PENDING: string;
    APPROVED: string;
    CANCELLED: string;
    COMPLETED: string;
  };
  ACTIONS: {
    VIEW_DETAIL: string;
    VIEW_MORE: string;
    VIEW_LESS: string;
    COPY_CODE: string;
  };
  DETAIL: {
    SECTION_CLIENT: string;
    SECTION_ROOM: string;
    SECTION_PAYMENT: string;
    LABEL_EMAIL: string;
    LABEL_PHONE: string;
    LABEL_CATEGORY: string;
    LABEL_GUESTS_TOTAL: string;
    LABEL_ADULTS: string;
    LABEL_CHILDREN: string;
    LABEL_PETS: string;
    LABEL_CHECKIN: string;
    LABEL_CHECKOUT: string;
    LABEL_PRICE_PER_NIGHT: string;
    LABEL_NIGHTS: string;
    LABEL_NIGHT: string;
    LABEL_SUBTOTAL: string;
    LABEL_CURRENCY: string;
    ARRIVES_TODAY: string;
    BTN_CANCEL: string;
  };
  EMPTY: {
    TITLE: string;
    DESCRIPTION: string;
  };
  STATS: {
    PENDING_LABEL: string;
    PENDING_NOTE: string;
    APPROVED_LABEL: string;
    APPROVED_NOTE: string;
    TOTAL_LABEL: string;
    TOTAL_NOTE: string;
  };
  FILTERS: {
    ALL: string;
    PLACEHOLDER_ROOM: string;
    DATE_RANGE_PICKER_LABEL: string;
    CLEAR: string;
    RESULTS_SUFFIX: string;
    RESULTS_OF: string;
  };
  ERRORS: {
    FETCH_RESERVATIONS: string;
    FETCH_ROOMS: string;
  };
};
