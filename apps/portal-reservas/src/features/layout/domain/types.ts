/**
 * @file types.ts — Layout-feature domain types for Portal de Reservas.
 */

import type { SearchParams } from "../../search/domain/types";

export interface HeaderProps {
  hasSearched: boolean;
  searchParams: SearchParams;
  onReset: () => void;
  onSearch: (params: SearchParams) => void;
  /** When true, the header is pushed left to make room for the detail side panel. */
  isDetailOpen?: boolean;
}

export interface HeaderBrandProps {
  onReset: () => void;
}

export interface StickySearchBarProps {
  searchParams: SearchParams;
  onSearch: (params: SearchParams) => void;
}
