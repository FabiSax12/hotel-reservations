# Feature Specification: Gallery Section

**Status:** completed
**Version:** 1.0

## 1. Objective
Image gallery that showcases hotel experiences. Renders a 3D perspective carousel on desktop (lg+) and a horizontal snap-scroll strip on mobile. Auto-advances every 3.8 seconds and pauses on hover.

## 2. Scope & Boundaries

**In Scope:**
* Desktop: 3D carousel with spring-animated position, scale, and opacity per card; clicking a non-active card selects it
* Mobile: horizontal `overflow-x-auto` with `snap-x` for each gallery item
* Auto-advance with `setInterval`; pauses when `isHovered` or `prefersReducedMotion`
* Dot navigation with animated progress bar showing time until next advance
* Scroll-triggered reveal for the header (`useInView`)

**Out of Scope (Do Not Modify):**
* `computeOffset` function in `GalleryCarousel` — the circular-array arithmetic (`offset > total/2 → subtract total`) is required for correct wrap-around behaviour
* `VISIBLE_RANGE = 2` in `carousel.ts` — cards beyond this range are hidden (`zIndex: -1`, `opacity: 0`); increasing it without adjusting `SPREAD` will cause visual overlap
* The `GalleryItemId` Omit pattern — see pitfall below

## 3. Architecture & Context

**Component Tree:**
```
GallerySection (orchestrator — state owner)
├── GalleryHeader      (eyebrow, headline, subheadline — useInView stagger)
├── GalleryCarousel    (desktop 3D carousel — hidden on mobile)
├── GalleryMobile      (horizontal snap scroll — hidden on lg+)
└── GalleryControls    (dot nav + progress bar)
```

**Core Files:**
* `components/GallerySection.tsx` — owns `current` + `isHovered` state; owns the `setInterval` auto-advance effect
* `components/GalleryCarousel.tsx` — receives `{ current, onSelect, onHoverChange }`; all animation logic lives here
* `components/GalleryMobile.tsx` — receives `{ current }` (read-only, for highlighting the active dot)
* `components/GalleryControls.tsx` — receives `{ current, total, isHovered, prefersReducedMotion, autoInterval, onSelect }`
* `constants/carousel.ts` — numeric constants: `CARD_W`, `CARD_H`, `SPREAD`, `SCALE_STEP`, `OPACITY_STEP`, `VISIBLE_RANGE`, `AUTO_INTERVAL`
* `constants/gallery-config.ts` — `GALLERY_CONFIG: GalleryItem[]` and **`GalleryItemId` type**
* `constants/styles.ts` — all Tailwind className strings
* `i18n/galleryTexts.type.ts` — type contract; **read before adding new keys** (see pitfall)
* `i18n/gallery.texts.ts` — mock data for `es` and `en`

**System Constraints & Known Pitfalls:**
* **`GalleryItemId` is derived from `GalleryTexts`:**
  ```ts
  type GalleryItemId = keyof Omit<GalleryTexts, "EYEBROW" | "HEADLINE" | "SUBHEADLINE" | "DOT_LABEL">
  ```
  If you add a new non-item key to `GalleryTexts` (e.g. a new shared string), you **must** also add it to the `Omit` in `gallery-config.ts`, otherwise `GalleryCarousel` will fail with: *"Property 'TITLE' does not exist on type `string | GalleryItemTexts`"*

* The `computeOffset` function wraps the index difference to always be in the range `(-total/2, total/2]`. This is what makes the carousel wrap-around smoothly. Do not replace with a simple subtraction.

* `GalleryCarousel` is wrapped in `className={GALLERY.CAROUSEL_WRAPPER}` (`hidden lg:block`), and `GalleryMobile` is `GALLERY.MOBILE_WRAPPER` (`lg:hidden ...`). They are mutually exclusive — do not render both unconditionally.

* The progress bar in `GalleryControls` uses `key={current}` on the inner `motion.div` to reset the animation every time the slide changes. Without `key`, the bar would not restart.

## 4. Acceptance Criteria

* [x] 7 gallery items render correctly in both desktop carousel and mobile strip
* [x] Active card is centered; cards at offset ±1 and ±2 are visible with reduced scale and opacity
* [x] Cards at `absOffset > VISIBLE_RANGE` have `zIndex: -1` and `opacity: 0`
* [x] Clicking a non-active desktop card navigates to it
* [x] Mobile strip snaps to each card on scroll
* [x] Auto-advance fires every `AUTO_INTERVAL` ms; pauses on hover and when `prefers-reduced-motion`
* [x] Dot nav reflects the active card; clicking a dot navigates to it
* [x] Progress bar resets and re-animates on each slide change
* [x] All text from `useI18n()` — no hardcoded strings
* [x] All classNames reference `GALLERY.*` constants

## 5. Handoff & Status Notes

* **Current State:** Fully implemented and deployed to `feature/US-CH-01-landing-sections`
* **Next Step:** Replace `picsum.photos` URLs in `GALLERY_CONFIG` with real CMS image URLs; connect `imageUrl` to CMS content delivery
