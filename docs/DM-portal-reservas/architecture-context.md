# Good Practices — Monorepo Architecture & Code Review Checklist

> **Reference stack:** Next.js 15+ (App Router), React 19, TypeScript 5.8+, Tailwind CSS v4, HeroUI v3, TanStack Query. Monorepo made with Turborepo + pnpm.
> **Architecture:** Feature-Sliced Design (FSD) + Spec-Driven Development + Strict Theme Decoupling.

---

## 1. Monorepo Structure & Boundaries

The workspace strictly separates application logic from reusable generic UI elements:

* **`apps/portal-reservas/`**: The main Next.js application (this project). One of three apps; the others are `portal-admin` and `landing`.
* **`apps/portal-admin/`**: Admin dashboard (out of scope for this doc).
* **`apps/landing/`**: Marketing site (out of scope for this doc).
* **`packages/ui/`** (or `@hotel/ui`): Shared, pure-presentation component library (`Button`, `Calendar`, `Stepper`, `BrandLogo`). No business logic. Exposes a strict public API via `src/index.ts`. Also exports `theme.css` as a separate entry (`@hotel/ui/theme.css`). All reusable generic components MUST be exported in the barrel; if not in the barrel, apps cannot import them.
* **`packages/i18n/`** (or `@hotel/i18n`): Centralized internationalization engine. Provides `useI18n()` hook, `I18nProvider`, `SupportedLocale`, and `LOCALES` constants.
* **`packages/core/`** (or `@hotel/core`): Shared core utilities (out of scope).
* **`packages/db/`** (or `@hotel/db`): Database client (Supabase). Provides `createSupabaseServerClient`.

### 1.1 Internal Package Consumption

Apps consume packages via `workspace:*` protocol. The `@hotel/ui` package ships source-level exports (no build step) — consuming packages import `.ts`/`.tsx` files directly, relying on the bundler. The `theme.css` is imported in the app `globals.css` via `@import "@hotel/ui/theme.css"`.

### 1.2 CSS Token Architecture

The `@hotel/ui/theme.css` defines OKLCH-based color tokens (`forest-*`, `stone-*`, `gold-*`), font families, and easing curves using Tailwind CSS v4 `@theme inline` syntax. Apps import this file and extend it with app-specific tokens (e.g., `--animate-search-bar-shake` in `globals.css`). HeroUI dark/light theme overrides are also defined in `theme.css`.

---

## 2. Feature-Based Architecture (`src/features/`)

Inside `apps/portal-reservas`, every feature owns its isolated domain. Features: `auth`, `layout`, `rooms`, `search`. Cross-feature imports are strictly controlled via Barrel Exports (`index.ts`). Internal components, hooks, or constants are never imported directly by other features.

### 2.1 Feature Sub-Modules

Each feature may contain these sub-modules (not all are required):

| Sub-module | Purpose | Rules |
|------------|---------|-------|
| `components/` | React components. May contain `sub-components/` for decomposition. | NO business logic. NO direct fetch. |
| `hooks/` | Custom React hooks for state orchestration. | NO JSX. |
| `services/` | Async I/O (fetch / server actions). | NO JSX. NO hooks. |
| `context/` | React Context providers for horizontal state distribution. | Eliminates prop drilling. |
| `domain/` | Pure TypeScript types, interfaces, deterministic functions. | No React, no hooks, no JSX, no fetch. Fully testable with Node. |
| `constants/` | Hardcoded functional values, timers, variants. | Zero magic strings. ALL must be `Object.freeze()` + `as const`. |
| `i18n/` | Feature-specific translations (`[feature].texts.ts`) and strict TS types. | Zero hardcoded user-visible text. |
| `theme/` | Tailwind CSS class orchestrators (style dictionaries). | Zero Tailwind in JSX. |
| `utils/` | Pure utility functions specific to the feature. | No side effects. |
| `mock-data/` | Development mock/fixture data. | Excluded from i18n. Dynamic dates computed at import time. |
| `[feature].spec.md` | Spec-Driven Development document. | Single source of truth. |

### 2.2 Search-Bar Sub-Feature Pattern

