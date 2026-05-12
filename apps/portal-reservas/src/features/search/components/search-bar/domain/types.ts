/**
 * @file types.ts — Domain types for the ModernSearchBar component.
 */

/**
 * Identifies which section of the search bar is currently expanded/focused.
 * `null` means no section is active (all popovers are closed).
 */
export type ActiveSection = "where" | "checkIn" | "checkOut" | "who" | null;

/**
 * Variant type for the search bar visual mode.
 */
export type SearchBarVariant = "hero" | "compact";

/**
 * The data payload emitted by the search bar when the user triggers a search.
 * Mirrors the portal's `SearchParams` but lives in the UI package so the
 * component can define its own contract independently.
 */
export interface SearchState {
  /** Selected destination name, or "Todos" for all. */
  destination: string;
  /** ISO date string for check-in (e.g. "2026-10-15"). */
  checkIn: string;
  /** ISO date string for check-out (e.g. "2026-10-21"). */
  checkOut: string;
  /** Number of adult guests. */
  adults: number;
  /** Number of child guests. */
  children: number;
  /** Number of pets. */
  pets: number;
}

/**
 * Represents a validation error surfaced when the user attempts
 * to search with incomplete or invalid data.
 */
export interface ValidationError {
  /** Human-readable error message (Spanish UX copy from `VALIDATION` constants). */
  message: string;
  /**
   * Which search bar section(s) this error applies to.
   * Used to highlight the corresponding field(s) with an error visual state.
   */
  fields: ActiveSection[];
}

export interface SearchBarProps {
  /** Callback fired when the user clicks "Buscar". Receives the full search state. */
  onSearch?: (state: SearchState) => void;
  /** Additional CSS class(es) for the outermost container. */
  className?: string;
  /**
   * Visual variant:
   *  - `"hero"` — Large size for the full-viewport landing page.
   *  - `"compact"` — Smaller size for the sticky header bar.
   */
  size?: SearchBarVariant;
  /** Optional initial field values (used to restore state in the compact bar). */
  initialState?: Partial<SearchState>;
  /**
   * Callback fired the first time the hero-mode calendar expands.
   * The parent (HeroSearch) uses this to trigger the title fade-out animation.
   */
  onHeroCalendarOpen?: () => void;
  /**
   * Callback fired whenever the user selects a destination.
   * Used by the page orchestrator to activate the rooms section without
   * requiring a full search submission.
   */
  onDestinationChange?: (destination: string) => void;
}

// ─── Hook Dependency Types ──────────────────────────────────────────────────

export interface UseDestinationStateOptions {
  initialDestination?: string;
  onDestinationChange?: (dest: string) => void;
}

export interface UseSearchBarContextValueDeps {
  size: SearchBarVariant;
  barState: {
    active: ActiveSection;
    setActive: (s: ActiveSection) => void;
    hasHeroCalendarOpened: boolean;
    setHasHeroCalendarOpened: (v: boolean) => void;
    isSearching: boolean;
    setIsSearching: (v: boolean) => void;
    lastUserActivatedSection: import("react").RefObject<ActiveSection | null>;
    isHero: boolean;
  };
  validation: {
    validationError: ValidationError | null;
    isShaking: boolean;
    clearError: () => void;
    validateSearch: (dest: string, inDate: string, outDate: string, onlyOneSede: string | null) => boolean;
    fieldHasError: (k: string) => boolean;
  };
  destState: {
    destination: string;
    setDestination: (dest: string) => void;
    onlyOneSede: string | null;
  };
  dateState: {
    checkIn: string;
    checkOut: string;
    invalidState: { dayStrs: string[]; isFading: boolean; animationKey?: number } | null;
    handlePickDate: (dayStr: string) => void;
  };
  guestState: {
    adults: number;
    setAdults: import("react").Dispatch<import("react").SetStateAction<number>>;
    children: number;
    setChildren: import("react").Dispatch<import("react").SetStateAction<number>>;
    pets: number;
    setPets: import("react").Dispatch<import("react").SetStateAction<number>>;
  };
  activateSection: (sec: ActiveSection, clearErrFn?: () => void) => void;
  onHeroCalendarOpen?: () => void;
  handleSearchTrigger: () => void;
}

export interface UseSearchTriggerDeps {
  destination: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  childrenCount: number;
  pets: number;
  onlyOneSede: string | null;
  validateSearch: (dest: string, inDate: string, outDate: string, onlyOneSede: string | null) => boolean;
  clearError: () => void;
  showError: (error: ValidationError) => void;
  setActive: (s: ActiveSection) => void;
  setIsSearching: (v: boolean) => void;
  activateSection: (sec: ActiveSection, clearErrFn?: () => void) => void;
  onSearch?: (params: any) => void;
  missingSedeMessage: string;
}

// ─── Sub-Component Props ────────────────────────────────────────────────────

export interface DestinationPreviewProps {
  data: {
    name: string;
    image: string;
    priceFrom: number;
    highlights: readonly string[];
  };
  isHero: boolean;
  positionClasses: string;
  fromLabel: string;
  usdNightLabel: string;
  onMouseLeave: () => void;
}

export interface SearchButtonProps {
  isSearching: boolean;
  iconClass: string;
  paddingClass: string;
  onTrigger: () => void;
  isShaking?: boolean;
}

export interface DateSectionProps {
  label: string;
  placeholder: string;
  displayValue: string;
  sizing: { label: string; value: string };
  sectionClass: string;
  onActivate: () => void;
  hasError?: boolean;
  isShaking?: boolean;
}

export interface DestinationSectionProps {
  isActive: boolean;
  destination: string;
  sizing: { label: string; value: string };
  sectionClass: string;
  onActivate: () => void;
  hasError?: boolean;
  isShaking?: boolean;
}

export interface GuestsSectionProps {
  isActive: boolean;
  guestsText: string;
  sizing: { label: string; value: string };
  sectionClass: string;
  onActivate: () => void;
}

export interface ErrorTooltipProps {
  message: string;
}
