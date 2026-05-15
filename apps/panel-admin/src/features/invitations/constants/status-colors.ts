type ChipColor = "warning" | "success" | "danger" | "default";

export const INVITATION_STATUS_COLORS: Record<string, ChipColor> = Object.freeze({
  pending: "warning",
  accepted: "success",
  revoked: "danger",
  expired: "default",
} as const);
