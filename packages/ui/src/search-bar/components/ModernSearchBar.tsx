"use client";

import React, { useState, useEffect } from "react";
import type { SearchBarProps, ActiveSection } from "../domain/types";
import { parseDateHelper } from "../utils/dateUtils";
import { SEARCH_BAR_UI_CONSTANTS } from "../constants/ui";
import { DestinationPopover } from "./DestinationPopover";
import { GuestsPopover } from "./GuestsPopover";
import { CalendarPopover } from "./CalendarPopover";

const C = SEARCH_BAR_UI_CONSTANTS;

export function ModernSearchBar({ onSearch, className = "", size = 'compact', initialState, onHeroCalendarOpen }: SearchBarProps) {
  const [active, setActive] = useState<ActiveSection>(null);
  const [invalidState, setInvalidState] = useState<{ dayStr: string, isFading: boolean } | null>(null);
  const [hasHeroTitleDismissed, setHasHeroTitleDismissed] = useState(false);
  const [hasHeroCalendarOpened, setHasHeroCalendarOpened] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const timeout1Ref = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const timeout2Ref = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [destination, setDestination] = useState(
    initialState?.destination && initialState?.destination !== 'Todos' ? initialState.destination : ""
  );
  const [checkIn, setCheckIn] = useState(initialState?.checkIn || "");
  const [checkOut, setCheckOut] = useState(initialState?.checkOut || "");
  const [adults, setAdults] = useState(initialState?.adults || 2);
  const [children, setChildren] = useState(initialState?.children || 0);
  const [pets, setPets] = useState(initialState?.pets || 0);

  const isHero = size === 'hero';

  // ---- Side Effects ----

  useEffect(() => {
    if (size === 'hero' && active && !hasHeroTitleDismissed) {
      setHasHeroTitleDismissed(true);
    }
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
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActive(null);
      }
    };
    if (active) {
      window.addEventListener("mousedown", handleOutsideClick);
    }
    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, [active]);

  // ---- Helpers ----

  const formatUIText = (isoStr: string) => {
    if (!isoStr) return "";
    const [y, m, d] = isoStr.split('-');
    const dt = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
    return new Intl.DateTimeFormat('es-CR', { day: 'numeric', month: 'short' }).format(dt).replace('.', '');
  };

  const formatGuests = () => {
    let guestsText = `${adults} ${adults === 1 ? C.GUESTS.SINGLE_ADULT : C.GUESTS.PLURAL_ADULTS}`;
    if (children > 0 && pets > 0) {
      guestsText = `${adults} ${C.GUESTS.SHORT_ADULT_1} • ${children} ${C.GUESTS.SHORT_CHILDREN_1} • ${pets} ${C.GUESTS.SHORT_PET_1}`;
    } else if (children > 0) {
      guestsText = `${adults} ${C.GUESTS.SHORT_ADULT_2} • ${children} ${children === 1 ? C.GUESTS.SHORT_CHILD : C.GUESTS.SHORT_CHILDREN}`;
    } else if (pets > 0) {
      guestsText = `${adults} ${C.GUESTS.SHORT_ADULT_2} • ${pets} ${C.GUESTS.SHORT_PET}`;
    }
    return guestsText;
  };

  // ---- Date Picker Logic ----

  const handlePickDate = (dayStr: string) => {
    let workingActive = active;
    if (workingActive !== "checkIn" && workingActive !== "checkOut") {
      workingActive = !checkIn ? "checkIn" : "checkOut";
      setActive(workingActive);
    }

    if (dayStr === checkIn) { setCheckIn(""); setActive("checkIn"); return; }
    if (dayStr === checkOut) {
      setCheckOut("");
      setActive(!checkIn ? "checkIn" : "checkOut");
      return;
    }

    const clickedVal = parseDateHelper(dayStr);
    const inVal = parseDateHelper(checkIn);
    const outVal = parseDateHelper(checkOut);

    if (checkIn && checkOut) {
      if (clickedVal < inVal) { setCheckIn(dayStr); }
      else if (clickedVal > outVal) { setCheckOut(dayStr); }
      else if (clickedVal > inVal && clickedVal < outVal) {
        const distToIn = clickedVal - inVal;
        const distToOut = outVal - clickedVal;
        if (distToIn <= distToOut) { setCheckIn(dayStr); } else { setCheckOut(dayStr); }
      }
      return;
    }

    const triggerInvalid = (ds: string) => {
      if (timeout1Ref.current) clearTimeout(timeout1Ref.current);
      if (timeout2Ref.current) clearTimeout(timeout2Ref.current);
      setInvalidState({ dayStr: ds, isFading: false });
      timeout1Ref.current = setTimeout(() => setInvalidState(old => old?.dayStr === ds ? { ...old, isFading: true } : old), 400);
      timeout2Ref.current = setTimeout(() => setInvalidState(old => old?.dayStr === ds ? null : old), 700);
    };

    if (workingActive === "checkIn" && checkOut && clickedVal > outVal) { triggerInvalid(dayStr); return; }
    if (workingActive === "checkOut" && checkIn && clickedVal < inVal) { triggerInvalid(dayStr); return; }

    if (workingActive === "checkIn") {
      setCheckIn(dayStr);
      setActive("checkOut");
    } else if (workingActive === "checkOut") {
      setCheckOut(dayStr);
      setActive(!checkIn ? "checkIn" : "checkOut");
    }
  };

  // ---- Search Trigger ----

  const handleSearchTrigger = () => {
    setActive(null);
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      if (onSearch) {
        onSearch({ destination: destination || 'Todos', checkIn, checkOut, adults, children, pets });
      }
    }, 800);
  };

  // ---- Sizing Tokens ----

  const sectionPadding = isHero ? "px-10 py-5" : "px-6 py-2";
  const labelText = isHero ? "text-sm" : "text-[11px]";
  const valueText = isHero ? "text-xl" : "text-[15px]";
  const searchBtnPadding = isHero ? "px-8 py-4" : "px-6 py-2";
  const searchBtnIconSize = isHero ? "w-6 h-6" : "w-5 h-5";

  // ---- Render ----

  return (
    <div ref={containerRef} className={`relative z-50 w-full flex flex-col items-center ${className}`}>

      {/* Hero floating calendar */}
      {size === 'hero' && (
        <div className="absolute top-full mt-6 left-0 right-0 w-full z-10 flex flex-col items-center pointer-events-none">
          <div
            className="w-full flex flex-col items-center"
            style={{
              transition: `transform 800ms cubic-bezier(0.22, 1, 0.36, 1) 150ms, opacity ${(active === "where" || active === "who") ? '200ms ease-out' : '800ms ease 100ms'}`,
              transform: hasHeroCalendarOpened ? 'translateY(0)' : 'translateY(-40px)',
              opacity: hasHeroCalendarOpened ? ((active === "where" || active === "who") ? 0.30 : 1) : 0,
              pointerEvents: hasHeroCalendarOpened && !(active === "where" || active === "who") ? 'auto' : 'none'
            }}
          >
            <CalendarPopover variant="hero" activeMode={active} checkIn={checkIn} checkOut={checkOut} invalidState={invalidState} onPickDate={handlePickDate} />
          </div>
        </div>
      )}

      <div className={`relative flex items-stretch rounded-full border border-neutral-200 shadow-[0_12px_40px_rgba(0,0,0,0.08)] overflow-visible transition-colors z-50 w-full bg-white ${isHero ? "shadow-2xl" : ""}`}>

        {/* Hero calendar expand tab */}
        {size === 'hero' && (
          <button
            type="button"
            style={{
              transition: "opacity 300ms ease, transform 300ms ease",
              opacity: hasHeroCalendarOpened ? 0 : 1,
              transform: hasHeroCalendarOpened ? 'translateY(-10px)' : 'translateY(0)',
              pointerEvents: hasHeroCalendarOpened ? 'none' : 'auto'
            }}
            onClick={(e) => {
              e.stopPropagation();
              setHasHeroCalendarOpened(true);
              if (onHeroCalendarOpen) onHeroCalendarOpen();
              if (active !== "checkIn" && active !== "checkOut") setActive("checkIn");
            }}
            className="absolute -bottom-[26px] left-[42%] -translate-x-[50%] bg-white px-6 py-1.5 rounded-b-xl border-b border-l border-r border-neutral-200/50 shadow-[0_6px_16px_rgba(0,0,0,0.03)] flex items-center justify-center hover:bg-neutral-50 transition-colors cursor-pointer group -z-10"
          >
            <svg className="w-5 h-5 text-emerald-600 transition-transform duration-300 ease-out group-hover:translate-y-1 group-active:translate-y-2 group-active:scale-95" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}

        {/* Destination Section */}
        <div
          onClick={() => setActive("where")}
          className={`flex-[1.2] relative flex flex-col justify-center ${sectionPadding} pl-10 pr-6 rounded-full cursor-pointer transition flex-shrink-0
            ${active === "where" ? 'bg-white shadow-lg' : 'hover:bg-black/5'}
          `}
        >
          <div className={`${labelText} font-extrabold tracking-widest text-neutral-800 uppercase mb-0.5 pointer-events-none`}>{C.DESTINATION.LABEL}</div>
          <div className="flex items-center gap-2">
             <div className={`w-full bg-transparent border-none outline-none focus:outline-none ${valueText} font-bold mt-0.5 truncate pointer-events-none ${!destination ? 'text-neutral-400' : 'text-emerald-950'}`}>
               {destination || C.DESTINATION.PLACEHOLDER}
             </div>
          </div>
        </div>

        <div className="self-center w-[1px] h-10 bg-neutral-300/80" />

        {/* Check In Section */}
        <div
          onClick={() => setActive("checkIn")}
          className={`flex-1 relative flex flex-col justify-center ${sectionPadding} rounded-full cursor-pointer transition
            ${active === "checkIn" ? 'bg-white shadow-lg' : 'hover:bg-black/5'}
            ${(active === "where" || active === "who") && hasHeroCalendarOpened ? 'opacity-30' : ''}
          `}
        >
          <div className={`${labelText} font-extrabold tracking-widest text-neutral-800 uppercase mb-0.5 pointer-events-none`}>{C.DATES.CHECK_IN_LABEL}</div>
          <div className={`${valueText} text-emerald-950 font-bold truncate mt-0.5 pointer-events-none`}>{formatUIText(checkIn) || C.DATES.PLACEHOLDER}</div>
        </div>

        <div className="self-center w-[1px] h-10 bg-neutral-300/80 relative" />

        {/* Check Out Section */}
        <div
          onClick={() => setActive("checkOut")}
          className={`flex-1 relative flex flex-col justify-center ${sectionPadding} rounded-full cursor-pointer transition
            ${active === "checkOut" ? 'bg-white shadow-lg' : 'hover:bg-black/5'}
            ${(active === "where" || active === "who") && hasHeroCalendarOpened ? 'opacity-30' : ''}
          `}
        >
          <div className={`${labelText} font-extrabold tracking-widest text-neutral-800 uppercase mb-0.5 pointer-events-none`}>{C.DATES.CHECK_OUT_LABEL}</div>
          <div className={`${valueText} text-emerald-950 font-bold truncate mt-0.5 pointer-events-none`}>{formatUIText(checkOut) || C.DATES.PLACEHOLDER}</div>
        </div>

        <div className="self-center w-[1px] h-10 bg-neutral-300/80" />

        {/* Guests Section */}
        <div
          onClick={() => setActive("who")}
          className={`flex-[1.2] relative flex flex-col justify-center ${sectionPadding} rounded-full cursor-pointer transition flex-shrink-0
            ${active === "who" ? 'bg-white shadow-lg' : 'hover:bg-black/5'}
          `}
        >
          <div className={`${labelText} font-extrabold tracking-widest text-neutral-800 uppercase mb-0.5 pointer-events-none`}>{C.GUESTS.LABEL}</div>
          <div className={`${valueText} text-emerald-950 font-bold truncate mt-0.5 pointer-events-none`}>
            {formatGuests()}
          </div>
          {active === "who" && (
            <GuestsPopover
              variant={size}
              hasCalendarExpanded={hasHeroCalendarOpened}
              adults={adults} setAdults={setAdults}
              children={children} setChildren={setChildren}
              pets={pets} setPets={setPets}
            />
          )}
        </div>

        {/* Search Button */}
        <div className="flex-shrink-0 pr-4 md:pr-5 flex items-center z-10">
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); handleSearchTrigger(); }}
            className={`flex items-center justify-center bg-emerald-700 hover:bg-emerald-800 text-white rounded-full transition-all duration-300 font-bold shadow-md hover:shadow-lg active:scale-95 ${searchBtnPadding} gap-2 whitespace-nowrap`}
          >
            {isSearching ? (
              <svg className={`${searchBtnIconSize} animate-spin`} fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg className={searchBtnIconSize} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            )}
            <span className="md:block mr-1">{C.ACTION.SEARCH_BTN}</span>
          </button>
        </div>

        {/* Destination Popover */}
        {active === "where" && (
          <DestinationPopover
            variant={size}
            hasCalendarExpanded={hasHeroCalendarOpened}
            onSelect={(v) => { setDestination(v); setActive("checkIn"); }}
            currentSelection={destination}
          />
        )}

        {/* Compact Calendar Popover */}
        {(active === "checkIn" || active === "checkOut") && !isHero && (
          <CalendarPopover activeMode={active} checkIn={checkIn} checkOut={checkOut} invalidState={invalidState} onPickDate={handlePickDate} />
        )}

      </div>
    </div>
  );
}
