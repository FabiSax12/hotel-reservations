/**
 * @file ModernSearchBar.tsx — Top-level search bar orchestrator.
 *
 * This is the **only** component exported by the `@hotel/ui` package.
 * It manages all search state (destination, dates, guests) and the
 * currently active UI section, then delegates rendering to atomic
 * sub-components:
 *
 *  - {@link HeroCalendarFloat} — Floating calendar for hero mode.
 *  - {@link HeroExpandTab}     — Chevron tab to open the calendar.
 *  - {@link DestinationSection} / {@link DateSection} / {@link GuestsSection}
 *    — Individual field sections within the bar.
 *  - {@link SearchButton}      — The "Buscar" CTA.
 *  - {@link DestinationPopover} / {@link CalendarPopover}
 *    — Dropdown panels shown when the corresponding section is active.
 *
 * ## Two visual modes
 *
 *  - **`hero`**: Full-width bar on the cinematic landing page. Calendar
 *    floats above the bar. An expand-tab offers first-time calendar entry.
 *  - **`compact`**: Smaller bar pinned in the sticky header. Calendar
 *    drops below the bar as a standard popover.
 *
 * ## Date-picking algorithm (`handlePickDate`)
 *
 * The algorithm handles three scenarios:
 *
 *  1. **Both dates already set** — "Smart replace": the clicked date
 *     replaces whichever existing endpoint is closer, producing
 *     two intuitive results: clicking before the range moves check-in,
 *     clicking after moves check-out, clicking inside replaces the
 *     nearest boundary.
 *
 *  2. **One date set** — Fills the other slot, but validates direction
 *     (check-in must be ≤ check-out). Invalid picks trigger a
 *     flash-and-fade red dot animation via `triggerInvalid()`.
 *
 *  3. **No dates set** — Sets the clicked date into whichever field
 *     is currently active, then auto-advances to the next field.
 */

"use client";

import React, { useState, useEffect } from "react";
import type { SearchBarProps, ActiveSection } from "../domain/types";
import { parseDateHelper } from "../utils/dateUtils";
import { SEARCH_BAR_UI_CONSTANTS } from "../constants/ui";
import { SEARCH_BAR_STYLES as S } from "../theme/search-bar.theme";

// Sub-components
import { HeroCalendarFloat } from "./HeroCalendarFloat";
import { HeroExpandTab } from "./HeroExpandTab";
import { DestinationSection } from "./sections/DestinationSection";
import { DateSection } from "./sections/DateSection";
import { GuestsSection } from "./sections/GuestsSection";
import { SearchButton } from "./sections/SearchButton";
import { DestinationPopover } from "./DestinationPopover";
import { CalendarPopover } from "./CalendarPopover";

const C = SEARCH_BAR_UI_CONSTANTS;

