# Good Practices — Next.js / React Code Review Checklist

> Adapted from the Vanilla JS architecture reference.
> Reference stack: Next.js 14+ (App Router), React 18+, TypeScript, CSS Modules / Tailwind, TanStack Query or SWR.

---

## 1. Folder Structure — Feature-Based Architecture

Every feature owns its own folder. The layers map to React/Next.js primitives.

```
feature-name/
├── domain/          ← Pure logic. NO JSX. NO hooks. NO fetch. Fully testable with Node.
├── components/      ← React components. NO business logic. NO direct fetch calls.
├── hooks/           ← Custom hooks. Orchestrate state + services. NO JSX.
├── services/        ← Async I/O (fetch / server actions). NO JSX. NO hooks.
└── config/          ← Constants and configuration specific to this feature.
```

Global shared code lives outside features:

```
app/                 ← Next.js App Router pages and layouts (routing only)
components/          ← Shared, reusable UI components
hooks/               ← Shared custom hooks
lib/                 ← Shared pure utilities (domain-level)
services/            ← Shared API/service layer
config/              ← App-wide constants (routes, API, roles, etc.)
types/               ← Shared TypeScript interfaces and types
```

**Checkpoints:**
- [ ] Each logical concern (products, filters, auth, i18n, cart) has its own top-level feature folder.
- [ ] `domain/` files contain zero JSX, zero hooks, zero `fetch` calls.
- [ ] `components/` files contain zero business logic (no filtering, sorting, data transformation).
- [ ] `components/[ComponentName]/[ComponentName].tsx` Only UI HTML RENDERING. tsx files must import custom hooks, server actions, constants, etc. Its unique responsability is render.
- [ ] `components/[ComponentName]/[ComponentName].interface.ts` Only exports the interface of its component
- [ ] `components/[ComponentName]/[ComponentName].styles.ts` Only exportas a constant that defines each className used in the component
- [ ] `services/` files only perform async I/O — no JSX, no hooks.
- [ ] `hooks/` orchestrate but do not render — they return data/handlers, not JSX.
- [ ] `app/` pages only import and compose feature components — no inline logic.
- [ ] No cross-feature imports except through explicit shared interfaces.

---

## 2. Constants — No Magic Numbers, No Hardcoded Strings

### 2.1 Route Constants

```ts
// config/routes.ts
export const ROUTES = Object.freeze({
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: (id: string) => `/products/${id}`,
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },
})

// BAD
<Link href="/products/123">...</Link>

// GOOD
<Link href={ROUTES.PRODUCT_DETAIL(product.id)}>...</Link>
```

### 2.2 Query Key Constants (TanStack Query / SWR)

```ts
// config/queryKeys.ts
export const QUERY_KEYS = Object.freeze({
  PRODUCTS: 'products',
  PRODUCT_DETAIL: (id: string) => ['products', id] as const,
  USER_FAVORITES: (userId: string) => ['favorites', userId] as const,
})

// BAD
useQuery({ queryKey: ['products'], ... })

// GOOD
useQuery({ queryKey: [QUERY_KEYS.PRODUCTS], ... })
```

### 2.3 Application Constants

```ts
// domain/roles.ts
export const ROLES = Object.freeze({ ADMIN: 'admin', USER: 'user', GUEST: 'guest' } as const)
export type Role = typeof ROLES[keyof typeof ROLES]

// domain/status.ts
export const STATUS = Object.freeze({ ACTIVE: 'active', INACTIVE: 'inactive' } as const)

// products/config/api.ts
export const API_CONFIG = Object.freeze({
  BASE_URL: process.env.NEXT_PUBLIC_API_URL ?? 'https://api.example.com',
  ENDPOINTS: Object.freeze({ PRODUCTS: '/products', USERS: '/users' }),
  LIMITS: Object.freeze({ DEFAULT: 30, MAX: 100 }),
})
```

### 2.4 Environment Variables

```ts
// config/env.ts — single source of truth for env vars
export const ENV = Object.freeze({
  API_URL: process.env.NEXT_PUBLIC_API_URL!,
  IS_DEV: process.env.NODE_ENV === 'development',
})

// BAD — scattered across files
fetch(process.env.NEXT_PUBLIC_API_URL + '/products')

// GOOD
fetch(ENV.API_URL + API_CONFIG.ENDPOINTS.PRODUCTS)
```

