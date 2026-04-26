# Good Practices — Monorepo Architecture & Code Review Checklist

> **Reference stack:** Next.js 14+ (App Router), React 18+, TypeScript, Tailwind CSS, HeroUI, TanStack Query.
> **Architecture:** Feature-Sliced Design (FSD) + Spec-Driven Development + Strict Theme Decoupling.

---

## 1. Monorepo Structure & Boundaries

The workspace strictly separates application logic from reusable generic UI elements:

* **`apps/portal-reservas/`**: The main Next.js application. Contains all business logic, routing, domain features, and complex orchestrator components.
* **`packages/ui/`** (or `@hotel/ui`): A shared, pure-presentation component library (e.g., `Button`, `Calendar`, `Stepper`). It has no knowledge of business logic, feature contexts, or translations. Exposes a strict public API via `src/index.ts`. All reusable components MUST be exported in this barrel file; if it is not in the barrel file, it cannot be used by the applications.
* **`packages/i18n/`** (or `@hotel/i18n`): Centralized internationalization engine.

---

## 2. Feature-Based Architecture (`src/features/`)

Inside `apps/portal-reservas`, every feature (e.g., `search`, `auth`, `rooms`, `layout`) owns its own isolated domain. Cross-feature imports are strictly controlled via Barrel Exports (`index.ts`). This ensures that internal components, hooks, or constants are not accidentally imported by other features, strictly maintaining architectural boundaries and preventing spaghetti dependencies.

Inside a typical feature block, the separation of concerns is meticulously maintained:

* **`components/`**: React components. Often contains `sub-components/` to break down large UIs. NO business logic. NO direct fetch calls.
* **`hooks/`**: Custom React hooks orchestrating complex state. NO JSX.
* **`services/`**: Async I/O (fetch / server actions). NO JSX. NO hooks.
* **`context/`**: React Context providers (e.g., `SearchBarContext`) designed to distribute state horizontally and eliminate prop drilling.
* **`domain/`**: Pure TypeScript types, interfaces, and deterministic functions. No React or UI logic is allowed here. Fully testable with Node.
* **`constants/`**: Hardcoded functional values, timers, variants. Zero magic strings.
* **`i18n/`**: Feature-specific translations (e.g., `search.texts.ts`) and their strict TS definitions.
* **`theme/`**: Tailwind CSS class orchestrators (no Tailwind directly in JSX).
* **`[feature].spec.md`**: Spec-Driven Development document.

Global shared code lives outside features (e.g., in `app/`, `components/`, `hooks/`, `lib/`, `config/`). `app/` pages only import and compose feature components — no inline logic.

---

## 3. Spec-Driven Development (SDD)

Every feature MUST be accompanied by a `[feature].spec.md` (e.g., `search.spec.md`, `auth.spec.md`). This acts as the single source of truth for the development lifecycle, enforcing a standardized template:

* **Status & Version:** Tracks the phase and completeness (e.g., "completed (Phase 1 / US-DM-01)").
* **Objective:** High-level description of the feature's goal.
* **Scope & Boundaries:** Explicitly defines what is "In Scope" and, critically, what is **"Out of Scope (Do Not Modify)"** to prevent feature creep.
* **Architecture & Context:** Lists "Core Files Involved" and "System Constraints & Known Pitfalls", ensuring immediate situational awareness.
* **Acceptance Criteria:** Concrete checkboxes linked to User Stories (e.g., US-DM-01) validating feature completeness.
* **Handoff & Status Notes:** Documents the "Current State" and "Next Step", crucial for async collaboration.

---

## 4. Theme Decoupling (Total Elimination of Inline Styling)

Tailwind CSS classes are heavily utilized but are **strictly forbidden** from cluttering the JSX.

* **Theme Files:** Styles are decoupled into specific `.theme.ts` files (e.g., `search-bar.theme.ts`, `layout.theme.ts`).
* **Style Dictionaries:** Styles are exported as constant objects (e.g., `export const SEARCH_BAR_STYLES = { container: "relative w-full...", ... }`).
* **Dynamic Styles via Functions:** For styles depending on state, use functions returning template literals (e.g., `fieldValue: (hasValue: boolean) => "... ${hasValue ? 'text-emerald-950' : 'text-neutral-400'}"`).
* **CSS Variables & Tokens:** Components should consume CSS tokens via Tailwind classes, and all custom tokens must be defined globally. The `theme.css` file defines global `oklch` CSS variables for dark/light modes aligning with HeroUI standards.
* **Result:** JSX remains incredibly clean and focused purely on structural semantic HTML and logical rendering, rather than visual clutter.

---

## 5. Single Responsibility Principle (SRP) & Orchestrator Pattern

Each file does ONE thing. Each component does ONE thing.

