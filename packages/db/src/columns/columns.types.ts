import type { Database } from "../database.types";

export type DBTablesWithColumns = {
  [Table in keyof Database["public"]["Tables"]]: {
    [row in keyof Database["public"]["Tables"][Table]["Row"]]: row;
  };
};