### 2.5 CSS Variables — No Magic Numbers in CSS

```css
/* BAD */
.card { padding: 16px; border-radius: 8px; color: #2563eb; }
.shimmer { animation: shimmer 1.4s infinite; }

/* GOOD — globals.css or tokens.css */
:root {
  --color-primary: #2563eb;
  --color-danger: #ef4444;
  --color-text-secondary: #9ca3af;
  --radius-md: 8px;
  --spacing-md: 16px;
  --duration-shimmer: 1.4s;
}

.card { padding: var(--spacing-md); border-radius: var(--radius-md); color: var(--color-primary); }
.shimmer { animation: shimmer var(--duration-shimmer) infinite; }
```

> If using Tailwind: define all custom tokens in `tailwind.config.ts` — never use arbitrary values like `p-[16px]` when a semantic token exists.

**Checkpoints:**
- [ ] Zero hardcoded route strings outside `config/routes.ts`.
- [ ] Zero raw query key strings outside `config/queryKeys.ts`.
- [ ] All env vars accessed through `config/env.ts`, never via `process.env` inline.
- [ ] No numeric literals in business logic — all in named constants.
- [ ] No string literals for roles, statuses, types — always use typed constants.
- [ ] All constant objects are frozen with `Object.freeze()` and typed with `as const`.
- [ ] All CSS values are CSS variables or Tailwind tokens — no hardcoded colors or sizes.

### 2.6 Form Field Names

BAD
```tsx
<input name="confirmPassword"/>
```

GOOD
```tsx
<input name={REGISTER_FORM_FIELD.CONFIRM_PASSWORD}/>
```



---

## 3. Single Responsibility Principle

Each file does ONE thing. Each component does ONE thing.

### 3.1 Component vs. Hook vs. Domain Split

| File | Allowed | Not Allowed |
|------|---------|-------------|
| `components/ProductCard/ProductCard.tsx` | Render JSX, handle UI events | Fetch data, business logic |
| `components/ProductList/ProductList.tsx` | Compose `ProductCard` components | Filter/sort products |
| `hooks/useProducts.ts` | Fetch + manage product state | Render JSX |
| `hooks/useProductFilters.ts` | Manage filter state + derived data | Render JSX, fetch |
| `domain/filterProducts.ts` | Pure filter functions | JSX, hooks, fetch |
| `services/productService.ts` | fetch + parse + error wrapping | JSX, hooks, business logic |
| `app/products/page.tsx` | Compose feature components | Inline logic, direct fetch |

### 3.2 Server Components vs. Client Components

```tsx
// app/products/page.tsx — Server Component (default in App Router)
// Can: fetch data directly, access server resources, use async/await
// Cannot: use hooks, browser APIs, event handlers

import { ProductList } from '@/features/products/components/ProductList'
import { fetchProducts } from '@/features/products/services/productService'

export default async function ProductsPage() {
  const products = await fetchProducts()
  return <ProductList products={products} />
}
```

```tsx
// features/products/components/ProductList.tsx — Client Component
// 'use client' is required only when using hooks or browser events
'use client'

import { useState } from 'react'
import { ProductCard } from './ProductCard'
import type { Product } from '../types'

interface ProductListProps {
  products: Product[]
}

export const ProductList = ({ products }: ProductListProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  return (
    <ul>
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          isSelected={selectedId === product.id}
          onSelect={setSelectedId}
        />
      ))}
    </ul>
  )
}
```

**Rule:** Default to Server Components. Add `'use client'` only when necessary (hooks, browser events, browser APIs). Push `'use client'` as far down the tree as possible.

### 3.3 Component and Function Length

- A component that does not fit on screen (> 50–60 lines of JSX) needs to be split.
- A custom hook > 40 lines likely has more than one responsibility — extract sub-hooks.
- If you need a comment to explain a block inside a function, that block should be its own function.