The `search` feature contains a deeply nested `search-bar/` sub-feature at `features/search/components/search-bar/` with its own `context/`, `hooks/`, `constants/`, `domain/`, `theme/`, `utils/`, `sub-components/`, and `sub-components/sections/`. This pattern is used when a component is complex enough to be a self-contained orchestrator with its own internal architecture. The sub-feature has its own barrel export (`index.ts`).

### 2.2.1 Room Grouping Pattern (US-DM-04)

When guest count exceeds a single room's capacity, the `rooms` feature uses a **domain-level grouping algorithm** to create room packages:

* **Pure function** in `domain/grouping.ts` — no hooks, no JSX, no side effects.
* **Input:** `Room[]` + `guestCount` → **Output:** `(Room | RoomPackage)[]`.
* **Algorithm:** Greedy bin-packing with constraints (MAX_WASTE, MAX_ROOMS).
* **Rendering:** `PackageCard` wraps a primary `RoomCard` + decorative shadow cards + a package indicator badge.
* **Data flow:** `search.guestCount` → `page.tsx` → `RoomsContext.guestCount` → `useRoomPackages` hook → `groupRoomsIntoPackages()`.

The grouping algorithm is deterministic and pure — same inputs always produce the same output. Unit tests live in `domain/grouping.test.ts`.

### 2.3 Global Shared Code

Global shared code lives outside features (`app/`, `components/`, `hooks/`, `lib/`, `config/`, `locales/`, `shared/`, `theme/`). App pages only import and compose feature components — no inline logic.

### 2.4 Atomic File Organization Pattern (enforced since PR #24)

Every component must follow the **atomic separation** — one file for interfaces, one for styles, one for TSX:

* **Component Props interfaces** MUST be defined in `domain/types.ts` (or a dedicated `.types.ts` file for global components), NEVER inline in `.tsx` files.
* **Hook dependency/option interfaces** (`Use*Deps`, `Use*Options`) MUST also live in `domain/types.ts`.
* **Styles** MUST be in `.theme.ts` files, never inline Tailwind in JSX.
* **Component markup** lives in the `.tsx` file, importing its Props from the types file and styles from the theme file.

```
features/rooms/
├── domain/
│   └── types.ts          ← ALL component Props + domain types here
├── theme/
│   └── rooms.theme.ts    ← ALL style dictionaries here
└── components/
    └── RoomCard.tsx      ← Imports Props from domain/types, styles from theme
```

**Exception:** `packages/ui/` component Props go in `packages/ui/src/types/*.types.ts`.

### 2.5 App-Level Route Pages (`error.tsx`, `loading.tsx`)

Next.js route-level pages (`error.tsx`, `loading.tsx`) render **outside** the I18nProvider boundary. Therefore:

* Hardcoded user-visible strings MUST be extracted to a `constants/app-pages.constants.ts` file (not inline).
* Styles MUST be extracted to a `theme/app-pages.theme.ts` file (not inline Tailwind).
* These pages are the ONLY exception to the i18n rule — all other components MUST use `useI18n()`.

### 2.6 Hardcoded String Audit Rules

Every `aria-label`, `title`, `placeholder`, and visible text node MUST use i18n (`t.FEATURE.KEY`). Common violations caught in PR #24:

* `aria-label="Imágenes adicionales"` → `aria-label={t.ROOMS.GALLERY_IMAGES_LABEL}`
* `<div>Explorar Habitaciones</div>` → `<div>{t.ROOMS.BROWSE_ROOMS}</div>`
* `<h2>Algo salió mal</h2>` → `<h2>{APP_PAGE_STRINGS.ERROR_TITLE}</h2>` (app-level exception)

**Zero tolerance:** If a reviewer can find a hardcoded Spanish string in JSX, it's a bug.

---

## 3. Spec-Driven Development (SDD)

Every feature MUST be accompanied by a `[feature].spec.md`. Template sections:

* **Status & Version:** Phase and completeness (e.g., "completed (Phase 1 / US-DM-01)").
* **Objective:** High-level goal.
* **Scope & Boundaries:** "In Scope" and **"Out of Scope (Do Not Modify)"**.
* **Architecture & Context:** "Core Files Involved", "System Constraints & Known Pitfalls".
* **Acceptance Criteria:** Checkboxes linked to User Stories.
* **Handoff & Status Notes:** "Current State" and "Next Step".

---

