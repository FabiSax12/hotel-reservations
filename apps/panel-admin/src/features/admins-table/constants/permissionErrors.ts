export const UPDATE_PERMISSION_ERRORS = {
  SELF_MODIFY: "SELF_MODIFY",
  OWNER_MODIFY: "OWNER_MODIFY",
  INVALID_PERMISSION: "INVALID_PERMISSION",
  // J3.1 (J2-POC-3): caller tried to grant a permission it does not itself hold
  // ("confused deputy" delegation beyond the caller's own privileges).
  PERMISSION_EXCEEDED: "PERMISSION_EXCEEDED",
  // J3.1 (J2-POC-3): target user id does not correspond to an existing admin.
  INVALID_TARGET: "INVALID_TARGET",
  UNKNOWN_ERROR: "UNKNOWN_ERROR",
} as const;

export type UpdatePermissionError =
  (typeof UPDATE_PERMISSION_ERRORS)[keyof typeof UPDATE_PERMISSION_ERRORS];
