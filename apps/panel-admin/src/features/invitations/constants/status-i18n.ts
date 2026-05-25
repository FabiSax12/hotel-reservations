export const INVITATION_STATUS_I18N_KEYS: Record<
  string,
  keyof {
    STATUS_PENDING: string;
    STATUS_ACCEPTED: string;
    STATUS_REVOKED: string;
    STATUS_EXPIRED: string;
  }
> = Object.freeze({
  pending: "STATUS_PENDING",
  accepted: "STATUS_ACCEPTED",
  revoked: "STATUS_REVOKED",
  expired: "STATUS_EXPIRED",
} as const);
