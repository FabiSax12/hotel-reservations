# Design & Implementation: Reservaciones — Visual Refactor + DateRangePicker (US-JA-02 visual)

**Date:** 2026-04-19  
**Scope:** Refactor visual de la lista de reservaciones: alineación al design system del portal, layout de 3 cards, eliminación de elementos no requeridos, reemplazo del date picker por el componente nativo del portal, y corrección de Tailwind para paquetes externos.

---

## Context

Se detectaron divergencias visuales entre `panel-admin` (lista de reservaciones) y `portal-reservas` (barra de búsqueda). Se corrigen tipografía, colores, estructura de layout y el selector de fechas para que ambas apps compartan el mismo lenguaje visual.

**En alcance:**
- Eliminar badge "BOOKINGS · LIVE" y botón "+ Nueva reservación"
- Eliminar botón "Más filtros"
- Layout de 3 cards: header+stats / filtros / tabla
- Tipografía y colores alineados al portal (`font-serif italic text-emerald-900`, grays del design system)
- Stat cards alineadas al portal (fondo `bg-gray-50`, border `border-gray-100`)
- Reemplazar los campos de fecha (Popover+TextField de HeroUI) por el mismo `DateRangePicker` pill que usa el portal
- Corrección del renderizado del calendario (columna única → grid 7 columnas)
- Formato de fechas en la tabla: "1 may" sin año

**Fuera de alcance:**
- Filtrado real por fechas (lógica de dominio ya presente, no se modifica)
- Modal de detalle (US-JA-03)
- Cambio de estado (US-JA-04)
- Conexión a Supabase

---

## Target Structure

```
apps/panel-admin/src/
├── app/
│   └── globals.css                                    ← MODIFICADO: @source para @hotel/ui
└── features/
    └── reservaciones/
        ├── constants/
        │   └── styles.ts                              ← MODIFICADO: CARD, PAGE_HEADER, STAT_CARD, FILTERS
        ├── components/
        │   ├── DateRangePicker.tsx                    ← NUEVO: pill LLEGADA/SALIDA + CalendarPopover
        │   ├── ReservationsList.tsx                   ← MODIFICADO: 3 cards, sin badge, sin botón
        │   ├── ReservationsFilters.tsx                ← MODIFICADO: usa DateRangePicker, sin Más filtros
        │   └── ReservationsTable.tsx                  ← MODIFICADO: formatDate sin año
        └── i18n/
            ├── reservations.texts.ts                  ← MODIFICADO: labels LLEGADA/SALIDA, DATE_PLACEHOLDER
            └── reservationsTexts.type.ts              ← MODIFICADO: agrega DATE_PLACEHOLDER

packages/ui/src/search-bar/
└── index.ts                                           ← MODIFICADO: exporta CalendarPopover
```

---

## Files Changed

### Modificados

| Archivo | Cambio |
|---|---|
| `apps/panel-admin/src/app/globals.css` | Agregado `@source "../../../../packages/ui/src"` para que Tailwind escanee `@hotel/ui` |
| `apps/panel-admin/src/features/reservaciones/constants/styles.ts` | Nuevo grupo `CARD`; nuevos grupos `PAGE_HEADER`, `STAT_CARD` actualizados; `FILTERS.WRAPPER` simplificado |
| `apps/panel-admin/src/features/reservaciones/components/ReservationsList.tsx` | Eliminados badge y botón; estructura de 3 cards con `CARD.BODY`, `CARD.BODY_SM`, `CARD.OVERFLOW` |
| `apps/panel-admin/src/features/reservaciones/components/ReservationsFilters.tsx` | Eliminado botón "Más filtros"; reemplazado bloque Popover+TextField por `<DateRangePicker>`; Select corregido a `value`/`onChange` |
| `apps/panel-admin/src/features/reservaciones/components/ReservationsTable.tsx` | Agregada función `formatDate` (sin año, `es-CR`); aplicada a columnas check-in y check-out |
| `apps/panel-admin/src/features/reservaciones/i18n/reservations.texts.ts` | `LABEL_DATE_FROM`: "Desde"→"Llegada" (es), "From"→"Check-in" (en); `LABEL_DATE_TO`: "Hasta"→"Salida" (es), "To"→"Check-out" (en); agregado `DATE_PLACEHOLDER` |
| `apps/panel-admin/src/features/reservaciones/i18n/reservationsTexts.type.ts` | Agregado `DATE_PLACEHOLDER: string` en `FILTERS` |
| `packages/ui/src/search-bar/index.ts` | Exportado `CalendarPopover` para consumo desde `panel-admin` |

### Creados

| Archivo | Responsabilidad |
|---|---|
| `apps/panel-admin/src/features/reservaciones/components/DateRangePicker.tsx` | Campos pill LLEGADA/SALIDA con `CalendarPopover`; misma UX y algoritmo que `ModernSearchBar` del portal |

