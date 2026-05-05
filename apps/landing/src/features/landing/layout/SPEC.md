# Feature Specification: Landing Layout Shell

**Status:** completed
**Version:** 1.0

## 1. Objective
Persistent shell components that wrap the entire landing page: a fixed navigation bar, a marquee band between sections, a footer, and a scroll-progress indicator. These components are mounted once in `LandingLayout` (or directly in the page) and are not section-specific.

## 2. Scope & Boundaries

**In Scope:**
* `LandingNav` — fixed header with backdrop that fades in on scroll; hotel name, nav links, book CTA
* `MarqueeBand` — auto-scrolling horizontal ticker with hotel tagline items; placed between hero and the first content section
* `LandingFooter` — full-width footer with brand, nav links, book link, copyright, and locations
* `ScrollProgress` — 2px gold bar fixed at the top of the viewport tracking scroll depth
* All text sourced from `t.COMMON.*` (shared i18n, not feature-specific)
* Locale-aware metadata via `generateSiteMetadata` in `src/config/metadata.ts`

**Out of Scope (Do Not Modify):**
* `src/app/layout.tsx` — the `RootLayout`; only modify if changing the font variables, `I18nProvider` setup, or metadata wiring
* `src/middleware.ts` — sets the `x-locale` header that both `RootLayout` and `generateSiteMetadata` depend on
* `COMMON_TEXTS` in `shared/i18n/commonTexts.ts` — shared across all apps; coordinate with the team before changing keys

## 3. Architecture & Context

**Component Files:**
* `components/LandingNav.tsx` — `useScroll` + `useTransform` on `scrollY` to animate `backdropOpacity` and `borderOpacity`
* `components/MarqueeBand.tsx` — duplicates the items array (`[...withSeparators, ...withSeparators]`) for a seamless 50% loop; animates `x: ["0%", "-50%"]`
* `components/LandingFooter.tsx` — static layout component; no scroll or animation logic
* `components/ScrollProgress.tsx` — `useSpring` on `scrollYProgress` for a smooth progress indicator
* `constants/styles.ts` — all Tailwind className strings for all 4 components (prefixed `NAV_*`, `FOOTER_*`, `MARQUEE_*`, `SCROLL_*`)

**Related App-Level Files:**
* `src/app/layout.tsx` — exports `generateMetadata = generateSiteMetadata`; fetches content once; provides `I18nProvider`
* `src/config/fonts.ts` — `playfair` (Playfair Display) and `dmSans` (DM Sans) Next.js font objects with CSS variable names
* `src/config/metadata.ts` — `generateSiteMetadata()` async function; reads `x-locale` header and calls `fetchContent(locale)` to return locale-specific `Metadata`

**System Constraints & Known Pitfalls:**
* **Metadata is locale-aware via `generateMetadata`** (not `export const metadata`). `RootLayout` also calls `fetchContent(locale)` — Next.js deduplicates this fetch within a single render, so there is no double request.

* **Marquee loop requires the 2× duplication.** The animation is `x: ["0%", "-50%"]` on a container that is exactly twice the visible content width. If you add or remove items from `MARQUEE_ITEMS`, the proportions remain correct because the duplication is dynamic. Do not hard-code the `-50%` to a pixel value.

* **Nav backdrop** (`LAYOUT.NAV_BACKDROP`) has `opacity` driven by `useTransform(scrollY, [0, 80], [0, 1])`. The backdrop div must have `opacity` set via `style`, not via a Tailwind class — Tailwind opacity classes are static and will override the motion value.

* **`LAYOUT.SCROLL_PROGRESS`** includes `origin-left` — this is required for `scaleX` to expand from the left edge. Do not remove it.

* `LandingNav` uses `t.COMMON.LAYOUT.HOTEL_NAME` and `t.COMMON.NAV.*` — these keys live in `shared/i18n/commonTexts.type.ts`, not in any feature-specific type file.

## 4. Acceptance Criteria

* [x] Nav backdrop is invisible at scroll position 0; fully opaque at scroll position 80
* [x] Nav bottom border appears between scroll positions 60–120
* [x] Hotel name, 4 nav links, and book CTA render from `t.COMMON.*`
* [x] Marquee scrolls continuously with no visible seam
* [x] Marquee items separated by `✦` separator with distinct gold styling
* [x] Footer renders brand name, tagline, nav links, book link, copyright, and locations footer
* [x] Scroll progress bar tracks scroll depth smoothly with spring physics
* [x] `<title>` and `<meta name="description">` reflect the active locale's `META_TITLE` and `META_DESCRIPTION`
* [x] All text from `useI18n()` or `generateSiteMetadata` — no hardcoded strings
* [x] All classNames reference `LAYOUT.*` constants

## 5. Handoff & Status Notes

* **Current State:** Fully implemented and deployed to `feature/US-CH-01-landing-sections`
* **Next Step:** Wire nav links and footer links to real page anchors or routes; currently all `href="#"`
