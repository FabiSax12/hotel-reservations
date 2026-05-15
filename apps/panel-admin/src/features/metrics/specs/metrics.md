# Metrics Dashboard

**Status:** draft
**Version:** 1.0

## 1. Objective
As an administrator, I need to see key hotel metrics in real time (total reservations, monthly occupancy per room, room ranking, and total revenue) filtered by a selectable date range, so I can evaluate the hotel's financial performance.

## 2. Scope & Boundaries

**In Scope:**
* Dashboard page with header, stat cards and tab navigation.
* Tab 1 — Reservaciones por Estado: status count chips + proportional bar + weekly stacked bar chart.
* Tab 2 — Ocupación por Cuarto: room list with progress bar, occupancy percentage and revenue.
* Tab 3 — Ranking & Ingresos: rooms ordered descending by number of `approved` or `completed` reservations with proportional bar and total revenue.
* Date range picker that filters all metrics simultaneously on change.
* All metric calculations must be based exclusively on reservations with status `approved` or `completed`.
* Occupancy formula: `(nights_with_reservation / total_nights_in_month) * 100`, formatted to 1 decimal place.
* Revenue formula: sum of `total_amount` for `approved` or `completed` reservations.
* Ranking formula: descending order by count of `approved` or `completed` reservations per room.

**Out of Scope (Do Not Modify):**
* Do not modify any existing database tables or triggers.
* Do not touch the reservations feature or any other existing feature.
* Export button is visual only in this version; do not implement real export logic.
* Do not implement websockets; real-time behavior is achieved by refetching on date range change.
* Do not add authentication or role logic; it is already handled globally.

## 3. Architecture & Context

**Core Folders Involved:**
* `apps/panel-admin/src/features/metrics/components` (Target for all UI components, atomic pattern).
* `apps/panel-admin/src/features/metrics/constants` (Target for all static text, labels, color mappings and numeric thresholds).
* `apps/panel-admin/src/features/metrics/hooks` (Target for date range state and metric derivation logic).
* `apps/panel-admin/src/features/metrics/services` (Target for data fetching layer).
* `apps/panel-admin/src/features/metrics/domain` (Target for shared types and interfaces).

**Core Files Involved:**
* `GOOD_PRACTICES.MD` (Read-only reference for good practices).
* `apps/panel-admin/src/features/metrics/components` (Target for modification following atomic pattern).

**System Constraints & Known Pitfalls:**
* Use atomic pattern for each component (`interfaces.ts`, `styles.ts`, `component.tsx`), use descriptive names.
* No hardcoded strings; all UI text must live inside the constants folder organized by group.
* No magic numbers; occupancy color thresholds and other numeric values must be named constants.
* No inline functions defined in JSX; extract all handlers and derivations to the hook or component body.
* UI components: HeroUI. Icons: lucide-react exclusively.
* Styles: Tailwind CSS following the project design system palette.
* The occupancy formula uses the total nights of the **month**, not the selected range — document this explicitly with a comment in the hook.
* The date range picker must have a default value (start of current month → today).
* Follow the HeroUI React skill and the Impecable skill for component creation.

**Status color mapping (define in constants):**
* `pending` → amber
* `approved` → emerald
* `cancelled` → rose
* `completed` → blue

## 4. Acceptance Criteria

* [ ] The date range picker filters all three tabs simultaneously without a full page reload.
* [ ] Stat cards display: Total Reservaciones, Ingresos Totales (USD), Ocupación Promedio, Cuartos Activos.
* [ ] Tab 1 shows individual count and percentage per status, a proportional bar and a weekly stacked bar chart.
* [ ] Tab 2 shows all active rooms with occupancy percentage (1 decimal), progress bar and total revenue.
* [ ] Tab 3 shows rooms ordered descending by reservation count, with rank number, proportional bar and revenue in USD.
* [ ] No hardcoded strings in JSX; no magic numbers in calculation logic.
* [ ] All metric calculations exclude `pending` and `cancelled` reservations.

## 5. Handoff & Status Notes
* **Current State:** Spec written; visual design approved by the team.
* **Next Step:** Create `domain/dashboard.types.ts` and `constants/dashboard.constants.ts`, then implement the service queries before mounting any component.