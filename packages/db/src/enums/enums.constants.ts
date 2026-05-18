import type { Database } from "../database.types";

export const DB_ENUMS: {
  [Enum in keyof Database["public"]["Enums"]]: {
    [Value in Database["public"]["Enums"][Enum]]: Value;
  };
} = {
  invitation_status: {
    accepted: "accepted",
    expired: "expired",
    pending: "pending",
    revoked: "revoked",
  },
  user_role: {
    admin: "admin",
    client: "client",
    owner: "owner",
  },
};
