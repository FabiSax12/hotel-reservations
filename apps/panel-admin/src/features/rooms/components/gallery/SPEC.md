# Feature Specification: Image Gallery Stage

**Status:** in-progress
**Version:** 1.0

## 1. Objective 
As an administrator, I need to upload and reorder room images to display an attractive visual gallery to the customer. The workflow should feel like an independent stage/phase within the room creation process to maintain focus and avoid excessive scrolling.

## 2. Scope & Boundaries
**In Scope:**
* Create/modify the components required for the room image gallery management.
* Implement a drag-and-drop interface to easily reorder uploaded images.
* Implement client-side and server-side validation for file limits and maximum file size.
* Handle the logic to automatically assign the first image in the sequence as the "Principal" (Main) image.

**Out of Scope (Do Not Modify):**
* Do not modify any features outside the room image gallery management.
* Do not alter existing workflows for room info, scheduling, or amenities.

## 3. Architecture & Context
**Core Folders Involved:**
* `apps/panel-admin/src/features/rooms/components/gallery` (Target for gallery component modifications).
* `apps/panel-admin/src/features/rooms/constants` (Target for all static text and i18n).

**Core Files Involved:**
* `GOOD_PRACTICES.MD` (Read-only reference for project best practices).

**System Constraints & Known Pitfalls:**
* Use the atomic pattern for each component (`interfaces.ts`, `styles.ts`, `page.tsx`) with descriptive naming conventions.
* No hardcoded strings; all UI labels and messages must reside inside the constants folder, organized by groups.
* i18n is mandatory for all user interface texts.
* Strictly allowed image formats: JPG, PNG, WebP.

## 4. Acceptance Criteria
* [ ] **Criterion 1:** Allows uploading between 1 and 10 images (JPG, PNG, WebP formats only).
* [ ] **Criterion 2:** Enforces a 5 MB size limit per image (displays an explicit error message if exceeded).
* [ ] **Criterion 3:** Provides a functional drag-and-drop interface for interactive image reordering.
* [ ] **Criterion 4:** Automatically assigns and tags the first image in the sorted list as the "Principal" (Main) image.

## 5. Handoff & Status Notes
* **Current State:** Starting the development phase for the room image gallery management. Base directory structure is ready for atomic components.
* **Next Step:** Create the upload zone interface with drag-and-drop support and implement the file format and size constraint validations.