* **The Orchestrator Pattern:** Top-level feature components (e.g., `ModernSearchBar.tsx`) render almost zero native HTML. Instead, they act as orchestrators that consume various custom hooks (e.g., `useSearchBarState`, `useDateSelection`) and pass the aggregated state into a Context Provider.
* **Logic Extraction:** Complex validation or state transition logic never lives in the component; it lives in dedicated `hooks/` (e.g., `useSearchValidation`).
* **Presentation Slices:** The actual UI is split into hyper-focused sub-components (`HeroCalendarFloat.tsx`, `DestinationPopover.tsx`) which independently consume the Context they need.
* **Component Length:** A component that does not fit on screen (> 50–60 lines of JSX) needs to be split. A custom hook > 40 lines likely has more than one responsibility — extract sub-hooks.

### 5.1 Server vs. Client Components
* **Default to Server Components:** Server components can fetch data directly, access server resources, and use async/await.
* **Push `'use client'` Down:** Only use `'use client'` for UI interactivity (hooks, context, browser APIs, event listeners), and push it as far down the tree as possible.

---

## 6. State Management & Context

### 6.1 Context-Based State Management (No Prop Drilling)
To maintain a clean component tree and avoid passing props through intermediate components that don't need them:
* State is managed at the Orchestrator level and injected into a Feature-specific Provider (e.g., `SearchBarProvider`).
* Deeply nested sub-components consume exactly the slice of state they require directly from the Context.

### 6.2 Choosing the Right State Tool
* **Local UI state:** `useState` (e.g., toggle, input).
* **Complex local state:** `useReducer` (must be pure functions with zero side effects, state updated immutably, action types as constants).
* **Server/async state:** TanStack Query / SWR. Server state is NOT stored in `useState`.
* **Shared client state:** Zustand / Jotai.
* **URL-driven state:** `useSearchParams` (Next.js). URL state lives in `useSearchParams`, not in `useState`.

---

## 7. Total Elimination of Magic Strings & Numbers

The codebase exhibits zero tolerance for inline raw strings and numbers in logic.

* **Constants Files:** All functional strings (e.g., section identifiers like `"checkIn"`) and numbers (e.g., `TIMEOUTS.SEARCH_TRIGGER_DELAY: 800`) are centralized in `constants/` files.
* **Immutability:** Constants are strictly typed and immutable, using `Object.freeze()` and `as const`, ensuring typos are caught at compile-time (e.g., `SEARCH_VARIANTS.COMPACT`).
* **Routes & Queries:** Zero hardcoded route strings outside `config/routes.ts`. Zero raw query key strings outside `config/queryKeys.ts`.
* **Environment Variables:** All env vars are accessed through a single source of truth like `config/env.ts`, never via `process.env` inline.

---

## 8. Strict, Type-Safe Internationalization (i18n)

The architecture prevents hardcoded user-visible text entirely.

* **Feature-Level Isolation:** Each feature maintains its own `[feature].texts.ts` dictionary mapped to a `SupportedLocale`.
* **Global Aggregation:** All feature texts are aggregated in `src/locales/translations.ts` under a master `AppTranslations` type.
* **Type Safety:** The custom `useI18n()` hook provides total IDE autocomplete and compile-time validation for translation paths (e.g., `t.SEARCH.HERO.TITLE`). If a translation key changes or is missing, the build fails.
* **Formatting:** Currency formatting uses `Intl.NumberFormat` or i18n format functions — not template literals. Pluralization uses i18n plural rules.

---

## 9. Pure Functions in Domain Layer

Domain functions must have zero side effects and be deterministic. Same rules as Vanilla JS — React does not change this.
* Domain functions return new arrays/objects — never mutate inputs.
* No JSX, no hooks, no `fetch`, no `localStorage` in `domain/` files.
* Higher-order functions should be used to create configurable predicates.

---

## 10. Async Operations and Error Handling

* **Service Layer (fetch wrapper):** All `fetch` calls should be abstracted into a `services/` layer that validates `response.ok` and throws structured errors. Service functions throw errors — they do NOT return `null` on failure.
* **Server Actions — Mutations:** Form submissions and data mutations should utilize React Server Actions or TanStack Query `useMutation`.
* **Error Boundaries:** App Router pages delegate error handling to `error.tsx` boundaries. `error.tsx` exists for all dynamic routes.
* **Loading States:** Loading state has a visible UI. `loading.tsx` is used for route-level loading, `Suspense` for component-level.

---

## 11. Component Patterns and JSX Separation

