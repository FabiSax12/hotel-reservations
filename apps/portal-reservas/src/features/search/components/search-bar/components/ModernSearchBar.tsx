/**
 * @file ModernSearchBar.tsx — Top-level search bar orchestrator.
 */

"use client";

import React, { useState, useEffect, useCallback } from "react";
import type { SearchBarProps, ActiveSection, ValidationError } from "../domain/types";
import { parseDateHelper } from "@hotel/ui";
import { SEARCH_BAR_UI_CONSTANTS } from "../constants/ui";
import { SEARCH_BAR_STYLES as S } from "../theme/search-bar.theme";
import { REGIONS_CONFIG } from "../constants/regionsConfig";

// Sub-components
import { HeroCalendarFloat } from "./HeroCalendarFloat";
import { HeroExpandTab } from "./HeroExpandTab";
import { DestinationSection } from "./sections/DestinationSection";
import { DateSection } from "./sections/DateSection";
import { GuestsSection } from "./sections/GuestsSection";
import { SearchButton } from "./sections/SearchButton";
import { DestinationPopover } from "./DestinationPopover";
import { CalendarPopover } from "@hotel/ui";

const C = SEARCH_BAR_UI_CONSTANTS;

export function ModernSearchBar({ onSearch, className = "", size = 'compact', initialState, onHeroCalendarOpen }: SearchBarProps) {
  const [active, setActive] = useState<ActiveSection>(null);
  const lastUserActivatedSection = React.useRef<ActiveSection | null>(null);
  const [invalidState, setInvalidState] = useState<{ dayStr: string, isFading: boolean } | null>(null);
  const [hasHeroTitleDismissed, setHasHeroTitleDismissed] = useState(false);
  const [hasHeroCalendarOpened, setHasHeroCalendarOpened] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [validationError, setValidationError] = useState<ValidationError | null>(null);
  const [isShaking, setIsShaking] = useState(false);

  const timeout1Ref = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const timeout2Ref = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const errorDismissRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const shakeResetRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const onlyOneSede = REGIONS_CONFIG.length === 1 ? REGIONS_CONFIG[0].name : null;
  const [destination, setDestination] = useState(() => {
    if (initialState?.destination && initialState?.destination !== 'Todos') return initialState.destination;
    if (onlyOneSede) return onlyOneSede;
    return "";
  });
  const [checkIn, setCheckIn] = useState(initialState?.checkIn || "");
  const [checkOut, setCheckOut] = useState(initialState?.checkOut || "");
  const [adults, setAdults] = useState(initialState?.adults || 2);
  const [children, setChildren] = useState(initialState?.children || 0);
  const [pets, setPets] = useState(initialState?.pets || 0);

  const isHero = size === 'hero';
  const sizing = S.sizing[size];

  useEffect(() => {
    if (size === 'hero' && active && !hasHeroTitleDismissed) setHasHeroTitleDismissed(true);
    if (size === 'hero' && (active === 'checkIn' || active === 'checkOut') && !hasHeroCalendarOpened) {
      setHasHeroCalendarOpened(true);
      if (onHeroCalendarOpen) onHeroCalendarOpen();
    }
  }, [active, size, hasHeroCalendarOpened, hasHeroTitleDismissed, onHeroCalendarOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setActive(null); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setActive(null);
    };
    if (active) window.addEventListener("mousedown", handleOutsideClick);
    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, [active]);

  useEffect(() => {
    return () => {
      if (timeout1Ref.current) clearTimeout(timeout1Ref.current);
      if (timeout2Ref.current) clearTimeout(timeout2Ref.current);
      if (errorDismissRef.current) clearTimeout(errorDismissRef.current);
      if (shakeResetRef.current) clearTimeout(shakeResetRef.current);
    };
  }, []);

  const showError = useCallback((error: ValidationError) => {
    if (errorDismissRef.current) clearTimeout(errorDismissRef.current);
    if (shakeResetRef.current) clearTimeout(shakeResetRef.current);

    setValidationError(error);
    setIsShaking(true);

    shakeResetRef.current = setTimeout(() => setIsShaking(false), 400);
    errorDismissRef.current = setTimeout(() => setValidationError(null), 4000);
  }, []);

  const clearError = useCallback(() => {
    if (errorDismissRef.current) clearTimeout(errorDismissRef.current);
    setValidationError(null);
  }, []);

  const validateSearch = useCallback((): boolean => {
    const missingIn  = !checkIn;
    const missingOut = !checkOut;

    if (!onlyOneSede && (!destination || !REGIONS_CONFIG.some(r => r.name === destination))) {
      showError({
        message: C.VALIDATION.MISSING_SEDE,
        fields: ["where"],
      });
      return false;
    }

    if (missingIn && missingOut) {
      showError({ message: C.VALIDATION.MISSING_BOTH_DATES, fields: ["checkIn", "checkOut"] });
      return false;
    }

    if (missingIn) { showError({ message: C.VALIDATION.MISSING_CHECK_IN, fields: ["checkIn"] }); return false; }
    if (missingOut) { showError({ message: C.VALIDATION.MISSING_CHECK_OUT, fields: ["checkOut"] }); return false; }

    if (parseDateHelper(checkIn) >= parseDateHelper(checkOut)) {
      showError({ message: C.VALIDATION.INVALID_DATE_RANGE, fields: ["checkIn", "checkOut"] });
      return false;
    }

    return true;
  }, [checkIn, checkOut, showError, destination, onlyOneSede]);

  const formatUIText = (isoStr: string) => {
    if (!isoStr) return "";
    const [y, m, d] = isoStr.split('-');
    const dt = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
    return new Intl.DateTimeFormat('es-CR', { day: 'numeric', month: 'short' }).format(dt).replace('.', '');
  };

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

  const handlePickDate = (dayStr: string) => {
    let workingActive = active;
    const explicitFocus = (workingActive === "checkIn" || workingActive === "checkOut") && lastUserActivatedSection.current === workingActive;
    lastUserActivatedSection.current = null;
    let autoAdvanced = false;
    if (!explicitFocus) {
      workingActive = !checkIn ? "checkIn" : "checkOut";
      setActive(workingActive);
      autoAdvanced = true;
    }

    if (dayStr === checkIn) { setCheckIn(""); setActive("checkIn"); return; }
    if (dayStr === checkOut) { setCheckOut(""); setActive(!checkIn ? "checkIn" : "checkOut"); return; }

    const clickedVal = parseDateHelper(dayStr);
    const inVal = parseDateHelper(checkIn);
    const outVal = parseDateHelper(checkOut);

    if (checkIn && checkOut) {
      if (explicitFocus) {
        if (workingActive === "checkIn") {
          if (checkOut && clickedVal > outVal) { setCheckIn(checkOut); setCheckOut(dayStr); }
          else { setCheckIn(dayStr); }
        } else if (workingActive === "checkOut") {
          if (checkIn && clickedVal < inVal) { setCheckOut(checkIn); setCheckIn(dayStr); }
          else { setCheckOut(dayStr); }
        }
        return;
      }
      const distToIn = Math.abs(clickedVal - inVal);
      const distToOut = Math.abs(clickedVal - outVal);
      if (distToIn <= distToOut) {
        if (clickedVal > outVal) { setCheckIn(checkOut); setCheckOut(dayStr); } else { setCheckIn(dayStr); }
      } else {
        if (clickedVal < inVal) { setCheckOut(checkIn); setCheckIn(dayStr); } else { setCheckOut(dayStr); }
      }
      return;
    }

    if (explicitFocus) {
      if (workingActive === "checkIn" && checkOut) {
        if (clickedVal > outVal) { setCheckIn(checkOut); setCheckOut(dayStr); } else { setCheckIn(dayStr); }
        setActive("checkOut");
        return;
      }
      if (workingActive === "checkOut" && checkIn) {
        if (clickedVal < inVal) { setCheckOut(checkIn); setCheckIn(dayStr); } else { setCheckOut(dayStr); }
        setActive(!checkIn ? "checkIn" : "checkOut");
        return;
      }
    }

    if (autoAdvanced && workingActive === "checkOut" && checkIn) {
      if (clickedVal < inVal) { setCheckOut(checkIn); setCheckIn(dayStr); } else { setCheckOut(dayStr); }
      setActive(!checkIn ? "checkIn" : "checkOut");
      return;
    }

    if (workingActive === "checkIn" && checkOut) {
      if (clickedVal > outVal) { setCheckIn(checkOut); setCheckOut(dayStr); } else { setCheckIn(dayStr); }
      setActive("checkOut");
      return;
    }
    if (workingActive === "checkOut" && checkIn) {
      if (clickedVal < inVal) { setCheckOut(checkIn); setCheckIn(dayStr); } else { setCheckOut(dayStr); }
      setActive(!checkIn ? "checkIn" : "checkOut");
      return;
    }

    if (workingActive === "checkIn") { setCheckIn(dayStr); setActive("checkOut"); }
    else if (workingActive === "checkOut") { setCheckOut(dayStr); setActive(!checkIn ? "checkIn" : "checkOut"); }
  };

  const handleSearchTrigger = () => {
    if (!validateSearch()) return;

    clearError();
    setActive(null);
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      if (onSearch) onSearch({ destination: destination || 'Todos', checkIn, checkOut, adults, children, pets });
    }, 800);
  };

  const activateSection = useCallback((section: ActiveSection) => {
    if (validationError?.fields.includes(section)) clearError();
    setActive(section);
    lastUserActivatedSection.current = section;
  }, [validationError, clearError]);

  const sectionClass = (key: ActiveSection, extra: string) => [
    S.sectionBase, sizing.padding, extra,
    active === key ? S.sectionActive : S.sectionInactive,
    ((active === "where" || active === "who") && hasHeroCalendarOpened && (key === "checkIn" || key === "checkOut")) ? S.sectionFaded : "",
  ].filter(Boolean).join(" ");

  const fieldHasError = (key: ActiveSection): boolean =>
    validationError?.fields.includes(key) ?? false;

  return (
    <div ref={containerRef} className={`${S.container} ${className}`}>
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

        <DestinationSection
          isActive={active === "where"}
          destination={destination}
          sizing={sizing}
          sectionClass={sectionClass("where", S.sectionDestination)}
          onActivate={() => activateSection("where")}
          hasError={fieldHasError("where")}
          isShaking={isShaking && fieldHasError("where")}
        />

        <div className={S.divider} />

        <DateSection
          label={C.DATES.CHECK_IN_LABEL}
          placeholder={C.DATES.PLACEHOLDER}
          displayValue={formatUIText(checkIn)}
          sizing={sizing}
          sectionClass={sectionClass("checkIn", S.sectionDate)}
          onActivate={() => activateSection("checkIn")}
          hasError={fieldHasError("checkIn")}
          isShaking={isShaking && fieldHasError("checkIn")}
        />

        <div className={S.dividerRelative} />

        <DateSection
          label={C.DATES.CHECK_OUT_LABEL}
          placeholder={C.DATES.PLACEHOLDER}
          displayValue={formatUIText(checkOut)}
          sizing={sizing}
          sectionClass={sectionClass("checkOut", S.sectionDate)}
          onActivate={() => activateSection("checkOut")}
          hasError={fieldHasError("checkOut")}
          isShaking={isShaking && fieldHasError("checkOut")}
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
          onActivate={() => activateSection("who")}
        />

        <SearchButton
          isSearching={isSearching}
          iconClass={sizing.searchBtnIcon}
          paddingClass={sizing.searchBtnPad}
          onTrigger={handleSearchTrigger}
          isShaking={isShaking && validationError !== null}
        />

        {active === "where" && (
          <DestinationPopover
            variant={size}
            hasCalendarExpanded={hasHeroCalendarOpened}
            onSelect={(v) => { setDestination(v); activateSection("checkIn"); }}
            currentSelection={destination}
          />
        )}

        {(active === "checkIn" || active === "checkOut") && !isHero && (
          <CalendarPopover
            variant="compact"
            checkIn={checkIn}
            checkOut={checkOut}
            invalidState={invalidState}
            onPickDate={handlePickDate}
            startLabel={C.DATES.CHECK_IN_LABEL}
            endLabel={C.DATES.CHECK_OUT_LABEL}
          />
        )}

        {validationError && (
          <div className={S.errorTooltipWrapper}>
            <div className={S.errorTooltipPill}>
              <svg className={S.errorTooltipIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              <span className={S.errorTooltipText}>{validationError.message}</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
