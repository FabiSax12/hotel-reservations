import { createContext } from "react";
import type { I18nContextValue } from "./I18nContext.interface";

export const I18nContext = createContext<I18nContextValue<unknown> | null>(null);
