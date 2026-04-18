"use client";

import { useState } from "react";
import { parseDateHelper } from "../utils/dateUtils";
import { SEARCH_BAR_UI_CONSTANTS } from "../constants/ui";

const C = SEARCH_BAR_UI_CONSTANTS.DATES;

const DAYS_HEADER = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];
const MAX_MONTHS = 24;

interface CalendarInvalidState {
  dayStr: string;
  isFading: boolean;
}

interface CalendarPopoverProps {
  activeMode: string | null;
  checkIn: string;
  checkOut: string;
  invalidState: CalendarInvalidState | null;
  onPickDate: (dayStr: string) => void;
  variant?: "compact" | "hero";
}

export function CalendarPopover({ activeMode, checkIn, checkOut, invalidState, onPickDate, variant }: CalendarPopoverProps) {
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);
  const [currentMonthOffset, setCurrentMonthOffset] = useState(0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const inVal = parseDateHelper(checkIn);
  const outVal = parseDateHelper(checkOut);

  const isHero = variant === "hero";
  const cWidth = isHero
    ? "w-full max-w-[1150px] bg-white rounded-[3rem] shadow-[0_32px_80px_rgba(4,120,87,0.15)] relative z-10"
    : "w-[650px] absolute top-[100%] mt-4 left-1/2 -translate-x-1/2 bg-white rounded-3xl shadow-[0_24px_60px_rgba(0,0,0,0.15)] border border-neutral-200 z-50 animate-in fade-in slide-in-from-top-4 duration-300";
  const cPad = isHero ? "p-8 gap-10" : "p-8 gap-8";

  return (
    <div className={`flex ${cPad} ${cWidth}`}>
      {[0, 1].map((monthIndexLocal) => {
        const absoluteMonthOffset = currentMonthOffset + monthIndexLocal;
        const targetDate = new Date(today.getFullYear(), today.getMonth() + absoluteMonthOffset, 1);
        const year = targetDate.getFullYear();
        const month = targetDate.getMonth();

        const monthStr = new Intl.DateTimeFormat('es-CR', { month: 'long' }).format(targetDate);
        const monthHeader = monthStr.charAt(0).toUpperCase() + monthStr.slice(1);
        const showYear = year !== today.getFullYear() || (absoluteMonthOffset > 0 && month === 0);

        const firstDayOfWeek = targetDate.getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);

        return (
          <div key={absoluteMonthOffset} className="flex-1">
            <div className={`flex items-center justify-between ${isHero ? "mb-6" : "mb-6"}`}>
              {monthIndexLocal === 0 ? (
                <button
                  type="button"
                  disabled={currentMonthOffset === 0}
                  onClick={(e) => { e.stopPropagation(); setCurrentMonthOffset(prev => Math.max(0, prev - 1)); }}
                  className="p-1.5 rounded-full hover:bg-neutral-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-neutral-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                </button>
              ) : <div className="w-8"></div>}

              <h3 className={`${isHero ? "text-2xl" : "text-lg"} font-bold text-neutral-900`}>
                {monthHeader} {showYear ? year : ""}
              </h3>

              {monthIndexLocal === 1 ? (
                <button
                  type="button"
                  disabled={currentMonthOffset >= MAX_MONTHS - 2}
                  onClick={(e) => { e.stopPropagation(); setCurrentMonthOffset(prev => Math.min(MAX_MONTHS - 2, prev + 1)); }}
                  className="p-1.5 rounded-full hover:bg-neutral-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-neutral-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </button>
              ) : <div className="w-8"></div>}
            </div>

            <div className={`grid grid-cols-7 text-center font-bold ${isHero ? "gap-y-4 gap-x-2 mb-4 text-sm uppercase tracking-widest text-neutral-500" : "gap-y-4 gap-x-1 mb-2 text-xs text-neutral-400"}`}>
              {DAYS_HEADER.map(d => <div key={d}>{d}</div>)}
            </div>

            <div className={`grid grid-cols-7 text-center ${isHero ? "gap-y-2 gap-x-2" : "gap-y-1 gap-x-1"}`}>
              {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {dates.map((d) => {
                const dayStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
                const currDate = new Date(year, month, d);
                const currVal = currDate.getTime();

                const isPast = currDate < today;
                const isStart = currVal === inVal;
                const isEnd = currVal === outVal;
                const isSelected = isStart || isEnd || (inVal > 0 && outVal > 0 && currVal > inVal && currVal < outVal);
                const isToday = currVal === today.getTime();

                const isInvalid = invalidState?.dayStr === dayStr;
                const isFading = isInvalid && invalidState?.isFading;

                return (
                  <button
                    key={d}
                    disabled={isPast}
                    onClick={(e) => { e.stopPropagation(); onPickDate(dayStr); }}
                    onMouseEnter={() => !isPast && setHoveredDay(dayStr)}
                    onMouseLeave={() => !isPast && setHoveredDay(null)}
                    className={`group relative flex items-center justify-center w-full ${isHero ? "h-14 text-xl" : "aspect-square text-base"} font-bold transition-colors outline-none focus:outline-none [-webkit-tap-highlight-color:transparent]
                      ${isPast ? "opacity-30 cursor-not-allowed pointer-events-none text-neutral-300" : ""}
                      ${isSelected && !isStart && !isEnd ? "text-emerald-950 font-extrabold" : (isPast ? "" : "text-neutral-800")}
                      ${isStart || isEnd ? "text-white z-10" : ""}
                      ${isToday && !isSelected ? "underline decoration-emerald-500 decoration-4 underline-offset-4" : ""}
                      ${hoveredDay === dayStr ? "!z-50" : ""}
                    `}
                  >
                    {isStart && outVal > 0 && outVal !== inVal && <div className="absolute top-1/2 -translate-y-1/2 right-0 w-1/2 h-[85%] bg-emerald-100 z-0 pointer-events-none"></div>}
                    {isEnd && inVal > 0 && outVal !== inVal && <div className="absolute top-1/2 -translate-y-1/2 left-0 w-1/2 h-[85%] bg-emerald-100 z-0 pointer-events-none"></div>}
                    {isSelected && !isStart && !isEnd && <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 w-full h-[85%] bg-emerald-100 z-0 pointer-events-none"></div>}

                    {!isSelected && !isStart && !isEnd && !isPast && (
                       <div className="absolute h-[85%] aspect-square rounded-full border-2 border-transparent group-hover:border-neutral-900 transition-colors pointer-events-none"></div>
                    )}

                    {isStart && <div className="absolute h-[85%] aspect-square bg-emerald-700 rounded-full z-10 shadow-md transition-transform active:scale-95 group-hover:scale-105"></div>}
                    {isEnd && !isStart && <div className="absolute h-[85%] aspect-square bg-emerald-700 rounded-full z-10 shadow-md transition-transform active:scale-95 ring-2 ring-emerald-700 ring-offset-2 group-hover:scale-105"></div>}
                    {isStart && isEnd && <div className="absolute h-[85%] aspect-square bg-emerald-700 rounded-full z-10 shadow-md transition-transform active:scale-95 group-hover:scale-105"></div>}

                    {isInvalid && (
                      <div className={`absolute h-[85%] aspect-square bg-red-500 rounded-full z-20 shadow-[0_0_15px_rgba(239,68,68,0.5)] transition-all ease-in-out ${isFading ? 'opacity-0 scale-90 duration-300' : 'opacity-90 scale-100 animate-in zoom-in-75 duration-200'}`}></div>
                    )}

                    {isStart && hoveredDay === dayStr && !isInvalid && (
                      <div className={`absolute ${isHero ? "-top-12 text-xs px-4 py-2" : "-top-9 text-[10px] px-3 py-1.5"} bg-emerald-950 text-white uppercase font-black tracking-widest rounded-lg z-50 animate-in fade-in slide-in-from-bottom-2 duration-200 shadow-xl whitespace-nowrap pointer-events-none`}>
                        {C.CHECK_IN_LABEL}
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-emerald-950 rotate-45 rounded-sm"></div>
                      </div>
                    )}
                    {isEnd && !isStart && hoveredDay === dayStr && !isInvalid && (
                      <div className={`absolute ${isHero ? "-top-12 text-xs px-4 py-2" : "-top-9 text-[10px] px-3 py-1.5"} bg-emerald-950 text-white uppercase font-black tracking-widest rounded-lg z-50 animate-in fade-in slide-in-from-bottom-2 duration-200 shadow-xl whitespace-nowrap pointer-events-none`}>
                        {C.CHECK_OUT_LABEL}
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-emerald-950 rotate-45 rounded-sm"></div>
                      </div>
                    )}

                    <span className={`relative z-30 ${isInvalid ? 'text-white' : ''}`}>{d}</span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
