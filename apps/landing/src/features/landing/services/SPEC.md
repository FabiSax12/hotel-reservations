# Feature Specification: Services Section

**Status:** completed
**Version:** 1.0

## 1. Objective
Services showcase displaying 8 hotel services in a 4-column grid on desktop and a horizontal snap-scroll strip on mobile. Each card reveals with a clip-path animation on desktop and a slide-in on mobile. Ends with a full-width CTA button.

## 2. Scope & Boundaries

**In Scope:**
* Desktop: 4-column grid with `clipPath: inset(0 0 100% 0) → inset(0 0 0% 0)` column-reveal animation, staggered by index
* Mobile: horizontal `overflow-x-auto` with `snap-x`, x-axis slide-in staggered by index
* Each card: Lucide icon, gold accent line (widens on hover), title, description
* CTA button below the grid
* Scroll-triggered animations via `useInView` in `ServicesGrid`
* Full `prefers-reduced-motion` compliance (opacity-only fallback)

**Out of Scope (Do Not Modify):**
* Lucide icon assignments in `SERVICES_CONFIG` — changing an icon is fine, but do not replace the `LucideIcon` type with a different icon library without updating `ServiceCard`
* `SERVICES.GRID` — this is the original single responsive grid constant; it is kept for reference but `ServicesGrid` uses `SERVICES.GRID_DESKTOP` and `SERVICES.GRID_MOBILE` separately (see pitfall below)

## 3. Architecture & Context

**Component Tree:**
```
ServicesSection (orchestrator — useReducedMotion only)
├── ServicesHeader      (eyebrow, headline, subheadline — useInView stagger)
├── ServicesGrid        (desktop grid + mobile strip — useInView trigger, renders ServiceCard)
│   └── ServiceCard     (individual card — icon, accent, title, description)
└── ServicesCta         (CTA button — useInView reveal)
```

**Core Files:**
* `components/ServicesSection.tsx` — minimal orchestrator; only reads `prefersReducedMotion` and passes it to `ServicesGrid`
* `components/ServicesGrid.tsx` — owns the `useRef` / `useInView`; renders both the desktop `GRID_DESKTOP` and mobile `GRID_MOBILE` containers with the same data
* `components/ServiceCard.tsx` — receives `{ service: ServiceConfig, texts: ServiceItemTexts, index: number }`; uses `CARD_VARIANT` with `custom={index}` for stagger delay
* `components/ServicesCta.tsx` — self-contained with own `useRef` / `useInView`
* `constants/services-config.ts` — `SERVICES_CONFIG`, `ServiceConfig`, `ServiceId`
* `constants/styles.ts` — all Tailwind className strings
* `i18n/servicesTexts.type.ts` — type contract
* `i18n/services.texts.ts` — mock data for `es` and `en`

**System Constraints & Known Pitfalls:**
* **`SERVICES.GRID` ≠ `SERVICES.GRID_DESKTOP`**: `GRID` is `"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-forest-800"` (single responsive element). `GRID_DESKTOP` is `"hidden lg:grid lg:grid-cols-4 gap-px bg-forest-800"` — it hides on mobile. `ServicesGrid` uses the split approach (GRID_DESKTOP + GRID_MOBILE) to apply different animations per breakpoint. Do not collapse them back into one element.

* `ServiceCard` uses `CARD_VARIANT` with `custom={index}` for per-card delay (`delay: i * 0.07`). This variant is defined locally in `ServiceCard.tsx` — it is **not** in `constants/animations.ts`. If animating the card differently, update the variant there.

* `ServicesCta` has its own `useInView` separate from `ServicesGrid` — this is intentional so the CTA can animate in independently after the grid.

* The `ref` for `useInView` in `ServicesGrid` is attached to the **desktop grid** (`GRID_DESKTOP`) div, not the mobile strip. Both grids respond to the same `inView` boolean — this is acceptable because at any given viewport only one is visible.

## 4. Acceptance Criteria

* [x] 8 service cards render on both desktop grid and mobile strip
* [x] Desktop: each column reveals bottom-to-top via clip-path, staggered by `index * 0.06s`
* [x] Mobile: each card slides in from the right, staggered by `index * 0.04s`
* [x] Both animations trigger once on scroll entry into view
* [x] Card hover: accent line widens from `w-8` to `w-16`; title transitions to `gold-300`; description transitions to `stone-400`
* [x] All animations replaced with opacity fade when `prefers-reduced-motion` is set
* [x] CTA button animates in independently on scroll entry
* [x] All text from `useI18n()` — no hardcoded strings
* [x] All classNames reference `SERVICES.*` constants

## 5. Handoff & Status Notes

* **Current State:** Fully implemented with 8 services. Deployed to `feature/US-CH-01-landing-sections`
* **Next Step:** Adding a new service requires: (1) adding the `ServiceId` to the `Pick` in `services-config.ts`, (2) adding the icon + entry to `SERVICES_CONFIG`, (3) adding the text key to `ServicesTexts` type and both locale mock files
