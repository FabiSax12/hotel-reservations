/**
 * @file index.ts — Public API barrel for the @hotel/ui package.
 *
 * NOTE: The `search-bar` feature was moved into the `portal-reservas`
 * app because it is app-specific. This barrel is intentionally left
 * empty so future shared components can be exported here.
 */

// Reusable Components
export * from "./components/Stepper/Stepper";
export * from "./components/Stepper/Stepper.theme";
export * from "./components/Calendar/CalendarDay";
export * from "./components/Calendar/CalendarMonth";
export * from "./components/Calendar/CalendarPopover";
export * from "./components/Calendar/Calendar.theme";
export * from "./components/Button/Button";
export * from "./components/Button/Button.theme";
export * from "./components/BrandLogo/BrandLogo";

// Utilities
export * from "./utils/date.utils";