**Checkpoints:**
- [ ] `'use client'` appears only when strictly necessary.
- [ ] Server Components fetch data; Client Components manage interaction.
- [ ] No component file mixes rendering with business logic.
- [ ] Custom hooks return data and handlers — never JSX.
- [ ] `app/` page files are max ~20 lines: compose feature components and pass data.
- [ ] Every function and component has a name that fully describes what it does.

---

## 4. Naming Conventions

### 4.1 Components — PascalCase

```tsx
// BAD
export const productCard = () => { ... }
export const product_list = () => { ... }

// GOOD
export const ProductCard = () => { ... }
export const ProductList = () => { ... }
```

### 4.2 Custom Hooks — camelCase with `use` prefix

```ts
// BAD
const products = getProducts()
const filterState = useFiltering()

// GOOD
const { products, isLoading } = useProducts()
const { filters, setFilter } = useProductFilters()
```

### 4.3 Event Handlers — `handle` prefix

```tsx
// BAD
const click = () => { ... }
const onChange = () => { ... }

// GOOD
const handleCardClick = () => { ... }
const handleLanguageChange = () => { ... }
```

### 4.4 Booleans — `is`, `has`, `should`, `can` prefix

```ts
const isLoading = true
const hasError = false
const canEdit = user.role === ROLES.ADMIN
const shouldShowSkeleton = isLoading && !data
```

### 4.5 Types and Interfaces

```ts
// Types: PascalCase
type ProductId = string
type SortDirection = 'asc' | 'desc'

// Interfaces: PascalCase, no `I` prefix
interface Product {
  id: ProductId
  title: string
  price: number
}

// Props interfaces: ComponentName + Props
interface ProductCardProps {
  product: Product
  onSelect: (id: ProductId) => void
  isSelected: boolean
}
```

### 4.6 CSS Modules / BEM

```css
/* ProductCard.module.css */
.productCard { }
.productCard__title { }
.productCard__favoriteButton { }
.productCard__favoriteButton--active { }
```

```tsx
import styles from './ProductCard.module.css'

<div className={styles.productCard}>
  <h2 className={styles.productCard__title}>{product.title}</h2>
</div>
```

**Checkpoints:**
- [ ] All components are PascalCase.
- [ ] All custom hooks start with `use`.
- [ ] All event handler props start with `on` (`onSelect`, `onChange`).
- [ ] All event handler implementations start with `handle` (`handleSelect`, `handleChange`).
- [ ] Booleans start with `is`, `has`, `should`, `can`.
- [ ] No abbreviated names that lose meaning (`usr`, `prod`, `btn`, `cfg`).
- [ ] CSS Modules classes follow BEM, camelCase when needed by JS.

### 4.7 Imported ClassNames Constants

Class names constants usually are too long or complex.

BAD
```tsx
import {ACTIVATION_FORM_WRAPPER_STYLES} from "./ACTIVATION_FORM_WRAPPER_STYLES.styles"

<form className={ACTIVATION_FORM_WRAPPER_STYLES.form}>
```

GOOD
```tsx
import {ACTIVATION_FORM_WRAPPER_STYLES as STYLES} from "./ACTIVATION_FORM_WRAPPER_STYLES.styles"

<form className={STYLES.form}>
``
---

## 5. State Management

### 5.1 Choose the Right State Tool

| State Type | Recommended Tool |
|------------|-----------------|
| Local UI state (toggle, input) | `useState` |
| Complex local state with transitions | `useReducer` |
| Server/async state (fetch, cache) | TanStack Query / SWR |
| Shared client state (auth, cart, theme) | Zustand / Jotai |
| URL-driven state (filters, pagination) | `useSearchParams` (Next.js) |
| Form state | React Hook Form |

### 5.2 `useReducer` — Local Complex State

```ts
// products/hooks/useProductFilters.ts

// Action types as constants
const FILTER_ACTIONS = Object.freeze({
  SET_SEARCH: 'SET_SEARCH',
  SET_MIN_PRICE: 'SET_MIN_PRICE',
  RESET: 'RESET',
} as const)

type FilterAction =
  | { type: typeof FILTER_ACTIONS.SET_SEARCH; payload: string }
  | { type: typeof FILTER_ACTIONS.SET_MIN_PRICE; payload: number }
  | { type: typeof FILTER_ACTIONS.RESET }

