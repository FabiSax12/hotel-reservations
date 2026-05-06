# Feature Specification: Properties Section

**Status:** completed
**Version:** 1.0

## 1. Objective
Animated slide carousel showcasing each hotel property (Arenal, Monteverde). Each slide shows a full-bleed visual panel on the left and a detailed info panel on the right. Supports drag-to-swipe on touch devices, keyboard-accessible nav buttons, and auto-advances every 5.5 seconds.

## 2. Scope & Boundaries

**In Scope:**
* `AnimatePresence` slide transitions with directional enter/exit variants
* Drag-to-swipe with velocity and offset thresholds; snaps back via `animate()` on release
* Nav buttons (prev/next) with disabled state on first/last slide
* Dot navigation with animated progress bar
* Per-property visual panel: full-bleed image, gradient overlays, animated concentric rings
* Per-property info panel: location, name, tagline, description, features, price, CTA
* Full `prefers-reduced-motion` compliance (simplified slide variants, ring animations paused)

**Out of Scope (Do Not Modify):**
* `EXPO_OUT` easing constant in `features/landing/constants/animations.ts` — shared across all landing features
* `PROPERTIES_CONFIG` entries' `visual` values (`gradient`, `rings`, `ringsCenter`, `accentColor`) — these are hand-tuned per-property; do not auto-generate
* The `AnimatePresence mode="wait"` — removing it causes enter and exit animations to overlap

## 3. Architecture & Context

**Component Tree:**
```
PropertiesSection (orchestrator — state + drag owner)
├── PropertiesHeader       (eyebrow, headline, subheadline — self-contained)
├── AnimatePresence
│   └── PropertySlide (motion.div — drag target)
│       ├── PropertyVisualPanel   (image, overlays, rings animation)
│       └── PropertyInfoPanel     (location, name, tagline, price, CTA)
└── PropertiesControls     (dot nav + progress bar + prev/next buttons)
```

**Core Files:**
* `components/PropertiesSection.tsx` — owns `[[current, direction], setSlide]` state; owns `dragX: MotionValue`; contains `handleDragEnd`, `navigate`, `goTo`
* `components/PropertyVisualPanel.tsx` — receives `config: PropertyConfig`; derives ring configs from `Array.from({ length: 3 })`
* `components/PropertyInfoPanel.tsx` — receives `texts: PropertyItemTexts`; all text is prop-driven
* `components/PropertiesControls.tsx` — receives `{ current, total, isHovered, prefersReducedMotion, autoInterval, dragHint, onGoTo, onNavigate }`
* `constants/properties-config.ts` — `PROPERTIES_CONFIG`, `PropertyConfig` and `PropertyVisual` types, `PropertyId`
* `constants/animations.ts` — `AUTO_INTERVAL`, `SLIDE_VARIANTS`, `SLIDE_VARIANTS_REDUCED`
* `constants/styles.ts` — all Tailwind className strings
* `i18n/propertiesTexts.type.ts` — type contract
* `i18n/properties.texts.ts` — mock data for `es` and `en`

**System Constraints & Known Pitfalls:**
* **`PropertyVisual.ringsCenter` is an explicit field.** Do not derive it from `rings` using string manipulation (e.g. `.replace("0.15", "0.25")`). For ARENAL the chroma differs from the alpha, so the replace pattern would produce a wrong color. The field exists precisely to avoid this.

* **Drag snap-back** uses `animate(dragX, 0, ...)` from framer-motion (not `useAnimation`). The `dragX` `MotionValue` is passed via `style={{ x: dragX }}` to the slide. After drag ends, it must be reset manually — framer-motion does not reset `MotionValue`s on drag end when `dragConstraints` is set.

* `navigate` is clamped: `if (next < 0 || next >= total) return` — the first/last slide does not wrap. This matches the `disabled` state on the nav buttons (`current === 0` / `current === total - 1`).

* The `direction` value in state (`[current, direction]`) is only used by `AnimatePresence` variants (`SLIDE_VARIANTS`) to determine enter/exit direction (`x: direction * 60% → 0` / `x: direction * -60%`). It is not used anywhere else.

* `PROPERTIES.NAV_BTN_FULL` includes `disabled:opacity-30 disabled:cursor-not-allowed`. Use this constant on all nav buttons — do not build the disabled classes via template literals.

## 4. Acceptance Criteria

* [x] Slides transition with directional enter/exit animations (`AnimatePresence mode="wait"`)
* [x] Dragging left/right beyond 80px offset or 400px/s velocity navigates to next/prev slide
* [x] Drag snaps back to `x: 0` after release regardless of navigation outcome
* [x] Nav buttons are disabled on first/last slide (no wrap-around)
* [x] Auto-advance fires every `AUTO_INTERVAL` ms; pauses on hover and `prefers-reduced-motion`
* [x] Concentric rings animate on `PropertyVisualPanel`; rotation pauses when `prefers-reduced-motion`
* [x] Progress bar resets on each slide change
* [x] All text from `useI18n()` (including `alt` on the image)
* [x] All classNames reference `PROPERTIES.*` constants

## 5. Handoff & Status Notes

* **Current State:** Fully implemented with 2 properties (ARENAL, MONTEVERDE). Deployed to `feature/US-CH-01-landing-sections`
* **Next Step:** Add new properties by extending `PROPERTIES_CONFIG`, `PropertyId`, and the `PropertiesTexts` type; no changes to components required
