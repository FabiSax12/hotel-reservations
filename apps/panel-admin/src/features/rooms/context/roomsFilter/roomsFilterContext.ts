import { createContext } from "react";
import type { RoomsFilterContextValue } from "./roomsFilterContextValue";

export const RoomsFilterContext = createContext<RoomsFilterContextValue | null>(null);
