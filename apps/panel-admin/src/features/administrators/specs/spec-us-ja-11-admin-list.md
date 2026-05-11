# Feature Specification: Admin List Page

**Branch:** `feature/us-ja-11-admin-list`
**Status:** draft
**Version:** 1.0

---

## 1. Objective

Display a read-only table of all administrator accounts registered in the system, highlighting the currently authenticated session account at the top with a visual distinction and without action controls.

---

## 2. Scope & Boundaries

**In Scope:**
- New page `/admin/administrators` rendering the administrators table.
- Fetch all users where `role = 'admin'` from the existing `users` table.
- Display columns: email, status (active/inactive), created_at.
- The authenticated session's own account must appear pinned at the top of the list, highlighted in green, with no action controls.
- A single stat card in the page header showing the total count of administrators.
- Empty state when no other administrators exist.
- Full i18n support (ES / EN) for every visible string.

**Out of Scope (Do Not Modify):**
- Do not implement any action (deactivate, create) — those belong to US-JA-08 and future US.
- Do not modify the `users` table or any existing service outside `administrators`.
- Do not touch the auth module or session management.
- Do not implement an actions column — rows are fully read-only in this US.

---

## 3. Architecture & Context

**Folder structure to create:**

```
src/features/administrators/
├── actions/
│   └── get-administrators.action.ts
├── components/
│   ├── list/
│   │   ├── AdminsTable/
│   │   │   ├── AdminsTable.interfaces.ts
│   │   │   ├── AdminsTable.styles.ts
│   │   │   └── AdminsTable.tsx
│   │   └── AdminsTableRow/
│   │       ├── AdminsTableRow.interfaces.ts
│   │       ├── AdminsTableRow.styles.ts
│   │       └── AdminsTableRow.tsx
│   └── shared/
│       ├── AdminsEmptyState/
│       │   ├── AdminsEmptyState.interfaces.ts
│       │   ├── AdminsEmptyState.styles.ts
│       │   └── AdminsEmptyState.tsx
│       └── AdminsStatCard/
│           ├── AdminsStatCard.interfaces.ts
│           ├── AdminsStatCard.styles.ts
│           └── AdminsStatCard.tsx
├── constants/
│   └── administrators.constants.ts
├── domain/
│   └── administrator.types.ts
└── i18n/
    ├── administrators.en.ts
    └── administrators.es.ts
```

**Page file (app router):**
```
src/app/admin/administrators/page.tsx
```

**DB fields consumed from existing `users` table:**
```
id, email, role, is_active, created_at
```
Only users with `role = 'admin'` are fetched. No schema changes.

**System Constraints & Known Pitfalls:**
- The session user is identified server-side — never via localStorage or client-side state.
- The session user row must always render first, regardless of DB sort order.
- `created_at` formatting must live in a util function, never inline in TSX.
- All visible strings must come from i18n keys — no hardcoded strings anywhere.
- No magic numbers — column config, badge variants, and any fixed values go in constants.
- No inline functions inside JSX — extract all handlers and formatters before the return statement.

---

## 4. Acceptance Criteria

- [ ] Page renders at `/admin/administrators` and is reachable from the admin sidebar.
- [ ] Page header shows the title on the left and a single stat card on the right displaying the total count of administrators.
- [ ] Table displays columns: **Email**, **Status**, **Member since**.
- [ ] The session user's row appears first, with `bg-emerald-50` highlight and a "You" / "Tú" chip; no action controls on that row.
- [ ] All other administrator rows render without any action controls in this US.
- [ ] When no other administrators exist, `AdminsEmptyState` is shown.
- [ ] All visible text uses i18n keys — switching locale changes all strings.
- [ ] No TypeScript `any` types in any file of this feature.
- [ ] No magic numbers or hardcoded strings in TSX, constants, or action files.
- [ ] No inline functions defined inside JSX.
- [ ] Every file has a single responsibility.

---

## 5. i18n Keys to Define

```
administrators.page.title
administrators.page.subtitle
administrators.stat.total.label
administrators.stat.total.caption
administrators.table.column.email
administrators.table.column.status
administrators.table.column.createdAt
administrators.table.badge.you
administrators.table.status.active
administrators.table.status.inactive
administrators.emptyState.title
administrators.emptyState.description
```

---

## 6. UI Layout Reference

The page follows the same visual line as the Reservations page.

**Page header** — full width row, title block on the left, stat card on the right:

- Title: `text-4xl font-semibold font-serif text-gray-900 leading-tight`
  - Accented word: `font-serif italic text-emerald-900`
- Subtitle: `text-sm text-gray-500 mt-1`
- Stat card (Total):
  ```
  min-w-[110px] rounded-xl border border-[#e9e8e1] bg-[#f6f5ef] px-4 py-3
  ```
  - Label: `text-[10px] font-bold uppercase tracking-widest text-gray-400`
  - Value: `text-2xl font-bold text-gray-900`
  - Caption: `text-xs text-gray-500`

**Table section:**
- Container: `rounded-xl bg-white border border-gray-200 shadow-sm overflow-hidden`
- Column headers: `text-[10px] font-bold uppercase tracking-widest text-gray-400 px-4 py-4`
- Rows: `border-b border-gray-100 transition-colors hover:bg-gray-50/50`
- Session user row: `bg-emerald-50` + HeroUI `<Chip color="success" variant="soft" size="sm" />`
- Status badge: HeroUI `<Chip color="success" | "danger" variant="soft" size="sm" />`

**Empty state:**
```
flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white py-16 text-center
```

**Page wrapper:** `min-h-screen bg-[#f6f5ef] p-4 sm:p-8 space-y-4`

---

## 7. Handoff & Status Notes

- **Current State:** Spec complete, not started.
- **Next Step:** Create folder structure → define `administrator.types.ts` and i18n files → implement action → build components bottom-up (Row → EmptyState → StatCard → Table) → wire page.
