"use client";

import React, { useState, useEffect } from "react";

// --- Subcomponents for Popovers ---

function DestinationPopover({ onSelect, currentSelection, variant, hasCalendarExpanded }: { onSelect: (v: string) => void, currentSelection: string, variant?: 'compact'|'hero', hasCalendarExpanded?: boolean }) {
  const regions = [
    { 
      name: "Arenal & La Fortuna", 
      desc: "Volcanes, aguas termales, selvas tropicales", 
      icon: "🌋",
      image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2062&auto=format&fit=crop",
      highlights: ["Habitaciones con vista al volcán", "Aguas termales minerales privadas", "Aventuras de senderismo incrustadas"],
      priceFrom: 180
    },
    { 
      name: "Monteverde", 
      desc: "Bosques nubosos, tirolesas, vida silvestre", 
      icon: "☁️",
      image: "https://images.unsplash.com/photo-1542314831-c6a4d27a6584?q=80&w=2070&auto=format&fit=crop",
      highlights: ["Inmersión en el bosque nuboso", "Eco-lodges exclusivos y privados", "Avistamiento de fauna exótica"],
      priceFrom: 145
    },
  ];

  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [hoverTimer, setHoverTimer] = useState<NodeJS.Timeout | null>(null);

  const isHero = variant === "hero";
  const positionClasses = (isHero && hasCalendarExpanded) ? "top-[100%] mt-6" : "top-[100%] mt-4";
  const animateClasses = "origin-top slide-in-from-top-4";

  const handleMouseEnter = (name: string) => {
    if (hoverTimer) clearTimeout(hoverTimer);
    const timer = setTimeout(() => {
      setHoveredRegion(name);
    }, 400);
    setHoverTimer(timer);
  };

  const handleMouseLeave = () => {
    if (hoverTimer) clearTimeout(hoverTimer);
    const timer = setTimeout(() => {
      setHoveredRegion(null);
    }, 200);
    setHoverTimer(timer);
  };

  const hoveredData = regions.find(r => r.name === hoveredRegion);

  return (
    <>
      <div 
        className={`absolute left-0 w-[400px] bg-white rounded-3xl shadow-[0_24px_60px_rgba(0,0,0,0.15)] border border-neutral-200 p-6 z-50 animate-in fade-in duration-300 cursor-default text-left ${positionClasses} ${animateClasses}`}
        onMouseLeave={handleMouseLeave}
        onClick={e => e.stopPropagation()}
      >
        <h3 className="text-sm font-bold text-neutral-800 mb-4 uppercase tracking-wider">Nuestras Sedes</h3>
        <div className="flex flex-col gap-2">
          {regions.map((region) => (
            <button 
              key={region.name} 
              onClick={() => onSelect(region.name)}
              onMouseEnter={() => handleMouseEnter(region.name)}
              className={`flex items-center gap-4 p-3 rounded-2xl transition text-left group
                ${currentSelection === region.name ? "bg-emerald-50 scale-[0.98]" : "hover:bg-neutral-100"}
                ${hoveredRegion === region.name && currentSelection !== region.name ? "bg-neutral-100" : ""}
              `}
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl transition-colors shadow-sm
                ${currentSelection === region.name ? "bg-emerald-200" : "bg-neutral-100 group-hover:bg-white"}
                ${hoveredRegion === region.name && currentSelection !== region.name ? "bg-white" : ""}
              `}>
                {region.icon}
              </div>
              <div className="flex-1">
                <div className={`text-lg font-bold transition-colors ${currentSelection === region.name ? "text-emerald-900" : "text-neutral-900"}`}>{region.name}</div>
                <div className="text-sm text-neutral-500">{region.desc}</div>
              </div>
              <svg className={`w-5 h-5 transition-transform ${hoveredRegion === region.name || currentSelection === region.name ? "text-emerald-600 translate-x-1" : "text-neutral-300 group-hover:text-emerald-400 group-hover:translate-x-1"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {hoveredData && (
        <div 
          className={`absolute left-[416px] ${isHero ? 'right-0' : 'w-[650px] right-auto'} bg-white rounded-3xl shadow-[0_24px_60px_rgba(0,0,0,0.15)] border border-neutral-200 overflow-hidden z-50 animate-in fade-in slide-in-from-left-2 duration-200 ease-out flex flex-row text-left ${positionClasses}`}
          onMouseEnter={() => {
            if (hoverTimer) clearTimeout(hoverTimer);
          }}
          onMouseLeave={handleMouseLeave}
          style={{ height: '260px' }}
        >
          <div className="w-[45%] relative shrink-0 bg-neutral-100 flex flex-col">
             <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${hoveredData.image}')` }} />
             <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-emerald-900/20 to-transparent" />
             <div className="absolute bottom-5 left-5 right-5 text-white z-10">
                <div className="text-[10px] font-black uppercase tracking-widest mb-0.5 text-emerald-300">Desde</div>
                <div className="text-2xl font-black">${hoveredData.priceFrom} <span className="text-xs font-medium opacity-80">USD/noche</span></div>
             </div>
          </div>
          <div className="w-[55%] p-6 md:p-8 flex flex-col justify-center bg-white relative z-20">
            <h4 className="text-[26px] font-black text-emerald-950 mb-5 tracking-tight leading-none">{hoveredData.name}</h4>
            <ul className="flex flex-col gap-3">
              {hoveredData.highlights.map((h, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-bold text-neutral-600">
                  <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0 shadow-sm border border-emerald-100">
                    <svg className="w-3.5 h-3.5 text-emerald-600 font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  </div>
                  <span className="leading-snug">{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

function GuestsPopover({ adults, setAdults, children, setChildren, pets, setPets, variant, hasCalendarExpanded }: any) {
  const Stepper = ({ title, subtitle, value, setter, min = 0 }: any) => (
    <div className="flex items-center justify-between py-6 border-b border-neutral-100 last:border-0">
      <div>
        <div className="text-lg font-bold text-neutral-900">{title}</div>
        <div className="text-neutral-500 font-medium">{subtitle}</div>
      </div>
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setter(Math.max(min, value - 1))}
          className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors outline-none focus:outline-none [-webkit-tap-highlight-color:transparent] ${value <= min ? 'border-neutral-200 text-neutral-300 cursor-not-allowed' : 'border-neutral-400 text-neutral-600 hover:border-neutral-900 hover:text-neutral-900'}`}
        >
          <svg className="w-5 h-5 font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" /></svg>
        </button>
        <span className="w-6 text-center text-xl font-bold text-neutral-900">{value}</span>
        <button 
          onClick={() => setter(value + 1)}
          className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-neutral-400 text-neutral-600 hover:border-neutral-900 hover:text-neutral-900 transition-colors outline-none focus:outline-none [-webkit-tap-highlight-color:transparent]"
        >
          <svg className="w-5 h-5 font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
        </button>
      </div>
    </div>
  );

  const isHero = variant === "hero";
  const posClasses = (isHero && hasCalendarExpanded) ? "top-[100%] mt-6 origin-top slide-in-from-top-4" : "top-[100%] mt-4 origin-top slide-in-from-top-4";

  return (
    <div 
      className={`absolute left-1/2 -translate-x-1/2 w-[450px] bg-white rounded-3xl shadow-[0_24px_60px_rgba(0,0,0,0.15)] border border-neutral-200 p-8 z-50 animate-in fade-in duration-300 cursor-default text-left ${posClasses}`}
      onClick={e => e.stopPropagation()}
    >
      <Stepper title="Adultos" subtitle="Edad 13 o superior" value={adults} setter={setAdults} min={1} />
      <Stepper title="Niños" subtitle="Edades 2-12" value={children} setter={setChildren} />
      <Stepper title="Mascotas" subtitle="¿Viajas con peludos?" value={pets} setter={setPets} />
    </div>
  );
}

const parseDateHelper = (isoStr: string) => {
  if (!isoStr) return 0;
  return new Date(isoStr + "T00:00:00").getTime();
};

function CalendarPopover({ activeMode, checkIn, checkOut, invalidState, onPickDate, variant }: any) {
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);
  const [currentMonthOffset, setCurrentMonthOffset] = useState(0);
  const maxMonths = 24;

  const daysHeader = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const inVal = parseDateHelper(checkIn);
  const outVal = parseDateHelper(checkOut);
  
  const isHero = variant === "hero";
  const cWidth = isHero ? "w-full max-w-[1150px] bg-white rounded-[3rem] shadow-[0_32px_80px_rgba(4,120,87,0.15)] relative z-10" : "w-[650px] absolute top-[100%] mt-4 left-1/2 -translate-x-1/2 bg-white rounded-3xl shadow-[0_24px_60px_rgba(0,0,0,0.15)] border border-neutral-200 z-50 animate-in fade-in slide-in-from-top-4 duration-300";
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
                  disabled={currentMonthOffset >= maxMonths - 2}
                  onClick={(e) => { e.stopPropagation(); setCurrentMonthOffset(prev => Math.min(maxMonths - 2, prev + 1)); }}
                  className="p-1.5 rounded-full hover:bg-neutral-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-neutral-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </button>
              ) : <div className="w-8"></div>}
            </div>
            
            <div className={`grid grid-cols-7 text-center font-bold ${isHero ? "gap-y-4 gap-x-2 mb-4 text-sm uppercase tracking-widest text-neutral-500" : "gap-y-4 gap-x-1 mb-2 text-xs text-neutral-400"}`}>
              {daysHeader.map(d => <div key={d}>{d}</div>)}
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
                        Llegada
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-emerald-950 rotate-45 rounded-sm"></div>
                      </div>
                    )}
                    {isEnd && !isStart && hoveredDay === dayStr && !isInvalid && (
                      <div className={`absolute ${isHero ? "-top-12 text-xs px-4 py-2" : "-top-9 text-[10px] px-3 py-1.5"} bg-emerald-950 text-white uppercase font-black tracking-widest rounded-lg z-50 animate-in fade-in slide-in-from-bottom-2 duration-200 shadow-xl whitespace-nowrap pointer-events-none`}>
                        Salida
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

type ActiveSection = "where" | "checkIn" | "checkOut" | "who" | null;

export interface SearchState {
  destination: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  pets: number;
}

interface SearchBarProps {
  onSearch?: (state: SearchState) => void;
  className?: string; 
  size?: 'compact' | 'hero';
  initialState?: Partial<SearchState>;
  onHeroCalendarOpen?: () => void;
}

export function ModernSearchBar({ onSearch, className = "", size = 'compact', initialState, onHeroCalendarOpen }: SearchBarProps) {
  const [active, setActive] = useState<ActiveSection>(null);
  const [invalidState, setInvalidState] = useState<{ dayStr: string, isFading: boolean } | null>(null);
  const [hasHeroTitleDismissed, setHasHeroTitleDismissed] = useState(false);
  const [hasHeroCalendarOpened, setHasHeroCalendarOpened] = useState(false);
  const timeout1Ref = React.useRef<NodeJS.Timeout | null>(null);
  const timeout2Ref = React.useRef<NodeJS.Timeout | null>(null);

  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (size === 'hero' && active && !hasHeroTitleDismissed) {
      setHasHeroTitleDismissed(true);
    }
    if (size === 'hero' && (active === 'checkIn' || active === 'checkOut') && !hasHeroCalendarOpened) {
      setHasHeroCalendarOpened(true);
      if (onHeroCalendarOpen) onHeroCalendarOpen();
    }
  }, [active, size, hasHeroCalendarOpened, hasHeroTitleDismissed, onHeroCalendarOpen]);

  const formatUIText = (isoStr: string) => {
    if (!isoStr) return "";
    const [y, m, d] = isoStr.split('-');
    const dt = new Date(parseInt(y), parseInt(m)-1, parseInt(d));
    return new Intl.DateTimeFormat('es-CR', { day: 'numeric', month: 'short' }).format(dt).replace('.', '');
  };

  const [destination, setDestination] = useState(initialState?.destination && initialState?.destination !== 'Todos' ? initialState.destination : "");
  const [checkIn, setCheckIn] = useState(initialState?.checkIn || "");
  const [checkOut, setCheckOut] = useState(initialState?.checkOut || "");
  
  const [adults, setAdults] = useState(initialState?.adults || 2);
  const [children, setChildren] = useState(initialState?.children || 0);
  const [pets, setPets] = useState(initialState?.pets || 0);

  const isHero = size === 'hero';

  const formatGuests = () => {
    let guestsText = `${adults} ${adults === 1 ? 'Adulto' : 'Adultos'}`;
    if (children > 0 && pets > 0) {
      guestsText = `${adults} Ad. • ${children} Ni. • ${pets} Mas.`;
    } else if (children > 0) {
      guestsText = `${adults} Adult. • ${children} ${children === 1 ? 'Niño' : 'Niños'}`;
    } else if (pets > 0) {
      guestsText = `${adults} Adult. • ${pets} ${pets === 1 ? 'Masc.' : 'Masc.'}`;
    }
    return guestsText;
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setActive(null); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handlePickDate = (dayStr: string) => {
    let workingActive = active;
    if (workingActive !== "checkIn" && workingActive !== "checkOut") {
      workingActive = !checkIn ? "checkIn" : "checkOut";
      setActive(workingActive);
    }

    if (dayStr === checkIn) {
      setCheckIn("");
      setActive("checkIn");
      return;
    }
    if (dayStr === checkOut) {
      setCheckOut("");
      if (!checkIn) {
        setActive("checkIn");
      } else {
        setActive("checkOut");
      }
      return;
    }

    const clickedVal = parseDateHelper(dayStr);
    const inVal = parseDateHelper(checkIn);
    const outVal = parseDateHelper(checkOut);

    if (checkIn && checkOut) {
      if (clickedVal < inVal) {
        setCheckIn(dayStr);
      } else if (clickedVal > outVal) {
        setCheckOut(dayStr);
      } else if (clickedVal > inVal && clickedVal < outVal) {
        const distToIn = clickedVal - inVal;
        const distToOut = outVal - clickedVal;
        if (distToIn <= distToOut) {
          setCheckIn(dayStr);
        } else {
          setCheckOut(dayStr);
        }
      }
      return;
    }

    if (workingActive === "checkIn" && checkOut && clickedVal > outVal) {
      if (timeout1Ref.current) clearTimeout(timeout1Ref.current);
      if (timeout2Ref.current) clearTimeout(timeout2Ref.current);
      setInvalidState({ dayStr, isFading: false });
      timeout1Ref.current = setTimeout(() => setInvalidState(old => old?.dayStr === dayStr ? { ...old, isFading: true } : old), 400);
      timeout2Ref.current = setTimeout(() => setInvalidState(old => old?.dayStr === dayStr ? null : old), 700);
      return;
    }

    if (workingActive === "checkOut" && checkIn && clickedVal < inVal) {
      if (timeout1Ref.current) clearTimeout(timeout1Ref.current);
      if (timeout2Ref.current) clearTimeout(timeout2Ref.current);
      setInvalidState({ dayStr, isFading: false });
      timeout1Ref.current = setTimeout(() => setInvalidState(old => old?.dayStr === dayStr ? { ...old, isFading: true } : old), 400);
      timeout2Ref.current = setTimeout(() => setInvalidState(old => old?.dayStr === dayStr ? null : old), 700);
      return;
    }

    if (workingActive === "checkIn") {
      setCheckIn(dayStr);
      setActive("checkOut");
    } else if (workingActive === "checkOut") {
      setCheckOut(dayStr);
      if (!checkIn) {
        setActive("checkIn");
      } else {
        setActive("checkOut");
      }
      return;
    }
  };

  const sectionPadding = isHero ? "px-10 py-5" : "px-6 py-2";
  const labelText = isHero ? "text-sm" : "text-[11px]";
  const valueText = isHero ? "text-xl" : "text-[15px]";
  const searchBtnPadding = isHero ? "px-8 py-4" : "px-6 py-2";
  const searchBtnIconSize = isHero ? "w-6 h-6" : "w-5 h-5";

  const handleSearchTrigger = () => {
    setActive(null);
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      if (onSearch) {
        onSearch({
          destination: destination || 'Todos',
          checkIn,
          checkOut,
          adults,
          children,
          pets
        });
      }
    }, 800);
  };

  const containerRef = React.useRef<HTMLDivElement>(null);

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

  return (
    <div ref={containerRef} className={`relative z-50 w-full flex flex-col items-center ${className}`}>
      {size === 'hero' && (
        <div 
          className="absolute top-full mt-6 left-0 right-0 w-full z-10 flex flex-col items-center pointer-events-none"
        >
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
        
        <div 
          onClick={() => setActive("where")}
          className={`flex-[1.2] relative flex flex-col justify-center ${sectionPadding} pl-10 pr-6 rounded-full cursor-pointer transition flex-shrink-0
            ${active === "where" ? 'bg-white shadow-lg' : 'hover:bg-black/5'}
          `}
        >
          <div className={`${labelText} font-extrabold tracking-widest text-neutral-800 uppercase mb-0.5 pointer-events-none`}>Sede</div>
          <div className="flex items-center gap-2">
             <div className={`w-full bg-transparent border-none outline-none focus:outline-none ${valueText} font-bold mt-0.5 truncate pointer-events-none ${!destination ? 'text-neutral-400' : 'text-emerald-950'}`}>
               {destination || "¿A cuál vas?"}
             </div>
          </div>
        </div>

        <div className="self-center w-[1px] h-10 bg-neutral-300/80" />

        <div 
          onClick={() => setActive("checkIn")}
          className={`flex-1 relative flex flex-col justify-center ${sectionPadding} rounded-full cursor-pointer transition
            ${active === "checkIn" ? 'bg-white shadow-lg' : 'hover:bg-black/5'}
            ${(active === "where" || active === "who") && hasHeroCalendarOpened ? 'opacity-30' : ''}
          `}
        >
          <div className={`${labelText} font-extrabold tracking-widest text-neutral-800 uppercase mb-0.5 pointer-events-none`}>Llegada</div>
          <div className={`${valueText} text-emerald-950 font-bold truncate mt-0.5 pointer-events-none`}>{formatUIText(checkIn) || "Fechas"}</div>
        </div>

        <div className="self-center w-[1px] h-10 bg-neutral-300/80 relative" />

        <div 
          onClick={() => setActive("checkOut")}
          className={`flex-1 relative flex flex-col justify-center ${sectionPadding} rounded-full cursor-pointer transition
            ${active === "checkOut" ? 'bg-white shadow-lg' : 'hover:bg-black/5'}
            ${(active === "where" || active === "who") && hasHeroCalendarOpened ? 'opacity-30' : ''}
          `}
        >
          <div className={`${labelText} font-extrabold tracking-widest text-neutral-800 uppercase mb-0.5 pointer-events-none`}>Salida</div>
          <div className={`${valueText} text-emerald-950 font-bold truncate mt-0.5 pointer-events-none`}>{formatUIText(checkOut) || "Fechas"}</div>
        </div>

        <div className="self-center w-[1px] h-10 bg-neutral-300/80" />

        <div 
          onClick={() => setActive("who")}
          className={`flex-[1.2] relative flex flex-col justify-center ${sectionPadding} rounded-full cursor-pointer transition flex-shrink-0
            ${active === "who" ? 'bg-white shadow-lg' : 'hover:bg-black/5'}
          `}
        >
          <div className={`${labelText} font-extrabold tracking-widest text-neutral-800 uppercase mb-0.5 pointer-events-none`}>Huéspedes</div>
          <div className={`${valueText} text-emerald-950 font-bold truncate mt-0.5 pointer-events-none`}>
            {formatGuests()}
          </div>
          {active === "who" && <GuestsPopover variant={size} hasCalendarExpanded={hasHeroCalendarOpened} adults={adults} setAdults={setAdults} children={children} setChildren={setChildren} pets={pets} setPets={setPets} />}
        </div>

        <div className="flex-shrink-0 pr-4 md:pr-5 flex items-center z-10">
          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleSearchTrigger();
            }}
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
            <span className="md:block mr-1">Buscar</span>
          </button>
        </div>

        {active === "where" && <DestinationPopover variant={size} hasCalendarExpanded={hasHeroCalendarOpened} onSelect={(v) => { setDestination(v); setActive("checkIn"); }} currentSelection={destination} />}

        {(active === "checkIn" || active === "checkOut") && !isHero && (
          <CalendarPopover activeMode={active} checkIn={checkIn} checkOut={checkOut} invalidState={invalidState} onPickDate={handlePickDate} />
        )}

      </div>
    </div>
  );
}
