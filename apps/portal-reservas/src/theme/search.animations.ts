// ─── Portal Reservas – Hero Search Animation Styles ──────────────────────────
// Inline style objects for hero title/subtitle/search transitions.
// These use dynamic values driven by state, so they live here rather than
// in Tailwind theme classes.

export const HERO_SEARCH_ANIMATIONS = {
  title: (heroCalendarActive: boolean) => ({
    transition: "opacity 400ms ease, transform 500ms cubic-bezier(0.22, 1, 0.36, 1)",
    opacity: heroCalendarActive ? 0.8 : 1,
    transform: heroCalendarActive ? "scale(0.95)" : "scale(1)",
    transformOrigin: "center top" as const,
  }),
  subtitle: (heroCalendarActive: boolean) => ({
    transition: "opacity 300ms ease, transform 400ms cubic-bezier(0.22, 1, 0.36, 1)",
    opacity: heroCalendarActive ? 0 : 1,
    transform: heroCalendarActive ? "translateY(-20px)" : "translateY(0)",
  }),
  searchWrapper: (heroCalendarActive: boolean) => ({
    transition: "transform 800ms cubic-bezier(0.22, 1, 0.36, 1)",
    transform: heroCalendarActive ? "translateY(0px)" : "translateY(48px)",
  }),
} as const;