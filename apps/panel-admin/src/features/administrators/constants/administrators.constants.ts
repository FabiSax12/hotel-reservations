export const ADMIN_ROLE            = "admin"                            as const;
export const ADMIN_SELECT_FIELDS   = "id, email, is_active, created_at" as const;
export const ADMIN_TABLE_COLUMNS   = 3                                  as const;
export const ADMIN_INITIALS_LENGTH = 2                                  as const;
export const ADMIN_EMPTY_COUNT     = 0                                  as const;
export const ADMIN_PAGE_SIZE       = 10                                 as const;
export const ADMIN_DEFAULT_PAGE    = 1                                  as const;

// Pagination display logic
export const PAGINATION_MAX_VISIBLE_PAGES  = 5 as const;
export const PAGINATION_ELLIPSIS_THRESHOLD = 2 as const;
export const PAGINATION_NEIGHBOR_WINDOW    = 1 as const;
