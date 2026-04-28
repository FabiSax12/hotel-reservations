# Feature Specification: Register Room Info and Fees

**Status:** in-progress
**Version:** 1.3

## 1. Objective 
As an administrator I need to register new room with all the neccesary textual information (name, category, capacity{adults, kids}, description), fees (regular fee, high season fee) and state (active, inactive). 

## 2. Scope & Boundaries
**In Scope:**
* Create a sql file with the neccesary structure for needed table inside packages/db/supabase/migrations.
* Create a mock-service to mimic how the service would be with a real DB and API implementation.
* Create a new room with all the neccesary info and storage in a local file.

**Out of Scope (Do Not Modify):**
* Do not modify any other feature outside the rooms feature, neither the other folders (amenities, schedule).
* Do not add images, check-in/check-out schedules.
* Do not create real database implementation.

## 3. Architecture & Context
**Core Folders Involved:**
* `apps/panel-admin/src/features/rooms/components/info` (Target for modification of components).
* `apps/panel-admin/src/features/rooms/constants` (Target for all the needed static text).

**Core Files Involved:**
* `GOOD_PRACTICES.MD` (Read-only reference for good practices).
* `apps/panel-admin/src/features/rooms/components/info/SPEC.md` (Read-Only reference for context).

**System Constraints & Known Pitfalls:**
* Use atomic pattern for each component (interfaces.ts, styles.ts, page.tsx), use descriptive names.
* No hardcoded strings, all must be inside constants folder, organized for groups.
* i18n is mandatory for all the UI texts, but not the room info.

## 4. Acceptance Criteria
* [ ] Condition 1: As a logged admin, I can add textual information to a new room.
* [ ] Condition 2: As a logged admin, I can modify the textual information of the room.
* [ ] Condition 3: As a logged admin, I can use a switch button to change the state of the room.

## 5. Handoff & Status Notes
* **Current State:** Changing style.
* **Next Step:** 
