import type { Database } from "../database.types";

export type DBTableName = keyof Database["public"]["Tables"];
