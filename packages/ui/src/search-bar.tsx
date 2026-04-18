"use client";

import React, { useState, useEffect } from "react";

// --- Subcomponents for Popovers ---

function DestinationPopover({ onSelect, currentSelection, variant }: { onSelect: (v: string) => void, currentSelection: string, variant?: 'compact'|'hero' }) {
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
  const posClasses = isHero ? "bottom-[100%] mb-8 origin-bottom slide-in-from-bottom-4" : "top-[100%] mt-4 origin-top slide-in-from-top-4";

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
        className={`absolute left-0 w-[400px] bg-white rounded-3xl shadow-[0_24px_60px_rgba(0,0,0,0.15)] border border-neutral-200 p-6 z-50 animate-in fade-in duration-300 cursor-default ${posClasses}`}
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
          className={`absolute left-[416px] right-auto w-[400px] bg-white rounded-3xl shadow-[0_24px_60px_rgba(0,0,0,0.15)] border border-neutral-200 overflow-hidden z-50 animate-in fade-in slide-in-from-left-4 duration-300 flex flex-col ${posClasses}`}
          onMouseEnter={() => {
            if (hoverTimer) clearTimeout(hoverTimer);
          }}
          onMouseLeave={handleMouseLeave}
          style={{ minHeight: '380px' }}
        >
          <div className="w-full h-[200px] relative shrink-0">
             <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${hoveredData.image}')` }} />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
             <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-xs font-black uppercase tracking-wider mb-1 opacity-90 text-emerald-300">Desde</div>
                <div className="text-2xl font-black">${hoveredData.priceFrom} <span className="text-sm font-medium opacity-80">USD/noche</span></div>
             </div>
          </div>
          <div className="w-full p-6 flex flex-col justify-center flex-1">
            <h4 className="text-2xl font-black text-emerald-950 mb-4 tracking-tight">{hoveredData.name}</h4>
            <ul className="flex flex-col gap-3">
              {hoveredData.highlights.map((h, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-bold text-neutral-600">
                  <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  </div>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

function GuestsPopover({ adults, setAdults, children, setChildren, pets, setPets, variant }: any) {
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
  const posClasses = isHero ? "bottom-[100%] mb-8 origin-bottom slide-in-from-bottom-4" : "top-[100%] mt-4 origin-top slide-in-from-top-4";

  return (
    <div 
      className={`absolute left-1/2 -translate-x-1/2 w-[450px] bg-white rounded-3xl shadow-[0_24px_60px_rgba(0,0,0,0.15)] border border-neutral-200 p-8 z-50 animate-in fade-in duration-300 cursor-default ${posClasses}`}
      onClick={e => e.stopPropagation()}
    >
      <Stepper title="Adultos" subtitle="Edad 13 o superior" value={adults} setter={setAdults} min={1} />
      <Stepper title="Niños" subtitle="Edades 2-12" value={children} setter={setChildren} />
      <Stepper title="Mascotas" subtitle="¿Viajas con peludos?" value={pets} setter={setPets} />
    </div>
  );
}

const parseDateHelper = (dStr: string) => {
  if (!dStr) return 0;
  const [d, m] = dStr.split(" ");
  const monthVal = m === "Oct" ? 10 : 11;
  return parseInt(d) + (monthVal * 100);
};

const getAbsoluteDays = (dStr: string) => {
  if (!dStr) return 0;
  const [d, m] = dStr.split(" ");
  const day = parseInt(d);
  return m === "Oct" ? day : 31 + day;
};

function CalendarPopover({ activeMode, checkIn, checkOut, invalidState, onPickDate, variant }: any) {
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);
  const days = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);
  const offset = 3; 

  const parseDate = parseDateHelper;

  const inVal = parseDate(checkIn);
  const outVal = parseDate(checkOut);
  
  const isHero = variant === "hero";
  const cWidth = isHero ? "w-full max-w-[1150px] bg-white/40 backdrop-blur-3xl rounded-[3rem] border border-white/60 shadow-[0_32px_80px_rgba(4,120,87,0.1)] relative z-10" : "w-[650px] absolute top-[100%] mt-4 left-1/2 -translate-x-1/2 bg-white rounded-3xl shadow-[0_24px_60px_rgba(0,0,0,0.15)] border border-neutral-200 z-50 animate-in fade-in slide-in-from-top-4 duration-300";
  const cPad = isHero ? "p-8 gap-10" : "p-8 gap-8";

  return (
    <div className={`flex ${cPad} ${cWidth}`}>
      {[0, 1].map((monthIndex) => (
        <div key={monthIndex} className="flex-1">
          <div className={`flex items-center justify-between ${isHero ? "mb-6" : "mb-6"}`}>
            <h3 className={`${isHero ? "text-2xl" : "text-lg"} font-bold text-neutral-900`}>{monthIndex === 0 ? "Octubre" : "Noviembre"}</h3>
          </div>
          <div className={`grid grid-cols-7 text-center font-bold ${isHero ? "gap-y-4 gap-x-2 mb-4 text-sm uppercase tracking-widest text-neutral-500" : "gap-y-4 gap-x-1 mb-2 text-xs text-neutral-400"}`}>
            {days.map(d => <div key={d}>{d}</div>)}
          </div>
          <div className={`grid grid-cols-7 text-center ${isHero ? "gap-y-2 gap-x-2" : "gap-y-1 gap-x-1"}`}>
            {Array.from({ length: monthIndex === 0 ? offset : 1 }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {dates.map((d) => {
              const monthStr = monthIndex === 0 ? "Oct" : "Nov";
              const dayStr = `${d} ${monthStr}`;
              const currVal = parseDate(dayStr);
              
              const isStart = currVal === inVal;
              const isEnd = currVal === outVal;
              
              const isSelected = isStart || isEnd || (inVal > 0 && outVal > 0 && currVal > inVal && currVal < outVal);
              const isToday = monthIndex === 0 && d === 9;
              
              const isInvalid = invalidState?.dayStr === dayStr;
              const isFading = isInvalid && invalidState?.isFading;
              
              return (
                <button 
                  key={d} 
                  onClick={() => onPickDate(dayStr)}
                  onMouseEnter={() => setHoveredDay(dayStr)}
                  onMouseLeave={() => setHoveredDay(null)}
                  className={`group relative flex items-center justify-center w-full ${isHero ? "h-14 text-xl" : "aspect-square text-base"} font-bold transition-colors outline-none focus:outline-none [-webkit-tap-highlight-color:transparent]
                    ${isSelected && !isStart && !isEnd ? "bg-emerald-50 text-emerald-900" : "text-neutral-800"}
                    ${isStart || isEnd ? "text-white z-10" : ""}
                    ${isToday && !isSelected ? "underline decoration-emerald-500 decoration-4 underline-offset-4" : ""}
                    ${hoveredDay === dayStr ? "!z-50" : ""}
                  `}
                >
                  {isStart && outVal > 0 && outVal !== inVal && <div className="absolute inset-y-0 right-0 w-1/2 bg-emerald-50 z-0"></div>}
                  {isEnd && inVal > 0 && outVal !== inVal && <div className="absolute inset-y-0 left-0 w-1/2 bg-emerald-50 z-0"></div>}
                  
                  {!isSelected && !isStart && !isEnd && (
                     <div className="absolute h-[85%] aspect-square rounded-full border-2 border-transparent group-hover:border-neutral-900 transition-colors pointer-events-none"></div>
                  )}

                  {isStart && <div className="absolute h-[85%] aspect-square bg-emerald-700 rounded-full z-10 shadow-md transition-transform active:scale-95 group-hover:scale-105"></div>}
                  {isEnd && !isStart && <div className="absolute h-[75%] aspect-square bg-emerald-700 rounded-full z-10 shadow-md transition-transform active:scale-95 ring-2 ring-emerald-700 ring-offset-2 group-hover:scale-105"></div>}
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
      ))}
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

export function ModernSearchBar({ onSearch, className = "", size = 'compact', initialState, onHeroCalendarOpen, onActiveChange }: SearchBarProps) {
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
    if (onActiveChange) {
      onActiveChange(active);
    }
  }, [active, size, hasHeroCalendarOpened, hasHeroTitleDismissed, onHeroCalendarOpen, onActiveChange]);

  const [destination, setDestination] = useState(initialState?.destination && initialState?.destination !== 'Todos' ? initialState.destination : "");
  const [checkIn, setCheckIn] = useState(initialState?.checkIn || "15 Oct");
  const [checkOut, setCheckOut] = useState(initialState?.checkOut || "21 Oct");
  
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
      const clickedAbs = getAbsoluteDays(dayStr);
      const inAbs = getAbsoluteDays(checkIn);
      const outAbs = getAbsoluteDays(checkOut);

      if (clickedAbs < inAbs) {
        setCheckIn(dayStr);
      } else if (clickedAbs > outAbs) {
        setCheckOut(dayStr);
      } else if (clickedAbs > inAbs && clickedAbs < outAbs) {
        const distToIn = clickedAbs - inAbs;
        const distToOut = outAbs - clickedAbs;
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

  return (
    <div className={`relative z-50 w-full flex flex-col items-center ${className}`}>
      {size === 'hero' && (
        <div 
          className="grid w-full z-10"
          style={{
            transition: "grid-template-rows 800ms cubic-bezier(0.22, 1, 0.36, 1) 300ms",
            gridTemplateRows: hasHeroCalendarOpened ? '1fr' : '0fr'
          }}
        >
          <div 
            className="w-full flex justify-center min-h-0"
            style={{ clipPath: "inset(-200px -200px 0px -200px)" }}
          >
            <div 
              className="w-full flex flex-col items-center pb-6"
              style={{
                transition: "transform 800ms cubic-bezier(0.22, 1, 0.36, 1) 300ms, opacity 800ms ease 300ms",
                transform: hasHeroCalendarOpened ? 'translateY(0)' : 'translateY(100%)',
                opacity: hasHeroCalendarOpened ? ((active === "where" || active === "who") ? 0.15 : 1) : 0
              }}
            >
               <h2 
                 className="text-xl font-serif font-medium text-emerald-950 mb-4 tracking-tight pointer-events-none"
                 style={{ 
                   transition: "opacity 800ms ease 1000ms", 
                   opacity: hasHeroCalendarOpened ? ((active === "where" || active === "who") ? 0.15 : 1) : 0 
                 }}
               >
                 Por favor, seleccione sus fechas de llegada y salida
               </h2>
               <CalendarPopover variant="hero" activeMode={active} checkIn={checkIn} checkOut={checkOut} invalidState={invalidState} onPickDate={handlePickDate} />
            </div>
          </div>
        </div>
      )}
      
      {active && (
        <div 
          className="fixed inset-0 -z-10 bg-transparent"
          onClick={() => setActive(null)}
        />
      )}

      <div className={`relative flex items-stretch rounded-full border border-neutral-200 shadow-[0_12px_40px_rgba(0,0,0,0.08)] overflow-visible transition-colors z-50 w-full bg-white ${isHero ? "shadow-2xl" : ""}`}>
        
        {size === 'hero' && (
          <button 
            type="button"
            style={{
              transition: "opacity 300ms ease, transform 300ms ease",
              opacity: hasHeroCalendarOpened ? 0 : 1,
              transform: hasHeroCalendarOpened ? 'translate(-50%, 10px)' : 'translate(-50%, 0)',
              pointerEvents: hasHeroCalendarOpened ? 'none' : 'auto'
            }}
            onClick={() => {
              setHasHeroCalendarOpened(true);
              if (onHeroCalendarOpen) onHeroCalendarOpen();
              if (active !== "checkIn" && active !== "checkOut") setActive("checkIn");
            }}
            className="absolute -top-[26px] left-1/2 bg-white/90 backdrop-blur-md px-6 py-1.5 rounded-t-xl border-t border-l border-r border-neutral-200/50 shadow-[0_-6px_16px_rgba(0,0,0,0.03)] flex items-center justify-center hover:bg-neutral-50 transition-colors z-20"
          >
            <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
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
             <input 
               type="text" 
               readOnly
               className={`w-full bg-transparent border-none outline-none focus:outline-none ${valueText} text-emerald-950 font-bold placeholder-neutral-400 mt-0.5 truncate cursor-pointer`}
               placeholder="¿A cuál vas?"
               value={destination}
               onChange={(e) => setDestination(e.target.value)}
             />
          </div>
          {active === "where" && <DestinationPopover variant={size} onSelect={(v) => { setDestination(v); setActive("checkIn"); }} currentSelection={destination} />}
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
          <div className={`${valueText} text-emerald-950 font-bold truncate mt-0.5 pointer-events-none`}>{checkIn || "Fechas"}</div>
        </div>

        <div className="self-center w-[1px] h-10 bg-neutral-300/80" />

        <div 
          onClick={() => setActive("checkOut")}
          className={`flex-1 relative flex flex-col justify-center ${sectionPadding} rounded-full cursor-pointer transition
            ${active === "checkOut" ? 'bg-white shadow-lg' : 'hover:bg-black/5'}
            ${(active === "where" || active === "who") && hasHeroCalendarOpened ? 'opacity-30' : ''}
          `}
        >
          <div className={`${labelText} font-extrabold tracking-widest text-neutral-800 uppercase mb-0.5 pointer-events-none`}>Salida</div>
          <div className={`${valueText} text-emerald-950 font-bold truncate mt-0.5 pointer-events-none`}>{checkOut || "Fechas"}</div>
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
          {active === "who" && <GuestsPopover variant={size} adults={adults} setAdults={setAdults} children={children} setChildren={setChildren} pets={pets} setPets={setPets} />}
        </div>

        <div className="flex-shrink-0 pr-2.5 flex items-center z-10">
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

        {(active === "checkIn" || active === "checkOut") && !hasHeroCalendarOpened && (
          <CalendarPopover activeMode={active} checkIn={checkIn} checkOut={checkOut} invalidState={invalidState} onPickDate={handlePickDate} />
        )}

      </div>
    </div>
  );
}