// Reducer — pure function
const filterReducer = (state: FilterState, action: FilterAction): FilterState => {
  switch (action.type) {
    case FILTER_ACTIONS.SET_SEARCH:
      return { ...state, search: action.payload }
    case FILTER_ACTIONS.SET_MIN_PRICE:
      return { ...state, minPrice: action.payload }
    case FILTER_ACTIONS.RESET:
      return INITIAL_FILTER_STATE
    default:
      return state
  }
}

export const useProductFilters = () => {
  const [filters, dispatch] = useReducer(filterReducer, INITIAL_FILTER_STATE)

  const setSearch = (search: string) =>
    dispatch({ type: FILTER_ACTIONS.SET_SEARCH, payload: search })

  const resetFilters = () =>
    dispatch({ type: FILTER_ACTIONS.RESET })

  return { filters, setSearch, resetFilters }
}
```

### 5.3 Global State — Zustand

```ts
// store/useCartStore.ts
import { create } from 'zustand'

interface CartState {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (itemId: string) => void
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => ({ items: [...state.items, item] })),
  removeItem: (itemId) =>
    set((state) => ({ items: state.items.filter(i => i.id !== itemId) })),
}))
```

**Checkpoints:**
- [ ] Reducers are pure functions — zero side effects.
- [ ] State is always updated immutably (spread operator, array methods that return new arrays).
- [ ] All action type strings are constants — no raw strings in dispatches.
- [ ] Server state (fetched data) is NOT stored in `useState` or Zustand — use TanStack Query / SWR.
- [ ] URL state (filters, page) lives in `useSearchParams`, not in `useState`.

---

## 6. Async Operations and Error Handling

### 6.1 Service Layer (fetch wrapper)

```ts
// products/services/productService.ts
import { API_CONFIG } from '../config/api'

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(
    `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PRODUCTS}?limit=${API_CONFIG.LIMITS.DEFAULT}`
  )
  if (!response.ok) throw new Error(`HTTP ${response.status}: failed to fetch products`)
  const data = await response.json()
  return data.products
}
```

### 6.2 TanStack Query — Client-side Async State

```tsx
// products/hooks/useProducts.ts
import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '../services/productService'
import { QUERY_KEYS } from '@/config/queryKeys'

export const useProducts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Usage in component — clean, no try/catch boilerplate
const { data: products, isLoading, isError, error } = useProducts()
```

### 6.3 Server Components — Server-side Async (App Router)

```tsx
// app/products/page.tsx
import { fetchProducts } from '@/features/products/services/productService'

export default async function ProductsPage() {
  // No try/catch needed here — Next.js error.tsx handles it
  const products = await fetchProducts()
  return <ProductList products={products} />
}
```

```tsx
// app/products/error.tsx — global error boundary for this route
'use client'
export default function ProductsError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div role="alert">
      <p>{error.message}</p>
      <button type="button" onClick={reset}>Try again</button>
    </div>
  )
}
```

### 6.4 Server Actions — Mutations

```ts
// products/services/productActions.ts
'use server'
import { revalidatePath } from 'next/cache'
import { ROUTES } from '@/config/routes'

export const createProduct = async (formData: FormData): Promise<void> => {
  const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PRODUCTS}`, {
    method: 'POST',
    body: JSON.stringify(Object.fromEntries(formData)),
  })
  if (!response.ok) throw new Error(`Failed to create product: ${response.status}`)
  revalidatePath(ROUTES.PRODUCTS)
}
```

**Checkpoints:**
- [ ] Every `fetch()` call validates `response.ok` and throws on failure.
- [ ] Service functions throw errors — they do NOT return `null` on failure.
- [ ] Server state is managed by TanStack Query / SWR — not by manual `useState`.
- [ ] App Router pages delegate error handling to `error.tsx` boundaries.
- [ ] Mutations use Server Actions or TanStack Query `useMutation`.
- [ ] Loading state has a visible UI (skeleton, spinner, or `loading.tsx`).
- [ ] Error state has a visible UI — not just a `console.error`.
- [ ] `loading.tsx` used for route-level loading, `Suspense` for component-level.

---

## 7. Component Patterns

### 7.1 Props — Explicit, Typed Interfaces

