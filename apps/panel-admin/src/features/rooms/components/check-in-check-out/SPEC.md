# Feature Specification: Add room check-in check-out schedule.

**Status:** in-progress
**Version:** 1.0

## 1. Objective 
As an administrator, I want to configure the allowed time slots for room check-ins and check-outs, so that I can establish the operational hours.

## 2. Scope & Boundaries
**In Scope:**
* Create a sql file with the neccesary structure or needed table inside packages/db/supabase/migrations.
* Create a mock-service to mimic how the service would be with a real DB and API implementation.
* Create a new check in check out schedule with all the neccesary info and storage in a local.

**Out of Scope (Do Not Modify):**
* Do not modify any other feature outside the rooms feature, neither the other folders (amenities, info, rooms).
* Do not create real database implementation.
* Do not add images.

## 3. Architecture & Context
**Core Folders Involved:**
* `apps/panel-admin/src/features/rooms/components/check-in-check-out` (Target for modification of components).
* `apps/panel-admin/src/features/rooms/constants` (Target for all the needed static text).

**Core Files Involved:**
* `GOOD_PRACTICES.MD` (Read-only reference for good practices).
* `apps/panel-admin/src/features/rooms/components/check-in-check-out/SPEC.md` (Read-Only reference for context).

**System Constraints & Known Pitfalls:**
* Use atomic pattern for each component (interfaces.ts, styles.ts, page.tsx), use descriptive names.
* No hardcoded strings, all must be inside constants folder, organized for groups.
* i18n is mandatory for all the UI texts, but not the room info.

## 4. Acceptance Criteria
* [ ] Condition 1: As a the feature, I must support multiple selection in 30-minute intervals (strict range from 10:00 to 22:00) (check-in).
* [ ] Condition 2: As a the feature, I must support multiple selection in 30-minute intervals (strict range from 06:00 to 14:00) (check-out).
* [ ] Condition 3: As a logged admin, I can add multiple check-in check-out schedules to a room.

## 5. Handoff & Status Notes
* **Current State:** Planning.
* **Next Step:** Implementing.