* **Props:** Every component has a typed `Props` interface — no `any`.
* **Keys:** Array rendering uses stable IDs as `key` — never array index, as it breaks reconciliation on reorder/filter.
* **No Direct DOM Manipulation:** No `document.getElementById`, `querySelector`, or inline `style` manipulation; use declarative React and conditional classNames instead.
* **`useEffect` as a Last Resort:** Do not use `useEffect` to sync derived state (compute directly in render) or for event handling (use JSX event props).
* **Separation of Logic:** Zero inline logic in JSX event handlers — always extract to a named handler. Zero business logic in JSX expressions.

---

## 12. Naming Conventions

* **Components:** PascalCase (e.g., `ProductCard`).
* **Custom Hooks:** camelCase with `use` prefix (e.g., `useProducts`).
* **Event Handlers:** `handle` prefix for implementations (e.g., `handleCardClick`), `on` prefix for props (e.g., `onSelect`).
* **Booleans:** `is`, `has`, `should`, `can` prefix.
* **Types & Interfaces:** Types are PascalCase, Interfaces are PascalCase (no `I` prefix), and Props interfaces are `ComponentName + Props`.

---

## 13. Accessibility (A11y) & Performance

* **Semantic HTML:** Every interactive element is a `<button>` or `<a>` — never a `<div>` or `<span>`. Buttons have `type="button"` to prevent accidental form submission.
* **Labels & Descriptions:** Every `<input>` has a `<label>` with a matching `htmlFor` attribute. Images have descriptive `alt` attributes.
* **States:** Error states use `role="alert"`. Loading states use `aria-busy`.
* **Performance:** Do not optimize prematurely. `memo`, `useMemo`, `useCallback` must have a documented reason for existing. Images must use `next/image` — never `<img>` for content images.

---

## 14. Clean Code — Eliminating Noise

* **Dead Code:** Remove unused exports and dead components. Zero unused imports (enabled via ESLint).
* **Console Logs:** Zero `console.log` calls in committed production code.
* **DRY (Don't Repeat Yourself):** Any logic or string in two places must be extracted to a shared utility, hook, or constant.
* **Prop Drilling:** Prop drilling beyond 2 levels is forbidden → use context, Zustand, or component composition.

---

## Master Code Review Checklist

Before considering a PR complete, verify:

### Architecture & SDD
- [ ] Feature-based folder structure with `domain/`, `components/`, `hooks/`, `services/`, `context/`, `theme/`, `i18n/`, `constants/` layers.
- [ ] Feature explicitly implements `[feature].spec.md` with scope boundaries respected.
- [ ] `app/` pages only compose — no inline logic.
- [ ] No cross-feature coupling except through explicit shared interfaces or `index.ts` barrel files.
- [ ] `'use client'` minimized — only where strictly necessary.

### Constants, Configuration & Theming
- [ ] No hardcoded route strings, query keys, or API URLs.
- [ ] All constant objects are frozen with `Object.freeze()` and typed with `as const`.
- [ ] All env vars accessed through `config/env.ts`.
- [ ] All CSS values are CSS variables or Tailwind tokens consumed via isolated `.theme.ts` files.
- [ ] Zero inline styling or Tailwind classes cluttering the JSX.

### SRP & Orchestration
- [ ] Top-level orchestrator components consume hooks and provide context instead of passing deep props.
- [ ] Components render — they do not fetch or contain business logic.
- [ ] Hooks orchestrate — they do not render.
- [ ] Domain functions are pure — they do not use hooks or JSX.

### State Management
- [ ] Server state → TanStack Query / SWR.
- [ ] URL state → `useSearchParams`.
- [ ] Global client state → Zustand / Jotai.
- [ ] State is always updated immutably and action types are constants.
- [ ] Deep components consume state via Context, avoiding prop drilling beyond 2 levels.

### Async and Error Handling
- [ ] Every `fetch()` validates `response.ok` inside a service layer.
- [ ] Service functions throw — never return `null` on failure.
- [ ] `error.tsx` exists for all dynamic routes.
- [ ] `loading.tsx` or `Suspense` exists for all async routes/components.

### i18n
- [ ] Zero hardcoded user-visible strings; feature strings isolated in `[feature].texts.ts`.
- [ ] Type-safe compile-time validation via `useI18n()` hook.
- [ ] All formatting (currency, counts, dates) routes through i18n or `Intl` API.

### Naming & Components
- [ ] Components: PascalCase. Hooks: `use` prefix. Handlers: `handle`/`on` prefixes. Booleans: `is/has/should/can`.
- [ ] Every component has a typed `Props` interface — no `any`.
- [ ] `key` props use stable IDs — never array index.
- [ ] No `useEffect` for derived state or event handling.

### Accessibility (A11y) & Clean Code
- [ ] Every input has a `<label>` with `htmlFor`.
- [ ] Interactive elements are `<button>` or `<a>`.
- [ ] Images use `next/image` and have `alt` attributes.
- [ ] Zero `console.log` in production code.
- [ ] Zero dead/unused code or imports.