---

## Architecture Decisions

### §1 — Layout de 3 cards

La pantalla se divide en tres contenedores independientes (`rounded-xl bg-white border border-gray-200 shadow-sm`) sobre un fondo `bg-gray-100`:

```
┌──────────────────────────────────────────────┐  ← CARD.BODY   (p-6)
│  Header (título + subtítulo)  │  Stat cards  │
└──────────────────────────────────────────────┘
┌──────────────────────────────────────────────┐  ← CARD.BODY_SM (p-4)
│  Filtros (pills de estado + DateRangePicker) │
└──────────────────────────────────────────────┘
┌──────────────────────────────────────────────┐  ← CARD.OVERFLOW (sin padding, overflow-hidden)
│  Tabla de reservaciones / EmptyState         │
└──────────────────────────────────────────────┘
```

`CARD.OVERFLOW` usa `overflow-hidden` en lugar de padding para que la tabla ocupe todo el ancho del card sin bordes internos.

### §2 — DateRangePicker como componente wrapper

Se crea `DateRangePicker.tsx` en el feature en lugar de importar `DateSection` del portal, porque:

1. `DateSection` está acoplada al estado global de `ModernSearchBar` (`SearchState`).
2. `DateRangePicker` es un wrapper controlado (recibe `checkIn`, `checkOut`, `onChange`) que reutiliza solo `CalendarPopover` de `@hotel/ui`.
3. El algoritmo `handlePickDate` (3 escenarios) se copia del portal garantizando UX idéntica.

```
ReservationsFilters
  └── DateRangePicker (nuevo, feature-local)
        └── CalendarPopover (@hotel/ui, ahora exportado)
```

### §3 — Exportación de CalendarPopover

`CalendarPopover` era un sub-componente interno de `ModernSearchBar`. Se agrega al barrel export de `packages/ui/src/search-bar/index.ts` para hacerlo consumible desde fuera del paquete sin romper el encapsulamiento del resto de sub-componentes (DestinationPopover, GuestsPopover, etc. siguen siendo internos).

### §4 — @source directive para Tailwind v4

`panel-admin` usa Tailwind v4 con `@import "tailwindcss"`. Las clases del calendario (`grid-cols-7`, `aspect-square`, clases emerald de rango) viven en el source de `@hotel/ui`, que no forma parte del árbol de archivos escaneado por defecto.

**Solución:** Agregar `@source "../../../../packages/ui/src"` en `globals.css`, idéntico al patrón ya existente en `portal-reservas/globals.css`.

```css
/* apps/panel-admin/src/app/globals.css */
@import "tailwindcss";
@source "../../../../packages/ui/src";   ← fix: escanear paquete UI
@import "@heroui/styles";
@import "@hotel/ui/theme.css";
```

Sin esta directiva el calendario se renderizaba en columna única porque `grid-cols-7` no era generado.

### §5 — Formato de fechas en tabla

Se eliminó el año del formato de check-in/check-out en `ReservationsTable` para reducir el ruido visual. Se usa `Intl.DateTimeFormat` con `day: "numeric", month: "short"` en locale `es-CR`:

```ts
function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("es-CR", {
    day: "numeric",
    month: "short",
  });
}
```

El `Date` se construye con componentes locales (`new Date(year, month-1, day)`) para evitar el off-by-one que produce `new Date(isoString)` en zonas horarias UTC-.

### §6 — Corrección de Select API (HeroUI v3)

Los props `selectedKey` y `onSelectionChange` estaban deprecados en `ReservationsFilters`. Corregido a `value` y `onChange` según la API actual de React Aria / HeroUI v3.

---

## i18n Keys Modified

| Clave | ES anterior | ES nuevo | EN anterior | EN nuevo |
|---|---|---|---|---|
| `RESERVATIONS.FILTERS.LABEL_DATE_FROM` | "Desde" | "Llegada" | "From" | "Check-in" |
| `RESERVATIONS.FILTERS.LABEL_DATE_TO` | "Hasta" | "Salida" | "To" | "Check-out" |
| `RESERVATIONS.FILTERS.DATE_PLACEHOLDER` | — | "Agregar fecha" | — | "Add date" |

---

## Styles Added / Modified (`constants/styles.ts`)

### Nuevo: `CARD`

```ts
export const CARD = Object.freeze({
  BASE:     "rounded-xl bg-white border border-gray-200 shadow-sm",
  BODY:     "rounded-xl bg-white border border-gray-200 shadow-sm p-6",
  BODY_SM:  "rounded-xl bg-white border border-gray-200 shadow-sm p-4",
  OVERFLOW: "rounded-xl bg-white border border-gray-200 shadow-sm overflow-hidden",
} as const);
```

### Modificado: `PAGE_HEADER`

Se eliminan clases de badge. Se agrega `TITLE_ACCENT` para el span en serif itálico.