```tsx
// BAD
const ProductCard = (props: any) => { ... }
const ProductCard = ({ product, stuff, fn }) => { ... }

// GOOD
interface ProductCardProps {
  product: Product
  isSelected: boolean
  onSelect: (id: string) => void
}

export const ProductCard = ({ product, isSelected, onSelect }: ProductCardProps) => { ... }
```

### 7.2 Key Props — Never Use Index

```tsx
// BAD — index as key breaks reconciliation on reorder/filter
{products.map((product, index) => <ProductCard key={index} ... />)}

// GOOD — stable, unique ID from data
{products.map(product => <ProductCard key={product.id} ... />)}
```

### 7.3 Avoid Direct DOM Manipulation

```tsx
// BAD — imperative DOM in React
useEffect(() => {
  document.getElementById('modal').style.display = 'block'
}, [isOpen])

// GOOD — declarative React
{isOpen && <Modal />}

// GOOD — class toggling via conditional className
<div className={isActive ? styles.card_active : styles.card}>...</div>
```

### 7.4 `useEffect` — Last Resort

```tsx
// BAD — using useEffect to sync derived state
const [filteredProducts, setFilteredProducts] = useState([])
useEffect(() => {
  setFilteredProducts(filterProducts(products, filters))
}, [products, filters])

// GOOD — compute directly in render (derived state)
const filteredProducts = filterProducts(products, filters)

// BAD — useEffect for event subscriptions inside loops
// GOOD — event handlers in JSX props
<button onClick={handleSelect}>...</button>
```

Use `useEffect` only for true side effects that have no React equivalent: syncing with external systems, subscriptions to non-React events, browser APIs.

**Checkpoints:**
- [ ] Every component has a typed `Props` interface — no `any`.
- [ ] Array rendering uses stable IDs as `key` — never array index.
- [ ] No `document.getElementById`, `querySelector`, or inline `style` manipulation.
- [ ] No `useEffect` used to compute derived state — compute in render.
- [ ] No `useEffect` used for event handling — use JSX event props.
- [ ] No `element.style.X = Y` — use conditional classNames instead.

---

## 8. Pure Functions in Domain Layer

Domain functions must have zero side effects and be deterministic. Same rules as Vanilla JS — React does not change this.

```ts
// products/domain/filterProducts.ts
const byMinPrice = (min: number) => (product: Product) => product.price >= min
const byMaxPrice = (max: number) => (product: Product) => product.price <= max
const bySearch = (query: string) => (product: Product) =>
  query ? product.title.toLowerCase().includes(query.toLowerCase()) : true

export const filterProducts = (
  products: Product[],
  { minPrice, maxPrice, search }: FilterState
): Product[] =>
  products
    .filter(byMinPrice(minPrice))
    .filter(byMaxPrice(maxPrice))
    .filter(bySearch(search))
```

```ts
// products/domain/sortProducts.ts
const SORT_COMPARATORS: Record<SortKey, (a: Product, b: Product) => number> = {
  price_asc: (a, b) => a.price - b.price,
  price_desc: (a, b) => b.price - a.price,
  title_asc: (a, b) => a.title.localeCompare(b.title),
}

export const sortProducts = (products: Product[], sortKey: SortKey): Product[] =>
  [...products].sort(SORT_COMPARATORS[sortKey])
```

**Checkpoints:**
- [ ] Domain functions return new arrays/objects — never mutate inputs.
- [ ] Domain functions can be tested with Vitest directly (no React, no browser needed).
- [ ] No JSX, no hooks, no `fetch`, no `localStorage` in `domain/` files.
- [ ] Higher-order functions used to create configurable predicates.

---

## 9. Internationalization (i18n)

Use @packages/i18n/README.md

---

## 10. Separation of Concerns — JSX / CSS / Logic

```tsx
// BAD — inline styles, logic inside JSX
<div
  style={{ color: 'red', padding: '16px' }}
  onClick={() => {
    const filtered = products.filter(p => p.price > 100)
    setProducts(filtered)
  }}
>
  {products.filter(p => p.active).length} active
</div>

// GOOD — styles in CSS Module, logic in handler and domain
const activeCount = countActiveProducts(products)  // domain function
const handleExpensiveFilter = () => setFilters({ minPrice: 100 })

<div className={styles.productSummary} onClick={handleExpensiveFilter}>
  {activeCount} active
</div>
```

