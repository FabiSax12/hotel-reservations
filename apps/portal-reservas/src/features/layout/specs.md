# Feature Specification: Global Layout

**Status:** draft
**Version:** 1.0

## 1. Objective
Scaffolding / placeholder for the persistent global application shell, managing the background graphics and the top navigation header.

## 2. Scope & Boundaries
**In Scope:**
* Implementation of the global `Background` component.
* Implementation of the global `Header`, containing branding and navigation links.
* Implementation of the `StickySearchBar` layout container for "State B" search results.

**Out of Scope (Do Not Modify):**
* Do not implement complex mobile hamburger menus or authenticated user dropdowns at this stage.

## 3. Architecture & Context
**Core Files Involved:**
* `features/layout/components/Header.tsx` (Target for header modifications)
* `features/layout/components/StickySearchBar.tsx` (Target for State B transition layout)
* `features/layout/components/Background.tsx` (Target for styling background)

**System Constraints & Known Pitfalls:**
* The layout must natively handle the transition between the landing page (transparent header) and the results page (solid sticky header).

## 4. Acceptance Criteria
* [x] Condition 1: Header accurately reads the `hasSearched` state from the application orchestrator to render the `StickySearchBar`.
* [x] Condition 2: The UI safely anchors the `StickySearchBar` to the top of the viewport during scrolling.

## 5. Handoff & Status Notes
* **Current State:** Scaffolding complete. The header correctly manages the transition between states, but navigation links are static.
* **Next Step:** Implement mobile responsiveness and authenticated user-profile dropdown states.