```ts
export const PAGE_HEADER = Object.freeze({
  LAYOUT:        "flex flex-wrap items-start justify-between gap-4",
  LEFT:          "flex-1 min-w-0",
  TITLE:         "text-2xl font-semibold text-gray-900 leading-tight",
  TITLE_ACCENT:  "font-serif italic text-emerald-900",
  SUBTITLE:      "mt-1 text-sm text-gray-500",
  SUBTITLE_BOLD: "font-semibold text-gray-700",
} as const);
```

### Modificado: `STAT_CARD`

Fondo `bg-gray-50` + `border-gray-100` alineado al portal.

```ts
export const STAT_CARD = Object.freeze({
  ROW:     "flex flex-wrap gap-3 self-start",
  WRAPPER: "min-w-[110px] rounded-lg border border-gray-100 bg-gray-50 px-4 py-3",
  LABEL:   "text-[10px] font-bold uppercase tracking-widest text-gray-400",
  VALUE:   "mt-1 text-2xl font-bold text-gray-900",
  NOTE:    "mt-0.5 text-xs text-gray-400",
} as const);
```

---

## DateRangePicker — Algoritmo handlePickDate

El selector de fechas implementa el mismo algoritmo de 3 escenarios que `ModernSearchBar.DateSection`:

| Escenario | Condición | Comportamiento |
|---|---|---|
| Toggle-off | `dayStr === checkIn` ó `dayStr === checkOut` | Limpia la fecha correspondiente |
| Ambas fechas activas | `checkIn && checkOut` | Smart replace: si clicked < checkIn → nuevo checkIn; si clicked > checkOut → nuevo checkOut; si entre ambas → reemplaza la más cercana (tie → checkIn) |
| Una sola fecha activa | `field === "checkIn"` ó `"checkOut"` | Valida dirección; si inválida activa animación de error; si válida asigna y avanza el campo activo |

La animación de fecha inválida usa dos timeouts encadenados: `isFading: false` a los 400ms → `null` a los 700ms, dando un efecto de shake + fade.

---

## What Does NOT Change

- Lógica de filtrado (inline en `ReservationsList`, inalterada)
- Comportamiento de autenticación (Supabase, middleware)
- Estructura y contenido de `features/auth/`
- Resto de `packages/ui/` (solo se modifica el barrel export de `search-bar/index.ts`)
- `apps/portal-reservas/` ni `apps/landing/`
- Mock data y tipos de dominio de `reservation.ts`

---

## Checklist

- [x] `globals.css` — `@source` para `@hotel/ui`
- [x] `constants/styles.ts` — `CARD`, `PAGE_HEADER`, `STAT_CARD` actualizados
- [x] `components/ReservationsList.tsx` — 3 cards, sin badge, sin botón nueva reservación
- [x] `components/ReservationsFilters.tsx` — `DateRangePicker` integrado, sin "Más filtros", Select API corregido
- [x] `components/ReservationsTable.tsx` — `formatDate` sin año
- [x] `components/DateRangePicker.tsx` — pill fields + `CalendarPopover`, algoritmo completo
- [x] `i18n/reservations.texts.ts` — labels Llegada/Salida, `DATE_PLACEHOLDER`
- [x] `i18n/reservationsTexts.type.ts` — tipo `DATE_PLACEHOLDER` agregado
- [x] `packages/ui/src/search-bar/index.ts` — `CalendarPopover` exportado
- [ ] Conexión a Supabase (diferido)
- [ ] Modal de detalle (US-JA-03)
- [ ] Cambio de estado (US-JA-04)

---

## Lessons Learned

### Tailwind v4 y paquetes externos del monorepo

**Error:** Las clases de `@hotel/ui` (ej. `grid-cols-7`, `aspect-square`, `bg-emerald-200`) no eran generadas en `panel-admin` porque Tailwind solo escanea el árbol de la app actual.

**Síntoma:** El calendario de `CalendarPopover` se renderizaba en una sola columna en vez de la grilla de 7.

**Regla:** Toda app que consuma componentes de `@hotel/ui` debe declarar `@source "../../../../packages/ui/src"` en su `globals.css`. Verificar que `portal-reservas` ya lo tenía y agregarlo en `panel-admin`.

### Re-uso de sub-componentes internos de un paquete

**Patrón:** Cuando un sub-componente de un paquete (`CalendarPopover`) se necesita en otra app, se exporta desde el barrel del paquete — no se duplica el componente. El encapsulamiento se mantiene en el barrel (los demás sub-componentes permanecen privados).

### Construir fechas con componentes locales

**Regla:** `new Date("YYYY-MM-DD")` parsea como UTC → off-by-one en zonas horarias negativas (UTC-6 de Costa Rica muestra el día anterior). Siempre usar `new Date(year, month-1, day)` con los componentes separados del ISO string.