## 4. Theme Decoupling (Total Elimination of Inline Styling)

Tailwind CSS classes are **strictly forbidden** from cluttering JSX.

* **Theme Files:** Styles are decoupled into `.theme.ts` files (e.g., `search-bar.theme.ts`, `layout.theme.ts`).
* **Style Dictionaries:** Exported as `const` objects with `as const` (e.g., `SEARCH_BAR_STYLES`).
* **Dynamic Styles via Functions:** State-dependent styles use functions returning template literals (e.g., `fieldValue: (hasValue: boolean) => "..."`).
* **CSS Variables & Tokens:** Components consume CSS tokens via Tailwind classes. Custom tokens defined in `@hotel/ui/theme.css` (OKLCH).
* **Allowed Inline `style={}`:** Only for truly dynamic values that cannot be expressed in Tailwind: `animationDelay` (stagger), `backgroundImage` URLs from data, `transform`/`opacity` transitions driven by state. Static values must be in theme files.
* **Result:** JSX is clean, focused on structural semantic HTML and logical rendering.

---

## 5. Single Responsibility Principle (SRP) & Orchestrator Pattern

Each file does ONE thing. Each component does ONE thing.

* **The Orchestrator Pattern:** Top-level feature components (e.g., `ModernSearchBar.tsx`, `RoomCard.tsx`) render almost zero native HTML. They consume custom hooks and pass aggregated state into a Context Provider.
* **Logic Extraction:** Complex logic never lives in components — it lives in `hooks/` or `domain/`.
* **Presentation Slices:** UI is split into hyper-focused sub-components that independently consume Context.
* **Component Length:** Max **120 lines** per file. Exceptions: `.theme.ts`, `auth/`, `mock-data/`, `.css`, `.spec.md`, `.texts.ts`, `.texts.type.ts`. A component > 60 lines of JSX needs splitting. A hook > 40 lines likely has multiple responsibilities.

### 5.1 Server vs. Client Components
* **Default to Server Components.**
* **Push `'use client'` Down:** Only for UI interactivity (hooks, context, browser APIs, event listeners). Every file using hooks or context MUST have the `"use client"` directive.

---

## 6. State Management & Context

### 6.1 Context-Based State Management (No Prop Drilling)
* State managed at Orchestrator level -> injected into Feature Provider.
* Deep sub-components consume exactly the slice they need from Context.
* Prop drilling beyond 2 levels is forbidden.

### 6.2 Choosing the Right State Tool
* **Local UI state:** `useState` (toggle, input).
* **Complex local state:** `useReducer` (pure functions, immutable updates, action types as constants).
* **Server/async state:** TanStack Query / SWR. NOT `useState`.
* **Shared client state:** Zustand / Jotai.
* **URL-driven state:** `useSearchParams` (Next.js). NOT `useState`.

---

## 7. Total Elimination of Magic Strings & Numbers

Zero tolerance for inline raw strings and numbers in logic.

* **Constants Files:** All functional strings and numbers centralized in `constants/` files.
* **No Data Constants in Component Files:** Component files (`.tsx`) MUST NOT declare standalone data constants — SVG `path` data, `viewBox` strings, icon maps, query strings, magic numbers, thresholds, delays. These belong in a dedicated `constants/` file (e.g. `<feature>-icons.const.ts` for SVG path/viewBox data, `<feature>.constants.ts` for thresholds/queries) and are imported by name. The ONLY module-level `const` permitted in a `.tsx` is a framework singleton that must live at module scope (e.g. `const Ctx = createContext(...)`). Concrete violation to reject in review:
  ```tsx
  // ❌ Declared at the top of a .tsx component file:
  const ICON_VIEW_BOX = "0 0 24 24";
  const PACKAGE_PATH = "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5";
  ```
  Move these to `constants/<feature>-icons.const.ts` (e.g. `export const ICON_VIEW_BOX = "0 0 24 24"` and an `ICON_PATHS` map) and reference `ICON_VIEW_BOX` / `ICON_PATHS.package` in the JSX.
