import type { Database } from "../database.types";
import type { DBTableName } from "../tables/tables.types";

const _DB_TABLES = {
  PENDING_INVITATIONS: "pending_invitations",
  PROFILES: "profiles",
  RESERVATIONS: "reservations",
  ROOMS: "rooms",
  USER_ROLES: "user_roles",
} as const;

export const DB_TABLES = _DB_TABLES satisfies Record<Uppercase<DBTableName>, DBTableName>;

type _AssertAllTablesCovered = {
  [K in keyof Database["public"]["Tables"]]: (typeof _DB_TABLES)[Uppercase<K>] extends K
    ? true
    : never;
};

const _assertAllTablesCovered: _AssertAllTablesCovered = {
  pending_invitations: true,
  profiles: true,
  reservations: true,
  rooms: true,
  user_roles: true,
};
