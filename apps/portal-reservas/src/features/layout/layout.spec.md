# Feature Specification: Global Layout

**Status:** in-progress (Phase 2 / US-DM-02 — design system refresh)
**Version:** 2.0
**Depends on:** `@hotel/ui`, `@hotel/i18n`, `search` feature

---

## 1. Objective

Provide the persistent global application shell — background, header, and page layout — that hosts all other features. Phase 2 extends this to support the visual design system overhaul (typography tokens, OKLCH color palette, spacing scale) required by the US-DM-02 rooms listing, while maintaining full backward compatibility with the existing hero/State B search flow.

---

## 2. Scope & Boundaries

### In Scope (Phase 2 / US-DM-02)
* **Design system tokens** defined in `globals.css` via `@theme`:
  - OKLCH-based color palette: `--color-canvas`, `--color-surface`, `--color-primary`, `--color-primary-subtle`, `--color-ink`, `--color-ink-muted`, `--color-accent`.
  - Semantic spacing scale: `--space-xs` (4px) through `--space-2xl` (96px).
  - Type scale: `--text-xs` through `--text-display`.
  - Font families: display (`--font-display`) + body (`--font-body`) — both loaded from Google Fonts.
* **Background** component: replace fixed blurred photo with a dynamic layering system that subtly adapts as the user scrolls from hero into the rooms section (parallax-lite via CSS transform, no JS scroll handler).
* **Header** refinement: tighter brand lockup, improved nav hierarchy (help link vs. account CTA). The `border-l-2` nav separator is replaced (violates absolute bans).
* **Layout orchestrator** (`page.tsx`): wraps rooms section in `RoomsProvider`, handles scroll-lock handoff.
* **Scroll lock**: while no location is selected in the rooms context, `overflow: hidden` is applied to `<body>`. Cleared once location resolves.
* **`loading.tsx`** and **`error.tsx`** at the route level for the `/` route.

### In Scope (Phase 1 — already completed)
* `Background`, `Header`, `HeaderBrand`, `HeaderNav`, `StickySearchBar` components.
* Sticky compact search bar transition (State A → State B).
* i18n wiring for layout texts.

### Out of Scope (Do Not Modify)
* Mobile hamburger menu / authenticated user dropdown → Phase 3.
* Footer → Phase 3.
* Multi-route navigation (beyond `/`) → later US.

---

## 3. Architecture & Context

### Core Files Involved
| File | Role |
|------|------|
| `app/globals.css` | Global CSS: `@theme` token definitions, font imports, keyframes |
| `app/layout.tsx` | Root layout: sets `<body>` font class, imports globals |
| `app/loading.tsx` | [NEW] Route-level loading boundary |
| `app/error.tsx` | [NEW] Route-level error boundary |
| `app/page.tsx` | Root page orchestrator (modified to add `RoomsProvider`) |
| `features/layout/components/Background.tsx` | Full-viewport blurred photo backdrop |
| `features/layout/components/Header.tsx` | Fixed top bar: brand + nav |
| `features/layout/components/HeaderBrand.tsx` | Logo / wordmark |
| `features/layout/components/HeaderNav.tsx` | Help + account CTAs |
| `features/layout/components/StickySearchBar.tsx` | Compact bar that appears in State B |
| `theme/layout.theme.ts` | Tailwind class dictionaries for all layout components |

### Design System Tokens (Phase 2 additions to `globals.css`)

```css
@theme {
  /* OKLCH color palette — tinted neutrals toward forest-green hue (h≈155) */
  --color-canvas:         oklch(0.97 0.006 155);  /* off-white background */
  --color-surface:        oklch(0.99 0.003 155);  /* card/panel surface */
  --color-primary:        oklch(0.32 0.09 155);   /* deep forest green */
  --color-primary-subtle: oklch(0.92 0.025 155);  /* light green tint */
  --color-ink:            oklch(0.18 0.015 155);  /* near-black headings */
  --color-ink-muted:      oklch(0.45 0.012 155);  /* secondary text */
  --color-accent:         oklch(0.58 0.14 88);    /* warm amber accent — 10% use */

  /* Spacing scale — 4pt base */
  --space-xs:   0.25rem;   /* 4px  */
  --space-sm:   0.5rem;    /* 8px  */
  --space-md:   0.75rem;   /* 12px */
  --space-lg:   1rem;      /* 16px */
  --space-xl:   1.5rem;    /* 24px */
  --space-2xl:  2rem;      /* 32px */
  --space-3xl:  3rem;      /* 48px */
  --space-4xl:  4rem;      /* 64px */
  --space-5xl:  6rem;      /* 96px */

  /* Type scale — fluid headings, fixed body */
  --text-xs:      0.75rem;
  --text-sm:      0.875rem;
  --text-base:    1rem;
  --text-lg:      1.125rem;
  --text-xl:      1.25rem;
  --text-2xl:     1.5rem;
  --text-3xl:     clamp(1.75rem, 4vw, 2.25rem);
  --text-display: clamp(2.5rem, 7vw, 4.5rem);

  /* Font families — confirmed via font_selection_procedure */
  --font-display: 'Corben', Georgia, serif;   /* bold, organic, handcrafted */
  --font-body:    'Mada', system-ui, sans-serif; /* clean, legible, Mediterranean-rooted */
}
```

> **Font selection reasoning**: Brand words are *"grounded, verdant, trustworthy"*. Reflex fonts (Fraunces, Playfair, Cormorant) are all rejected. Corben has a handcrafted warmth suited to eco-lodge letterhead; Mada brings unaffected clarity used in editorial contexts — neither has been normalized into AI output. Both available on Google Fonts.

### System Constraints & Known Pitfalls
* `border-left: 2px` in `HEADER_STYLES.myReservationsBtn` violates the absolute-ban on side-stripe borders. **Must be replaced** in Phase 2 (use a full border on the button, or a subtle background tint instead).
* `globals.css` must load before any component; ensure token definitions are inside `@theme {}`.
* `loading.tsx` and `error.tsx` must be co-located with `page.tsx` in `app/`.

---

## 4. Acceptance Criteria

### Phase 1 (US-DM-01) — Complete
* [x] Persistent header with branding and navigation.
* [x] Stylized background with blurred nature photo.
* [x] Compact search bar pins to header in State B.

### Phase 2 (US-DM-02) — Pending
* [ ] OKLCH color tokens, spacing scale, and type scale defined in `globals.css @theme`.
* [ ] Display font (Corben) and body font (Mada) loaded and applied globally.
* [ ] `app/loading.tsx` and `app/error.tsx` exist and render meaningful UIs.
* [ ] `page.tsx` wraps rooms section in `RoomsProvider`.
* [ ] Scroll lock applied via `RoomsContext` signal until location is selected.
* [ ] `border-left: 2px` separator in `HeaderNav` replaced.
* [ ] All layout theme values reference the new CSS tokens where applicable.

---

## 5. Handoff & Status Notes

* **Current State:** Phase 1 complete. Design tokens defined ad-hoc in Tailwind classes; no global `@theme` token layer exists yet.
* **Next Step:** Write token definitions to `globals.css`, update `layout.theme.ts` to reference them, add font imports to `layout.tsx`, create `loading.tsx` / `error.tsx`.