* **Immutability:** ALL constant objects MUST use `Object.freeze()` AND `as const` (e.g., `export const X = Object.freeze({ ... } as const)`). This catches typos at compile-time.
* **Routes & Queries:** Zero hardcoded route strings outside `config/routes.ts`. Zero raw query key strings outside `config/queryKeys.ts`.
* **Environment Variables:** All env vars accessed through `config/env.ts`, never via `process.env` inline.
* **Mock Delays:** Mock timeout values (e.g., `ROOM_MOCK.AVAILABILITY_DELAY_MS`) must be in `constants/` files, never inline.
* **Duplicate Constants:** A constant or config object must exist in exactly ONE file. If two files need it, extract to a shared location.

---

## 8. Strict, Type-Safe Internationalization (i18n)

Zero hardcoded user-visible text.

* **Feature-Level Isolation:** Each feature has its own `[feature].texts.ts` mapped to `SupportedLocale`.
* **Global Aggregation:** All feature texts aggregated in `src/locales/translations.ts` under `AppTranslations`.
* **Type Safety:** Custom `useI18n()` hook provides IDE autocomplete and compile-time validation (`t.SEARCH.HERO.TITLE`). Missing keys fail the build.
* **Formatting:** Currency uses `Intl.NumberFormat`. Dates use `Intl.DateTimeFormat` with the current locale from `useI18n().locale`. Never hardcode locale strings like `"es-CR"`.
* **Pluralization:** Uses i18n plural rules, not template conditionals.

---

## 9. Pure Functions in Domain Layer

Domain functions have zero side effects and are deterministic.

* Return new arrays/objects — never mutate inputs.
* No JSX, no hooks, no `fetch`, no `localStorage`, no `document` access.
* Higher-order functions for configurable predicates.
* Located in `domain/` directories within features.
* **Grouping algorithms** (e.g., `domain/grouping.ts`) are pure functions that take data + constraints and return transformed data. They MUST have unit tests.

---

## 10. Async Operations and Error Handling

* **Service Layer:** All `fetch` calls abstracted into `services/` that validate `response.ok` and throw structured errors. Service functions throw — never return `null` on failure.
* **Server Actions:** Form submissions use React Server Actions or TanStack Query `useMutation`.
* **Error Boundaries:** `error.tsx` exists for ALL dynamic routes and the root route.
* **Loading States:** `loading.tsx` for route-level loading, `Suspense` for component-level. Loading state has visible UI.

---

## 11. Component Patterns and JSX Separation

* **Props:** Every component has a typed `Props` interface — no `any` anywhere in the codebase.
* **Keys:** Array rendering uses stable IDs as `key` — never array index.
* **No Direct DOM Manipulation:** No `document.getElementById`, `querySelector`, or inline `style` manipulation. Use declarative React and conditional classNames. Exception: `document.body.style.overflow` for scroll lock must be extracted to a shared `useScrollLock` hook.
* **`useEffect` as Last Resort:** Not for derived state (compute in render) or event handling (use JSX event props). Every `useEffect` must have a documented reason.
* **Separation of Logic:** Zero inline logic in JSX event handlers — extract to named handlers. Zero business logic in JSX expressions.
* **Navigation:** Use Next.js `useRouter` for client-side navigation. Never use `window.location.href`.
* **No `any` Types:** Every `any` is a bug. Use proper types, `unknown`, or generics.

---

## 12. Naming Conventions

* **Components:** PascalCase (`ProductCard`).
* **Custom Hooks:** camelCase with `use` prefix (`useProducts`).
* **Event Handlers:** `handle` prefix for implementations (`handleCardClick`), `on` prefix for props (`onSelect`).
* **Booleans:** `is`, `has`, `should`, `can` prefix.
* **Types & Interfaces:** PascalCase, no `I` prefix. Props interfaces: `ComponentName + Props`.

---

## 13. Accessibility (A11y) & Performance

* **Semantic HTML:** Every interactive element is `<button>` or `<a>` — never `<div>` or `<span>`. Buttons have `type="button"`.
* **Labels:** Every `<input>` has `<label>` with `htmlFor`. Images have descriptive `alt`.
* **States:** Error states use `role="alert"`. Loading states use `aria-busy`.
* **Performance:** `memo`, `useMemo`, `useCallback` only with documented reason. Images use `next/image` — never raw `<img>` for content images.

---

## 14. Clean Code — Eliminating Noise