**Checkpoints:**
- [ ] Zero `style={{}}` attributes — except when value is truly dynamic (e.g. chart pixel widths).
- [ ] Zero inline logic in JSX event handlers — always extract to a named handler.
- [ ] Zero business logic in JSX expressions (`{products.filter(...).map(...)}`).
- [ ] Conditional rendering uses readable patterns (`isLoading && <Spinner />` or ternary for short branches).
- [ ] Complex conditional rendering extracted to a variable or sub-component.

---

## 11. Accessibility (A11y)

Same principles as Vanilla JS — JSX syntax differs, rules do not.

```tsx
// BAD — no label, div as button, missing alt
<input placeholder="Search" />
<div onClick={handleClose}>X</div>
<img src={product.image} />

// GOOD — labeled, semantic, described
<label htmlFor="search">Search products</label>
<input id="search" type="text" aria-label="Search products" />

<button type="button" aria-label="Close product detail" onClick={handleClose}>X</button>

<img src={product.image} alt={product.title} />
```

```tsx
// Loading state
<div aria-busy={isLoading} aria-label={t('products.loading')}>
  {isLoading ? <Skeleton /> : <ProductGrid products={products} />}
</div>

// Error state
{isError && (
  <div role="alert">
    <p>{error.message}</p>
  </div>
)}
```

**Checkpoints:**
- [ ] Every `<input>` has a `<label>` with a matching `htmlFor` attribute.
- [ ] Every interactive element is a `<button>` or `<a>` — never a `<div>` or `<span>`.
- [ ] Buttons have `type="button"` to prevent accidental form submission.
- [ ] Images have descriptive `alt` attributes — no `alt=""` on informational images.
- [ ] Error states use `role="alert"`.
- [ ] Loading states use `aria-busy`.
- [ ] `<html lang="...">` set correctly (via `layout.tsx` in Next.js).
- [ ] Interactive components are keyboard navigable (tab, enter, escape).

---

## 12. Clean Code — Eliminating Noise

### Remove Dead Code

```tsx
// BAD — exported but never used
export const LegacyProductCard = () => { ... } // defined, never imported

// GOOD — delete it. Git is your backup.
```

### No Console Logs in Production

```ts
// BAD
console.log('render products:', products)

// GOOD — use a debug utility
const DEBUG = process.env.NODE_ENV === 'development'
if (DEBUG) console.log('products:', products)

// BETTER — use a proper logger or remove entirely before commit
```

### DRY — Don't Repeat Yourself

```tsx
// BAD — same price format in two components
// ProductCard.tsx
<span>${product.price.toFixed(2)}</span>

// ProductDetail.tsx
<span>${product.price.toFixed(2)}</span>

// GOOD — single utility function in domain/
// lib/formatters.ts
export const formatPrice = (price: number, locale = 'en-US'): string =>
  new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD' }).format(price)

// Both components
<span>{formatPrice(product.price)}</span>
```

### Avoid Prop Drilling — Use Composition

```tsx
// BAD — passing props 3+ levels deep
<Page user={user}>
  <Layout user={user}>
    <Header user={user}>
      <Avatar user={user} />

// GOOD — composition or context
<Page>
  <Layout>
    <Header>
      <Avatar /> {/* reads from useAuthStore() or useContext */}
```

**Checkpoints:**
- [ ] Zero `console.log` calls in committed code.
- [ ] Zero unused imports — enabled via ESLint `no-unused-vars`.
- [ ] Zero dead components (defined but never rendered).
- [ ] Any logic in two places → extract to a shared utility or hook.
- [ ] Any string in two places → extract to a constant.
- [ ] Prop drilling beyond 2 levels → use context, Zustand, or component composition.

---

## 13. Performance — Intentional Optimization

**Rule:** Do not optimize prematurely. Measure first, then optimize.

```tsx
// memo — only when the component is expensive AND receives stable props
const ProductCard = memo(({ product, isSelected, onSelect }: ProductCardProps) => {
  return <li>...</li>
})

// useMemo — only for expensive computations
const sortedProducts = useMemo(
  () => sortProducts(products, sortKey),
  [products, sortKey]
)

// useCallback — only when passing callbacks to memoized children
const handleSelect = useCallback((id: string) => {
  setSelectedId(id)
}, [])
```