export function ModernSearchBar({ onSearch, className = "", size = 'compact', initialState, onHeroCalendarOpen }: SearchBarProps) {
  // ─── State ──────────────────────────────────────────────────────────
  /** Which section's popover/panel is currently expanded (null = all closed). */
  const [active, setActive] = useState<ActiveSection>(null);

  /** Tracks the flash-and-fade animation for invalid date picks. */
  const [invalidState, setInvalidState] = useState<{ dayStr: string, isFading: boolean } | null>(null);

  /** True once the hero title has been dismissed (prevents re-animation). */
  const [hasHeroTitleDismissed, setHasHeroTitleDismissed] = useState(false);

  /** True once the hero calendar has been opened at least once. */
  const [hasHeroCalendarOpened, setHasHeroCalendarOpened] = useState(false);

  /** True during the 800ms simulated search animation. */
  const [isSearching, setIsSearching] = useState(false);

  /**
   * Refs for the invalid-state timeout IDs. Using refs prevents stale
   * closures and allows cleanup when rapid invalid picks overlap.
   */
  const timeout1Ref = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const timeout2Ref = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  /** Ref for outside-click detection. */
  const containerRef = React.useRef<HTMLDivElement>(null);

  // ─── Field State ────────────────────────────────────────────────────
  const [destination, setDestination] = useState(
    initialState?.destination && initialState?.destination !== 'Todos' ? initialState.destination : ""
  );
  const [checkIn, setCheckIn] = useState(initialState?.checkIn || "");
  const [checkOut, setCheckOut] = useState(initialState?.checkOut || "");
  const [adults, setAdults] = useState(initialState?.adults || 2);
  const [children, setChildren] = useState(initialState?.children || 0);
  const [pets, setPets] = useState(initialState?.pets || 0);

  const isHero = size === 'hero';
  /** Sizing tokens (padding, label/value text sizes, button sizes) for the current variant. */
  const sizing = S.sizing[size];

  // ─── Side Effects ───────────────────────────────────────────────────

  /**
   * Hero-mode title & calendar effects:
   *  - Dismiss the title on first section activation.
   *  - Expand the floating calendar on first date-section activation.
   */
  useEffect(() => {
    if (size === 'hero' && active && !hasHeroTitleDismissed) setHasHeroTitleDismissed(true);
    if (size === 'hero' && (active === 'checkIn' || active === 'checkOut') && !hasHeroCalendarOpened) {
      setHasHeroCalendarOpened(true);
      if (onHeroCalendarOpen) onHeroCalendarOpen();
    }
  }, [active, size, hasHeroCalendarOpened, hasHeroTitleDismissed, onHeroCalendarOpen]);

  /** Close all sections when the user presses Escape. */
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setActive(null); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  /** Close all sections when the user clicks outside the search bar container. */
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setActive(null);
    };
    if (active) window.addEventListener("mousedown", handleOutsideClick);
    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, [active]);

  // ─── Display Helpers ────────────────────────────────────────────────

  /**
   * Formats an ISO date string (e.g. "2026-10-15") into a short
   * locale-friendly display string (e.g. "15 oct").
   */
  const formatUIText = (isoStr: string) => {
    if (!isoStr) return "";
    const [y, m, d] = isoStr.split('-');
    const dt = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
    return new Intl.DateTimeFormat('es-CR', { day: 'numeric', month: 'short' }).format(dt).replace('.', '');
  };

  /**
   * Builds the summary string for the guests field.
   * Uses abbreviated labels when multiple guest types are active
   * to prevent text overflow in the compact bar.
   */
  const formatGuests = () => {
    let text = `${adults} ${adults === 1 ? C.GUESTS.SINGLE_ADULT : C.GUESTS.PLURAL_ADULTS}`;
    if (children > 0 && pets > 0) {
      text = `${adults} ${C.GUESTS.SHORT_ADULT_1} • ${children} ${C.GUESTS.SHORT_CHILDREN_1} • ${pets} ${C.GUESTS.SHORT_PET_1}`;
    } else if (children > 0) {
      text = `${adults} ${C.GUESTS.SHORT_ADULT_2} • ${children} ${children === 1 ? C.GUESTS.SHORT_CHILD : C.GUESTS.SHORT_CHILDREN}`;
    } else if (pets > 0) {
      text = `${adults} ${C.GUESTS.SHORT_ADULT_2} • ${pets} ${C.GUESTS.SHORT_PET}`;
    }
    return text;
  };

  // ─── Date Picker Logic ──────────────────────────────────────────────

  /**
   * Core date-pick handler. See the file-level JSDoc for the full
   * three-scenario algorithm description.
   */
  const handlePickDate = (dayStr: string) => {
    // If no date section is active, auto-detect which field to fill
    let workingActive = active;
    if (workingActive !== "checkIn" && workingActive !== "checkOut") {
      workingActive = !checkIn ? "checkIn" : "checkOut";
      setActive(workingActive);
    }

    // Toggle off: clicking the already-selected date clears it
    if (dayStr === checkIn) { setCheckIn(""); setActive("checkIn"); return; }
    if (dayStr === checkOut) { setCheckOut(""); setActive(!checkIn ? "checkIn" : "checkOut"); return; }

    const clickedVal = parseDateHelper(dayStr);
    const inVal = parseDateHelper(checkIn);
    const outVal = parseDateHelper(checkOut);

    // Scenario 1: Both dates set → smart-replace nearest endpoint
    if (checkIn && checkOut) {
      if (clickedVal < inVal) { setCheckIn(dayStr); }
      else if (clickedVal > outVal) { setCheckOut(dayStr); }
      else {
        const distToIn = clickedVal - inVal;
        const distToOut = outVal - clickedVal;
        if (distToIn <= distToOut) { setCheckIn(dayStr); } else { setCheckOut(dayStr); }
      }
      return;
    }

    /**
     * Triggers a flash-and-fade animation on an invalid date pick.
     * Phase 1 (0→400ms): red dot appears.
     * Phase 2 (400→700ms): dot fades out.
     */
    const triggerInvalid = (ds: string) => {
      if (timeout1Ref.current) clearTimeout(timeout1Ref.current);
      if (timeout2Ref.current) clearTimeout(timeout2Ref.current);
      setInvalidState({ dayStr: ds, isFading: false });
      timeout1Ref.current = setTimeout(() => setInvalidState(old => old?.dayStr === ds ? { ...old, isFading: true } : old), 400);
      timeout2Ref.current = setTimeout(() => setInvalidState(old => old?.dayStr === ds ? null : old), 700);
    };

    // Scenario 2: One date set → validate direction before setting
    if (workingActive === "checkIn" && checkOut && clickedVal > outVal) { triggerInvalid(dayStr); return; }
    if (workingActive === "checkOut" && checkIn && clickedVal < inVal) { triggerInvalid(dayStr); return; }

    // Scenario 3: Set the date and auto-advance to the next field
    if (workingActive === "checkIn") { setCheckIn(dayStr); setActive("checkOut"); }
    else if (workingActive === "checkOut") { setCheckOut(dayStr); setActive(!checkIn ? "checkIn" : "checkOut"); }
  };

  // ─── Search Trigger ─────────────────────────────────────────────────

  /**
   * Simulates a search with an 800ms loading animation, then fires
   * the `onSearch` callback with the current field values.
   */
  const handleSearchTrigger = () => {
    setActive(null);
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      if (onSearch) onSearch({ destination: destination || 'Todos', checkIn, checkOut, adults, children, pets });
    }, 800);
  };

  // ─── Section Class Helper ───────────────────────────────────────────

  /**
   * Builds the full CSS class string for a bar section, combining:
   *  - Base layout classes
   *  - Variant-specific padding
   *  - Section-specific width classes
   *  - Active/inactive visual state
   *  - Faded state (date sections dim when a non-date popover is open
   *    and the hero calendar is already visible)
   */
  const sectionClass = (key: ActiveSection, extra: string) => [
    S.sectionBase, sizing.padding, extra,
    active === key ? S.sectionActive : S.sectionInactive,
    ((active === "where" || active === "who") && hasHeroCalendarOpened && (key === "checkIn" || key === "checkOut")) ? S.sectionFaded : "",
  ].filter(Boolean).join(" ");

  // ─── Render ─────────────────────────────────────────────────────────

  return (
    <div ref={containerRef} className={`${S.container} ${className}`}>

      {/* Hero-only: floating calendar above the bar */}
      {isHero && (
        <HeroCalendarFloat
          active={active}
          hasHeroCalendarOpened={hasHeroCalendarOpened}
          checkIn={checkIn}
          checkOut={checkOut}
          invalidState={invalidState}
          onPickDate={handlePickDate}
        />
      )}

      <div className={S.bar(isHero)}>

        {/* Hero-only: chevron tab to open the calendar for the first time */}
        {isHero && (
          <HeroExpandTab
            hasHeroCalendarOpened={hasHeroCalendarOpened}
            active={active}
            onExpand={() => {
              setHasHeroCalendarOpened(true);
              if (onHeroCalendarOpen) onHeroCalendarOpen();
              if (active !== "checkIn" && active !== "checkOut") setActive("checkIn");
            }}
          />
        )}

        {/* ── Bar sections: Destination → Dates → Guests ── */}

        <DestinationSection
          isActive={active === "where"}
          destination={destination}
          sizing={sizing}
          sectionClass={sectionClass("where", S.sectionDestination)}
          onActivate={() => setActive("where")}
        />

        <div className={S.divider} />

        <DateSection
          label={C.DATES.CHECK_IN_LABEL}
          placeholder={C.DATES.PLACEHOLDER}
          displayValue={formatUIText(checkIn)}
          sizing={sizing}
          sectionClass={sectionClass("checkIn", S.sectionDate)}
          onActivate={() => setActive("checkIn")}
        />

        <div className={S.dividerRelative} />

        <DateSection
          label={C.DATES.CHECK_OUT_LABEL}
          placeholder={C.DATES.PLACEHOLDER}
          displayValue={formatUIText(checkOut)}
          sizing={sizing}
          sectionClass={sectionClass("checkOut", S.sectionDate)}
          onActivate={() => setActive("checkOut")}
        />

        <div className={S.divider} />

        <GuestsSection
          isActive={active === "who"}
          guestsText={formatGuests()}
          sizing={sizing}
          size={size}
          hasCalendarExpanded={hasHeroCalendarOpened}
          sectionClass={sectionClass("who", S.sectionGuests)}
          adults={adults} setAdults={setAdults}
          children={children} setChildren={setChildren}
          pets={pets} setPets={setPets}
          onActivate={() => setActive("who")}
        />

        <SearchButton
          isSearching={isSearching}
          iconClass={sizing.searchBtnIcon}
          paddingClass={sizing.searchBtnPad}
          onTrigger={handleSearchTrigger}
        />

        {/* ── Conditional popovers ── */}

        {/* Destination popover (absolute-positioned inside the bar) */}
        {active === "where" && (
          <DestinationPopover
            variant={size}
            hasCalendarExpanded={hasHeroCalendarOpened}
            onSelect={(v) => { setDestination(v); setActive("checkIn"); }}
            currentSelection={destination}
          />
        )}

        {/* Compact-mode calendar (hero uses HeroCalendarFloat instead) */}
        {(active === "checkIn" || active === "checkOut") && !isHero && (
          <CalendarPopover
            activeMode={active}
            checkIn={checkIn}
            checkOut={checkOut}
            invalidState={invalidState}
            onPickDate={handlePickDate}
          />
        )}

      </div>
    </div>
  );
}
