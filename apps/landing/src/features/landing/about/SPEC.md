# Feature Specification: About Section

**Status:** completed
**Version:** 1.0

## 1. Objective
Brand story section that communicates the hotel's identity through a text panel (headline, body, quote) paired with a 3-image mosaic with parallax, and a 4-stat ticker row below. Built on a light background (`stone-50`) to contrast with the dark sections around it.

## 2. Scope & Boundaries

**In Scope:**
* Two-column layout: text panel (left) and mosaic image grid (right)
* Staggered scroll-triggered reveal for the text panel (`useInView`)
* Three images in a 2×2 mosaic grid (one `tall` cell spanning 2 rows) with individual parallax transforms
* Animated counter stats (RAF-based) that fire once when in view
* Full `prefers-reduced-motion` compliance

**Out of Scope (Do Not Modify):**
* The parallax transform values inside `AboutSection` — they are derived from a shared `scrollYProgress` and calibrated per image slot
* The mosaic grid layout (`ABOUT.MOSAIC` = `grid grid-cols-2 gap-3`) — changing column count breaks the tall cell behaviour
* The RAF counter in `AboutStats` — do not replace with CSS animation or `framer-motion` without testing the cleanup path

## 3. Architecture & Context

**Component Tree:**
```
AboutSection (orchestrator — scroll context owner, parallax source)
├── AboutTextPanel     (eyebrow, headline, body, quote — useInView stagger)
├── AboutMosaic        (grid container, parallax MotionValues passed down)
│   ├── MosaicPanel    (generic image panel — tall flag, overlays, parallaxTransform)
│   ├── MosaicPanel
│   └── MosaicPanel
└── AboutStats         (4-column stat ticker, RAF counter, useInView trigger)
```

**Core Files:**
* `components/AboutSection.tsx` — owns `useScroll` + `useTransform` for 3 parallax `MotionValue`s; passes them to `AboutMosaic`
* `components/AboutTextPanel.tsx` — self-contained with own `useRef` / `useInView`
* `components/AboutMosaic.tsx` — receives `parallaxTransforms: [MotionValue, MotionValue, MotionValue]`; renders the 3 `MosaicPanel` instances
* `components/MosaicPanel.tsx` — generic, reusable component; props: `{ src, alt, sizes, overlays, parallaxTransform, minHeight, tall? }`
* `components/AboutStats.tsx` — self-contained with own `useRef` / `useInView` / RAF counter
* `constants/styles.ts` — all Tailwind className strings
* `i18n/aboutTexts.type.ts` — type contract
* `i18n/about.texts.ts` — mock data for `es` and `en`

**System Constraints & Known Pitfalls:**
* **`ABOUT.HEADLINE` has `mb-8` baked in.** Inside `AboutTextPanel`, always use `ABOUT.HEADLINE_NO_MB` (same classes without `mb-8`) together with `ABOUT.HEADLINE_WRAPPER` (`overflow-hidden mb-8`) as the wrapper. **Never** use `ABOUT.HEADLINE.replace("mb-8", "")` — that string-manipulation pattern has been removed.
* `MosaicPanel` uses `ABOUT.MOSAIC_ITEM` (`rounded-sm overflow-hidden`) as its base class. Do not add `overflow-hidden` directly on the `motion.div` — it is already inside `ABOUT.MOSAIC_ITEM`.
* `MosaicPanel` when `tall={true}` appends `ABOUT.MOSAIC_TALL` (`col-span-1 row-span-2`). This class only has visual effect inside a `grid-cols-2` grid — if the mosaic grid changes, revisit.
* The RAF counter in `AboutStats` stores its ID in a `let rafId: number` and calls `cancelAnimationFrame(rafId)` on cleanup. If you rewrite the counter, preserve this cleanup pattern to avoid memory leaks.
* `ABOUT.OVERLAY` (`"absolute inset-0"`) is used for the gradient overlays inside `MosaicPanel` — keep it separate from `ABOUT.MOSAIC_INNER` (`"w-full h-full relative"`) which is the parallax container.

## 4. Acceptance Criteria

* [x] Two-column grid on `lg+`; single column on mobile
* [x] Text panel animates in with staggered `opacity + y` reveal on scroll entry
* [x] Headline animates with `y: "100%" → "0%"` clip reveal inside `ABOUT.HEADLINE_WRAPPER`
* [x] Three mosaic images render with individual parallax motion on scroll
* [x] Tall mosaic cell spans 2 rows correctly
* [x] Stats count up from 0 to target value on first scroll entry; do not restart on re-entry
* [x] RAF counter cancels on component unmount (no memory leak)
* [x] All animations disabled when `prefers-reduced-motion` is set
* [x] All text from `useI18n()` — no hardcoded strings
* [x] All classNames reference `ABOUT.*` constants

## 5. Handoff & Status Notes

* **Current State:** Fully implemented and deployed to `feature/US-CH-01-landing-sections`
* **Next Step:** Replace `https://picsum.photos/...` URLs in `AboutMosaic` with real CMS image URLs