```tsx
// Next.js Image — always for images, handles lazy loading and optimization
import Image from 'next/image'

<Image
  src={product.image}
  alt={product.title}
  width={300}
  height={300}
  loading="lazy" // or "eager" for above-fold images
/>
```

**Checkpoints:**
- [ ] `memo`, `useMemo`, `useCallback` have a documented reason for existing — not added by default.
- [ ] Images use `next/image` — never `<img>` for content images.
- [ ] Lists with 50+ items use virtualization (TanStack Virtual).
- [ ] Heavy components are lazy-loaded with `dynamic(() => import(...))`.
- [ ] No anonymous functions created inline that are passed as `key` props or as `ref`.

---

## 14. Code Review — Final Checklist Summary

Before considering a PR complete, verify:

### Architecture
- [ ] Feature-based folder structure with `domain/`, `components/`, `hooks/`, `services/`, `config/` layers.
- [ ] `app/` pages only compose — no inline logic.
- [ ] No cross-feature coupling except through explicit shared interfaces.
- [ ] `'use client'` minimized — only where strictly necessary.

### Constants and Configuration
- [ ] No hardcoded route strings, query keys, or API URLs.
- [ ] All env vars accessed through `config/env.ts`.
- [ ] All constant objects are frozen and typed with `as const`.
- [ ] All CSS values are CSS variables or Tailwind tokens.

### Single Responsibility
- [ ] Each file has one clearly defined purpose.
- [ ] Components render — they do not fetch or contain business logic.
- [ ] Hooks orchestrate — they do not render.
- [ ] Domain functions are pure — they do not use hooks or JSX.

### Naming
- [ ] Components: PascalCase.
- [ ] Hooks: `use` prefix.
- [ ] Event handlers: `handle` prefix (implementation), `on` prefix (props).
- [ ] Booleans: `is`, `has`, `should`, `can` prefix.
- [ ] No single-letter variable names.

### State Management
- [ ] Server state → TanStack Query / SWR.
- [ ] URL state → `useSearchParams`.
- [ ] Local UI state → `useState` / `useReducer`.
- [ ] Global client state → Zustand / Jotai.
- [ ] State is always updated immutably.
- [ ] All action types are constants.

### Async and Error Handling
- [ ] Every `fetch()` validates `response.ok`.
- [ ] Service functions throw — never return `null` on failure.
- [ ] `error.tsx` exists for all dynamic routes.
- [ ] `loading.tsx` or `Suspense` exists for all async routes/components.
- [ ] Errors are visible to the user — not just logged.

### Components
- [ ] Every component has a typed `Props` interface — no `any`.
- [ ] `key` props use stable IDs — never array index.
- [ ] No `document`, `querySelector`, or `element.style` in components.
- [ ] No `useEffect` for derived state or event handling.
- [ ] No inline logic in JSX — extracted to named handlers and domain functions.

### i18n
- [ ] Zero hardcoded user-visible strings.
- [ ] All formatting (currency, counts, dates) through i18n or `Intl` API.

### Accessibility
- [ ] Every input has a `<label>` with `htmlFor`.
- [ ] Interactive elements are `<button>` or `<a>`.
- [ ] Images have `alt` attributes.
- [ ] Error states use `role="alert"`.
- [ ] Page has correct `lang` attribute.

### Performance
- [ ] Images use `next/image`.
- [ ] `memo`/`useMemo`/`useCallback` only with documented justification.
- [ ] No unnecessary re-renders (verify with React DevTools Profiler if needed).

### Clean Code
- [ ] Zero `console.log` in production code.
- [ ] Zero dead/unused code or imports.
- [ ] Zero copy-pasted logic (DRY enforced).
- [ ] No prop drilling beyond 2 levels.

---

*Adapted from the Vanilla JS architecture reference — Desarrollo Web, V Semestre ITCR.*
*Stack: Next.js 14+ (App Router) · React 18+ · TypeScript · CSS Modules / Tailwind · TanStack Query · Zustand*