* **Dead Code:** Remove unused exports and dead components. Zero unused imports.
* **Console Logs:** Zero `console.log` in production code.
* **DRY:** Logic or string in two places -> extract to shared utility, hook, or constant.
* **Prop Drilling:** Beyond 2 levels -> use context, Zustand, or component composition.
* **Barrel Exports:** Each feature directory should have an `index.ts` exporting its public API. The `@hotel/ui` barrel must export all public components AND their theme constants.

---

## Master Code Review Checklist

Before considering a PR complete, verify:

### Architecture & SDD
- [ ] Feature-based folder structure with appropriate sub-modules.
- [ ] Feature implements `[feature].spec.md` with scope boundaries respected.
- [ ] `app/` pages only compose — no inline logic.
- [ ] No cross-feature coupling except through explicit shared interfaces or `index.ts` barrel files.
- [ ] `'use client'` minimized — only where strictly necessary. Every client component has the directive.

### Atomic File Separation (PR #24 enforcement)
- [ ] ALL component Props interfaces in `domain/types.ts`, NEVER inline in `.tsx`.
- [ ] ALL hook dependency/option interfaces in `domain/types.ts`.
- [ ] ALL styles in `.theme.ts` files, NEVER inline Tailwind in JSX.
- [ ] App-level pages (`error.tsx`, `loading.tsx`) have constants in `constants/app-pages.constants.ts` and styles in `theme/app-pages.theme.ts`.
- [ ] No hardcoded Spanish strings in `aria-label`, `title`, `placeholder`, or visible text — all use i18n.

### Constants, Configuration & Theming
- [ ] No hardcoded route strings, query keys, or API URLs.
- [ ] No standalone data constants (SVG `path`/`viewBox` data, icon maps, query strings, magic numbers/thresholds) declared in `.tsx` component files — they live in `constants/` files and are imported by name.
- [ ] ALL constant objects use `Object.freeze()` AND `as const`.
- [ ] All env vars accessed through `config/env.ts`.
- [ ] All CSS values are CSS variables or Tailwind tokens consumed via isolated `.theme.ts` files.
- [ ] Zero inline Tailwind classes in JSX. Zero inline `style={}` except for truly dynamic values.

### SRP & Orchestration
- [ ] Top-level orchestrator components consume hooks and provide context.
- [ ] Components render — they do not fetch or contain business logic.
- [ ] Hooks orchestrate — they do not render.
- [ ] Domain functions are pure — no hooks, JSX, fetch, or DOM.
- [ ] No file exceeds 120 lines (except exempted types).

### State Management
- [ ] Server state -> TanStack Query / SWR.
- [ ] URL state -> `useSearchParams`.
- [ ] Global client state -> Zustand / Jotai.
- [ ] State updated immutably, action types are constants.
- [ ] Deep components consume state via Context, no prop drilling beyond 2 levels.

### Async and Error Handling
- [ ] Every `fetch()` validates `response.ok` inside a service layer.
- [ ] Service functions throw — never return `null` on failure.
- [ ] `error.tsx` exists for root and all dynamic routes.
- [ ] `loading.tsx` or `Suspense` exists for all async routes/components.

### i18n
- [ ] Zero hardcoded user-visible strings; feature strings isolated in `[feature].texts.ts`.
- [ ] Type-safe compile-time validation via `useI18n()` hook.
- [ ] All formatting (currency, counts, dates) routes through i18n or `Intl` API with current locale.
- [ ] No hardcoded locale strings (e.g., `"es-CR"`) — use `useI18n().locale`.

### Naming & Components
- [ ] Components: PascalCase. Hooks: `use` prefix. Handlers: `handle`/`on` prefixes. Booleans: `is/has/should/can`.
- [ ] Every component has a typed `Props` interface — no `any` anywhere.
- [ ] `key` props use stable IDs — never array index.
- [ ] No `useEffect` for derived state or event handling.

### Accessibility (A11y) & Clean Code
- [ ] Every input has a `<label>` with `htmlFor`.
- [ ] Interactive elements are `<button>` or `<a>`.
- [ ] Images use `next/image` and have `alt` attributes.
- [ ] Zero `console.log` in production code.
- [ ] Zero dead/unused code or imports.
- [ ] No duplicated logic or data structures across files.
- [ ] Every feature has barrel exports (`index.ts`).
