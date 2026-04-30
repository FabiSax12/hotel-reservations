# Feature Specification: Hero Section

**Status:** completed
**Version:** 1.0

## 1. Objective
Full-screen landing hero that establishes the hotel brand through a parallax background, animated wordmark, staggered content reveal, and a visual panel that scales on scroll. It is the first thing the user sees and drives CTA engagement.

## 2. Scope & Boundaries

**In Scope:**
* Parallax background layer with orbs, rotating rings, and grid overlay
* Character-by-character wordmark animation (`ALTAVERDE`)
* Headline with clip-reveal per line (`block overflow-hidden` pattern)
* Staggered reveal of subheadline, CTAs, and location bar
* Right-side visual panel: image, gradient overlays, blinking orbs, badge
* Scroll cue indicator at the bottom center
* Full `prefers-reduced-motion` compliance — all animations replaced with simple opacity fade

**Out of Scope (Do Not Modify):**
* The scroll-driven parallax values (`bgYValue`, `contentYValue`, `visualScale`) — they are calibrated; changing the ranges will break visual rhythm
* `HERO_ORBS` array in `constants/orbs.ts` — animation configs are tightly tuned; modify values carefully
* The `EXPO_OUT` easing constant (`constants/animations.ts`) — shared across the whole landing

## 3. Architecture & Context

**Component Tree:**
```
HeroSection (orchestrator — scroll context owner)
├── HeroBgLayer         (parallax bg, orbs, rings, grid SVG)
├── HeroLeftContent     (wordmark, headline, subheadline, CTAs, location bar)
├── HeroVisualPanel     (image, overlays, blinking orbs, badge)
└── HeroScrollCue       (animated scroll indicator)
```

**Core Files:**
* `components/HeroSection.tsx` — owns `useScroll`, `useTransform`, `useMotionTemplate`; passes derived `MotionValue`s down as props
* `components/HeroBgLayer.tsx` — receives `bgTransform: MotionValue<string>` as prop
* `components/HeroVisualPanel.tsx` — receives `scale: MotionValue<number>` as prop
* `components/HeroLeftContent.tsx` — self-contained; owns all text animation variants
* `components/HeroScrollCue.tsx` — self-contained; no external props
* `constants/styles.ts` — all Tailwind className strings; never write raw classes in components
* `constants/orbs.ts` — `OrbConfig[]` array with `size`, `color`, `style`, `animate`, `transition` per orb
* `i18n/heroTexts.type.ts` — type contract for all text keys
* `i18n/hero.texts.ts` — mock data for `es` and `en`

**System Constraints & Known Pitfalls:**
* `HeroSection` is the **only** component that uses `useScroll` with a `target` ref; sub-components must not create their own scroll contexts
* `useReducedMotion` is called independently inside each sub-component — do not hoist it to `HeroSection` and pass it down, as that defeats the React pattern
* The `HERO.BG_LAYER` div uses `pointer-events-none` — do not add interactive elements inside `HeroBgLayer`
* Orb blinking animations in `HeroVisualPanel` are gated on `!prefersReducedMotion`; keep that guard when adding new orbs
* The `HERO.VISUAL_INNER` constant (`"absolute inset-0"`) is reused for overlay divs in the visual panel — this is intentional

## 4. Acceptance Criteria

* [x] Hero occupies full viewport height on load (`min-h-screen`)
* [x] Wordmark `ALTAVERDE` animates character by character on mount
* [x] Headline lines animate with `y: "110%" → "0%"` clip reveal on mount
* [x] Visual panel reveals via `clipPath` on mount
* [x] Background scrolls at 28% of scroll distance (parallax offset)
* [x] Content fades out starting at 45% scroll progress
* [x] Visual panel image scales from 1 to 1.1 on scroll
* [x] All animations are replaced by simple opacity fades when `prefers-reduced-motion` is set
* [x] All text comes from `useI18n()` — no hardcoded strings in components
* [x] All classNames reference `HERO.*` constants — no raw Tailwind strings in components

## 5. Handoff & Status Notes

* **Current State:** Fully implemented and deployed to `feature/US-CH-01-landing-sections`
* **Next Step:** Replace `https://picsum.photos/...` image in `HeroVisualPanel` with real CMS image URL when content pipeline is ready
