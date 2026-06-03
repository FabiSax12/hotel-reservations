# Feature Specification: Amenities Stage

**Status:** completed
**Version:** 2.0

## 1. Objective 
As an administrator, after I added info of a room, I need a new page that let me add amenities to this rooms, before creating the room, but also to be a separated page, I want the workflow to feel like stages/phases of a creation, in order to avoid scrolling, instead, feel like each stage refers to something in specific and I can concentrate on each step.

## 2. Scope & Boundaries
**In Scope:**
* Create a real `amenityService.ts` using Supabase for DB interaction.
* Implement Server Actions for all mutations (saving selection, custom amenities).
* Define shared RLS policies for `amenities` and `room_amenities` tables.

**Out of Scope (Do Not Modify):**
* Do not modify any other feature outside the rooms feature, neither the other folders (info, schedule).
* Do not use mock services for amenities.


## 3. Architecture & Context
**Core Folders Involved:**
* `apps/panel-admin/src/features/rooms/components/amenities` (Target for modification of components).
* `apps/panel-admin/src/features/rooms/constants` (Target for all the needed static text).

**Core Files Involved:**
* `GOOD_PRACTICES.MD` (Read-only reference for good practices).
* `apps/panel-admin/src/features/rooms/components/amenities/SPEC.md` (Read-Only reference for context).

**System Constraints & Known Pitfalls:**
* Use atomic pattern for each component (interfaces.ts, styles.ts, page.tsx), use descriptive names.
* No hardcoded strings, all must be inside constants folder, organized for groups.
* i18n is mandatory for all the UI texts, but not the room info.

## 4. Acceptance Criteria
* [ ] Condition 1: As a logged admin, I can select at least one amenity and see a list of the active ones.
* [ ] Condition 2: As a logged admin, I can modify the list of amenities of each individual room.
* [ ] Condition 3: As a logged admin, I can select from a list of predefined amenities.
* [ ] Condition 4: As a logged admin, I want to make sure that the room has at least one amenity before creating it.

## 5. Handoff & Status Notes
* **Current State:** Refactored entire feature to use Atomic Component Pattern. Removed magic strings, hardcoded numbers, and centralized translations.
* **Next Step:** Proceed to test workflows inside the app and pull request.
