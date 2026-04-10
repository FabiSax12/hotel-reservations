"use client";

import React, { useState, useEffect } from "react";

// --- Subcomponents for Popovers ---

function DestinationPopover({ onSelect }: { onSelect: (name: string) => void }) {
  const regions = [
    { name: "Arenal & La Fortuna", desc: "Volcanes, aguas termales, selvas tropicales", icon: "🌋" },
    { name: "Monteverde", desc: "Bosques nubosos, tirolesas, vida silvestre", icon: "☁️" },
  ];

  const [clickedRegion, setClickedRegion] = useState<string | null>(null);

  const handleClick = (name: string) => {
    setClickedRegion(name);
    setTimeout(() => {
      onSelect(name);
    }, 200);
  };

  return (
    <div className="absolute top-[100%] mt-4 left-0 w-[400px] bg-white rounded-3xl shadow-[0_24px_60px_rgba(0,0,0,0.15)] border border-neutral-200 p-6 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
      <h3 className="text-sm font-bold text-neutral-800 mb-4 uppercase tracking-wider">Nuestras Sedes</h3>
      <div className="flex flex-col gap-2">
        {regions.map((region) => (
          <button 
            key={region.name} 
            onClick={() => handleClick(region.name)}
            className={`flex items-center gap-4 p-3 rounded-2xl transition text-left group
              ${clickedRegion === region.name ? "bg-emerald-50 scale-[0.98]" : "hover:bg-neutral-100"}
            `}
          >
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl transition-colors shadow-sm
              ${clickedRegion === region.name ? "bg-emerald-200" : "bg-neutral-100 group-hover:bg-white"}
            `}>
              {region.icon}
            </div>
            <div>
              <div className={`text-lg font-bold transition-colors ${clickedRegion === region.name ? "text-emerald-900" : "text-neutral-900"}`}>{region.name}</div>
              <div className="text-sm text-neutral-500">{region.desc}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function CalendarPopover({ activeMode, checkIn, checkOut, onPickDate }: any) {
  const days = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);
  const offset = 3; 

  const parseDate = (dStr: string) => {
    if (!dStr) return 0;
    const [d, m] = dStr.split(" ");
    const monthVal = m === "Oct" ? 10 : 11;
    return parseInt(d) + (monthVal * 100);
  };

  const inVal = parseDate(checkIn);
  const outVal = parseDate(checkOut);

  return (
    <div className="absolute top-[100%] mt-4 left-1/2 -translate-x-1/2 w-[650px] bg-white rounded-3xl shadow-[0_24px_60px_rgba(0,0,0,0.15)] border border-neutral-200 p-8 z-50 flex gap-8 animate-in fade-in slide-in-from-top-4 duration-300">
      {[0, 1].map((monthIndex) => (
        <div key={monthIndex} className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-neutral-900">{monthIndex === 0 ? "Octubre" : "Noviembre"}</h3>
          </div>
          <div className="grid grid-cols-7 gap-y-4 gap-x-1 mb-2 text-center text-xs font-bold text-neutral-400">
            {days.map(d => <div key={d}>{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-y-1 gap-x-1 text-center">
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
              
              return (
                <button 
                  key={d} 
                  onClick={() => onPickDate(dayStr)}
                  className={`group relative flex items-center justify-center w-full aspect-square text-base font-bold transition-colors outline-none focus:outline-none [-webkit-tap-highlight-color:transparent]
                    ${isSelected && !isStart && !isEnd ? "bg-emerald-50 text-emerald-900" : "text-neutral-800"}
                    ${!isSelected && !isStart && !isEnd ? "hover:border-2 hover:border-neutral-900 rounded-full" : ""}
                    ${isStart || isEnd ? "text-white z-10" : ""}
                    ${isToday && !isSelected ? "underline decoration-emerald-500 decoration-4 underline-offset-4" : ""}
                  `}
                >
                  {/* Backdrop connector */}
                  {isStart && outVal > 0 && outVal !== inVal && <div className="absolute inset-y-0 right-0 w-1/2 bg-emerald-50 z-0"></div>}
                  {isEnd && inVal > 0 && outVal !== inVal && <div className="absolute inset-y-0 left-0 w-1/2 bg-emerald-50 z-0"></div>}
                  
                  {/* Colored circle */}
                  {isStart && <div className="absolute w-[85%] h-[85%] bg-emerald-700 rounded-full z-10 shadow-md transition-transform active:scale-95 group-hover:scale-105"></div>}
                  {isEnd && !isStart && <div className="absolute w-[75%] h-[75%] bg-emerald-700 rounded-full z-10 shadow-md transition-transform active:scale-95 ring-2 ring-emerald-700 ring-offset-2 group-hover:scale-105"></div>}
                  {isStart && isEnd && <div className="absolute w-[85%] h-[85%] bg-emerald-700 rounded-full z-10 shadow-md transition-transform active:scale-95 group-hover:scale-105"></div>}
                  
                  <span className="relative z-20">{d}</span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function GuestsPopover({ adults, setAdults, children, setChildren, pets, setPets }: any) {
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

  return (
    <div className="absolute top-[100%] mt-4 right-0 w-[450px] bg-white rounded-3xl shadow-[0_24px_60px_rgba(0,0,0,0.15)] border border-neutral-200 p-8 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
      <Stepper title="Adultos" subtitle="Edad 13 o superior" value={adults} setter={setAdults} min={1} />
      <Stepper title="Niños" subtitle="Edades 2-12" value={children} setter={setChildren} />
      <Stepper title="Mascotas" subtitle="¿Viajas con peludos?" value={pets} setter={setPets} />
    </div>
  );
}

type ActiveSection = "where" | "checkIn" | "checkOut" | "who" | null;

interface SearchBarProps {
  onSearch?: (destination: string) => void;
  className?: string; 
  size?: 'compact' | 'hero';
}

export function ModernSearchBar({ onSearch, className = "", size = 'compact' }: SearchBarProps) {
  const [active, setActive] = useState<ActiveSection>(null);

  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("15 Oct");
  const [checkOut, setCheckOut] = useState("21 Oct");
  
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [pets, setPets] = useState(0);

  const totalGuests = adults + children;

  const isHero = size === 'hero';

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setActive(null); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handlePickDate = (dayStr: string) => {
    // 1. Explicit toggling off to prevent same-date selection and support direct removal
    if (dayStr === checkIn) {
      setCheckIn("");
      setActive("checkIn");
      return;
    }
    if (dayStr === checkOut) {
      setCheckOut("");
      setActive("checkOut");
      return;
    }

    // 2. Linear assignment
    if (active === "checkIn") {
      setCheckIn(dayStr);
      setActive("checkOut");
    } else if (active === "checkOut") {
      setCheckOut(dayStr);
      if (!checkIn) {
        setActive("checkIn");
      }
    }
  };

  // Adjustments based on scale
  const containerPadding = isHero ? "py-[2px]" : "py-0";
  const sectionPadding = isHero ? "px-10 py-6" : "px-6 py-3";
  const labelText = isHero ? "text-sm" : "text-[11px]";
  const valueText = isHero ? "text-xl" : "text-[15px]";
  const searchBtnSize = isHero ? "h-20" : "h-12";
  const searchBtnIconSize = isHero ? "w-8 h-8" : "w-5 h-5";

  return (
    <div className={`relative z-50 w-full transition-all duration-300 ${className}`}>
      {active && (
        <div 
          className="fixed inset-0 z-40 bg-transparent animate-in fade-in duration-500"
          onClick={() => setActive(null)}
        />
      )}

      <div className={`relative bg-white flex items-stretch rounded-full border border-neutral-200 shadow-[0_12px_40px_rgba(0,0,0,0.08)] overflow-visible transition-colors z-50 [-webkit-tap-highlight-color:transparent] ${containerPadding} ${active ? 'bg-neutral-100' : 'hover:bg-neutral-50'} ${isHero ? "shadow-2xl" : ""}`}>
        
        <div 
          onClick={() => setActive("where")}
          className={`flex-[1.2] relative flex flex-col justify-center ${sectionPadding} rounded-full cursor-pointer transition flex-shrink-0
            ${active === "where" ? "bg-white shadow-[0_12px_36px_rgba(0,0,0,0.15)] z-10 box-border border-2 border-emerald-900/10" : "hover:bg-neutral-200/50"}
          `}
        >
          <label className={`${labelText} font-extrabold text-neutral-800 uppercase tracking-widest pointer-events-none mb-1`}>Sede</label>
          <input 
            type="text" 
            placeholder="¿A cuál vas?"
            className={`bg-transparent border-none outline-none focus:outline-none ${valueText} font-bold text-neutral-900 placeholder:text-neutral-400 w-full truncate cursor-pointer`}
            readOnly
            value={destination}
          />
        </div>

        <div className="self-center w-[1px] h-12 bg-neutral-300/80 mx-2" />

        <div className="flex-[1.5] flex items-stretch">
          <div 
            onClick={() => setActive("checkIn")}
            className={`flex-1 relative flex flex-col justify-center ${sectionPadding} rounded-full cursor-pointer transition
              ${active === "checkIn" ? "bg-white shadow-[0_12px_36px_rgba(0,0,0,0.15)] z-10 box-border border-2 border-emerald-900/10" : "hover:bg-neutral-200/50"}
            `}
          >
            <label className={`${labelText} font-extrabold text-neutral-800 uppercase tracking-widest pointer-events-none mb-1`}>Llegada</label>
            <span className={`${valueText} font-bold ${checkIn ? 'text-neutral-900' : 'text-neutral-400'}`}>{checkIn || "Fechas"}</span>
          </div>

          <div className="self-center w-[1px] h-12 bg-neutral-300/80 mx-2" />

          <div 
            onClick={() => setActive("checkOut")}
            className={`flex-1 relative flex flex-col justify-center ${sectionPadding} rounded-full cursor-pointer transition
              ${active === "checkOut" ? "bg-white shadow-[0_12px_36px_rgba(0,0,0,0.15)] z-10 box-border border-2 border-emerald-900/10" : "hover:bg-neutral-200/50"}
            `}
          >
            <label className={`${labelText} font-extrabold text-neutral-800 uppercase tracking-widest pointer-events-none mb-1`}>Salida</label>
            <span className={`${valueText} font-bold ${checkOut ? 'text-neutral-900' : 'text-neutral-400'}`}>{checkOut || "Fechas"}</span>
          </div>
        </div>

        <div className="self-center w-[1px] h-12 bg-neutral-300/80 mx-2" />

        <div 
          onClick={() => setActive("who")}
          className={`flex-[1.4] relative flex items-center justify-between pl-8 pr-2 py-2 rounded-full cursor-pointer transition
            ${active === "who" ? "bg-white shadow-[0_12px_36px_rgba(0,0,0,0.15)] z-10 box-border border-2 border-emerald-900/10" : "hover:bg-neutral-200/50"}
          `}
        >
          <div className={`flex flex-col pointer-events-none mr-4 ${isHero ? 'pl-2' : ''}`}>
            <label className={`${labelText} font-extrabold text-neutral-800 uppercase tracking-widest mb-1`}>Huéspedes</label>
            <span className={`${valueText} font-bold text-neutral-900 whitespace-nowrap`}>
              {totalGuests} {totalGuests === 1 ? 'persona' : 'personas'}
              {pets > 0 ? `, ${pets} mast..` : ''}
            </span>
          </div>
          
          <button 
            className={`${searchBtnSize} rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 outline-none focus:outline-none [-webkit-tap-highlight-color:transparent]
              ${active === "who" || isHero ? 'bg-emerald-700 w-auto px-10 gap-3 text-white shadow-[0_8px_20px_rgba(4,120,87,0.4)] hover:bg-emerald-800' : 'bg-emerald-700 aspect-square text-white hover:bg-emerald-800'}
            `}
            onClick={(e) => {
              e.stopPropagation();
              setActive(null);
              if (onSearch) onSearch(destination || 'Todos');
            }}
          >
            <svg className={searchBtnIconSize} fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            {(active === "who" || isHero) && <span className={`${isHero ? 'text-xl' : 'text-[15px]'} font-extrabold`}>Buscar</span>}
          </button>
        </div>

        {active === "where" && <DestinationPopover onSelect={(v) => { setDestination(v); setActive("checkIn"); }} />}
        {(active === "checkIn" || active === "checkOut") && <CalendarPopover activeMode={active} checkIn={checkIn} checkOut={checkOut} onPickDate={handlePickDate} />}
        {active === "who" && <GuestsPopover adults={adults} setAdults={setAdults} children={children} setChildren={setChildren} pets={pets} setPets={setPets} />}

      </div>
    </div>
  );
}
