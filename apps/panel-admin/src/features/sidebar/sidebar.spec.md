# Feature Specification: Admin Sidebar Navigation

**Status:** draft
**Version:** 1.0

## 1. Objective
Define the persistent sidebar navigation for the admin panel, covering module grouping, active-state behavior, and session actions.

## 2. Scope & Boundaries
**In Scope:**
* Sidebar rendered across `/admin/*` routes in the admin panel, excluding `/admin/login` and `/admin/activate`.
* Navigation entries for existing admin modules and planned business routes (see mappings).
* Active-state styling driven by the current route.
* Admin identity (name + role) displayed at the bottom.
* "Cerrar sesion" action that redirects to `/admin/login`.
* UI assembled using HeroUI components wherever feasible.

**Out of Scope (Do Not Modify):**
* Authentication logic, token management, or server-side session invalidation.
* Building the actual pages for planned routes (navigation only).

## 3. Architecture & Context
**Existing Admin Routes (apps/panel-admin):**
* `/admin/dashboard`
* `/admin/reservations`
* `/admin/new`
* `/admin/login`
* `/admin/activate`

**Planned Business Routes (predicted):**
* `/admin/admins`
* `/admin/admins/new`
* `/admin/invitations`
* `/admin/invitations/revoke`
* `/admin/invitations/resend`
* `/admin/portal-reservas`
* `/admin/rooms/new`
* `/admin/rooms`
* `/admin/rooms/[id]`
* `/admin/clients`
* `/admin/invoices`
* `/admin/cms/landing`

**Navigation Modules (existing + planned):**
* Dashboard
* Reservas
* Administradores (Nuevo)
* Lista Admins
* Añadir admin
* Invitaciones (Revocar, Reenviar)
* Reservas Portal
* Añadir Cuarto
* Cuartos
* Cuarto Detalle
* Clientes
* Facturas
* Contenido Landing Page (CMS)

## 4. Requirements

### Requirement 1: Persistent Sidebar Visibility
The system MUST render the sidebar on all `/admin/*` routes in the admin panel, excluding `/admin/login` and `/admin/activate`.

### Requirement 2: Module Navigation Entries
The system MUST include navigation entries for existing admin modules:
* Dashboard -> `/admin/dashboard`
* Reservas -> `/admin/reservations`
* Administradores (Nuevo) -> `/admin/new`

### Requirement 2.1: Planned Business Navigation Entries
The system MUST include navigation entries for the planned business routes (navigation only; pages may not exist yet).

### Requirement 2.2: Module Grouping
The system MUST group sidebar navigation entries by module, using section headers.

### Requirement 2.3: Module Names
The system MUST use the following module names in the sidebar grouping:
* Administracion
* Reservas
* Inventario
* Finanzas
* CMS

### Requirement 3: Active Route Highlighting
The system MUST visually differentiate the active navigation item based on the current route.

### Requirement 4: Admin Identity Footer
The sidebar MUST display the logged-in admin name and role in the footer area.

### Requirement 5: Logout Action
The sidebar MUST include a "Cerrar sesion" button in the footer that redirects to `/admin/login`.

### Requirement 6: HeroUI Composition
The sidebar UI MUST use HeroUI components wherever feasible (e.g., navigation list items, buttons, and avatar/identity sections).

### Requirement 7: Collapsible Sidebar With Persistent Icons
The sidebar MUST support a collapsed state and MUST NOT fully hide. In the collapsed state, the sidebar MUST keep key navigation icons visible for primary modules.

## 5. Acceptance Criteria (US - JA - 12)
* [ ] Sidebar renders on `/admin/*` routes excluding `/admin/login` and `/admin/activate`.
* [ ] Sidebar includes "Dashboard", "Reservas", and "Administradores (Nuevo)" entries with correct route targets.
* [ ] Sidebar includes navigation entries for the planned business routes listed in the route mapping table.
* [ ] The active entry is visually distinct from inactive entries and updates when the route changes.
* [ ] Sidebar footer shows the logged-in admin name and role.
* [ ] Sidebar footer includes a "Cerrar sesion" button that routes to `/admin/login` when activated.
* [ ] Sidebar layout uses HeroUI components wherever feasible.
* [ ] Sidebar supports a collapsed state that does not fully hide and keeps key navigation icons visible.

## 6. Route Mapping
| Module | Sidebar Entry | Route | Notes |
| --- | --- | --- | --- |
| Administracion | Dashboard | `/admin/dashboard` | Default admin landing page |
| Reservas | Reservas | `/admin/reservations` | Reservations list view |
| Administracion | Administradores (Nuevo) | `/admin/new` | Create new admin account |
| Administracion | Lista Admins | `/admin/admins` | Planned: admin list |
| Administracion | Añadir admin | `/admin/admins/new` | Planned: new admin flow |
| Administracion | Invitaciones | `/admin/invitations` | Planned: invitations list |
| Administracion | Invitaciones - Revocar | `/admin/invitations/revoke` | Planned: revoke invitation flow |
| Administracion | Invitaciones - Reenviar | `/admin/invitations/resend` | Planned: resend invitation flow |
| Reservas | Reservas Portal | `/admin/portal-reservas` | Planned: portal reservations view |
| Inventario | Añadir Cuarto | `/admin/rooms/new` | Planned: create room |
| Inventario | Cuartos | `/admin/rooms` | Planned: rooms list |
| Inventario | Cuarto Detalle | `/admin/rooms/[id]` | Planned: room detail |
| Reservas | Clientes | `/admin/clients` | Planned: clients list |
| Finanzas | Facturas | `/admin/invoices` | Planned: invoices view |
| CMS | Contenido Landing Page (CMS) | `/admin/cms/landing` | Planned: landing page content |
| Administracion | Cerrar sesion | `/admin/login` | Redirect only (no server logout) |

## 7. Handoff & Status Notes
* **Current State:** Sidebar wrapper exists but is placeholder-only.
* **Next Step:** Implement sidebar UI, route-aware active state, and admin identity footer.
