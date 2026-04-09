"use client";

import React, { useState, useEffect } from "react";

// --- Subcomponents for Popovers ---

function DestinationPopover({ onSelect }: { onSelect: (name: string) => void }) {
  const regions = [
    { name: "Arenal & La Fortuna", desc: "Volcanoes, hot springs, rainforests", icon: "🌋" },
    { name: "Monteverde", desc: "Cloud forests, canopy tours, wildlife", icon: "☁️" },
    { name: "Guanacaste Coast", desc: "Sunny beaches, luxury resorts", icon: "🏖️" },
    { name: "Manuel Antonio", desc: "National park, wildlife, pristine beaches", icon: "🦥" },
  ];

  return (
    <div className="absolute top-[80px] left-0 w-[400px] bg-white rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-neutral-200 p-6 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
      <h3 className="text-sm font-bold text-neutral-800 mb-4 uppercase tracking-wider">Búsquedas populares</h3>
      <div className="flex flex-col gap-2">
        {regions.map((region) => (
          <button 
            key={region.name} 
            onClick={() => onSelect(region.name)}
            className="flex items-center gap-4 p-3 rounded-2xl hover:bg-neutral-100 transition text-left group"
          >
            <div className="w-12 h-12 bg-neutral-100 group-hover:bg-white rounded-xl flex items-center justify-center text-xl transition-colors shadow-sm">
              {region.icon}
            </div>
            <div>
              <div className="font-bold text-neutral-900">{region.name}</div>
              <div className="text-xs text-neutral-500">{region.desc}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function CalendarPopover({ onSelectCheckIn, onSelectCheckOut, checkIn, checkOut }: any) {
  const days = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);
  const offset = 3; 
  
  // A minimal state for the mock calendar to feel real when picking bounds
  const [activeSelect, setActiveSelect] = useState<'in' | 'out'>('in');

  const handleDateClick = (dayStr: string) => {
    if (activeSelect === 'in') {
      onSelectCheckIn(dayStr);
      setActiveSelect('out');
    } else {
      onSelectCheckOut(dayStr);
    }
  };

  return (
    <div className="absolute top-[80px] left-1/2 -translate-x-1/2 w-[600px] bg-white rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-neutral-200 p-8 z-50 flex gap-8 animate-in fade-in slide-in-from-top-4 duration-300">
      {[0, 1].map((monthIndex) => (
        <div key={monthIndex} className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-neutral-900">{monthIndex === 0 ? "Octubre" : "Noviembre"}</h3>
          </div>
          <div className="grid grid-cols-7 gap-y-4 gap-x-1 mb-2 text-center text-xs font-semibold text-neutral-400">
            {days.map(d => <div key={d}>{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-y-1 gap-x-1 text-center">
            {Array.from({ length: monthIndex === 0 ? offset : 1 }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {dates.map((d) => {
              const monthStr = monthIndex === 0 ? "Oct" : "Nov";
              const dayStr = `${d} ${monthStr}`;
              
              const isStart = checkIn === dayStr;
              const isEnd = checkOut === dayStr;
              const isSelected = isStart || isEnd || (checkIn && checkOut && monthIndex === 0 && d > parseInt(checkIn) && d < parseInt(checkOut));
              const isToday = monthIndex === 0 && d === 9;
              
              return (
                <button 
                  key={d} 
                  onClick={() => handleDateClick(dayStr)}
                  className={`relative flex items-center justify-center w-full aspect-square text-sm font-medium transition-colors
                    ${isSelected && !isStart && !isEnd ? "bg-emerald-50 text-emerald-900" : "hover:border hover:border-neutral-900 rounded-full text-neutral-800"}
                    ${isStart ? "rounded-l-full bg-emerald-600 text-white hover:bg-emerald-700 hover:border-transparent" : ""}
                    ${isEnd ? "rounded-r-full bg-emerald-600 text-white hover:bg-emerald-700 hover:border-transparent" : ""}
                    ${isToday && !isSelected ? "underline decoration-emerald-500 decoration-2 underline-offset-4" : ""}
                  `}
                >
                  {d}
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
    <div className="flex items-center justify-between py-4 border-b border-neutral-100 last:border-0">
      <div>
        <div className="font-bold text-neutral-900">{title}</div>
        <div className="text-sm text-neutral-500">{subtitle}</div>
      </div>
      <div className="flex items-center gap-3">
        <button 
          onClick={() => setter(Math.max(min, value - 1))}
          className={`w-9 h-9 rounded-full flex items-center justify-center border transition-colors ${value <= min ? 'border-neutral-200 text-neutral-300 cursor-not-allowed' : 'border-neutral-400 text-neutral-600 hover:border-neutral-900 hover:text-neutral-900'}`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
        </button>
        <span className="w-4 text-center font-medium text-neutral-800">{value}</span>
        <button 
          onClick={() => setter(value + 1)}
          className="w-9 h-9 rounded-full flex items-center justify-center border border-neutral-400 text-neutral-600 hover:border-neutral-900 hover:text-neutral-900 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
        </button>
      </div>
    </div>
  );

  return (
    <div className="absolute top-[80px] right-0 w-[400px] bg-white rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-neutral-200 p-6 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
      <Stepper title="Adultos" subtitle="Edad 13 o superior" value={adults} setter={setAdults} min={1} />
      <Stepper title="Niños" subtitle="Edades 2-12" value={children} setter={setChildren} />
      <Stepper title="Mascotas" subtitle="¿Viajas con peludos?" value={pets} setter={setPets} />
    </div>
  );
}

type ActiveSection = "where" | "when" | "who" | null;

interface SearchBarProps {
  onSearch?: () => void;
  className?: string; // allow wrapper classes
}

export function ModernSearchBar({ onSearch, className = "" }: SearchBarProps) {
  const [active, setActive] = useState<ActiveSection>(null);

  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("15 Oct");
  const [checkOut, setCheckOut] = useState("21 Oct");
  
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [pets, setPets] = useState(0);

  const totalGuests = adults + children;

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setActive(null); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className={`relative z-50 w-full transition-all duration-300 ${className}`}>
      {active && (
        <div 
          className="fixed inset-0 z-40 bg-black/5 backdrop-blur-[1px] animate-in fade-in duration-300"
          onClick={() => setActive(null)}
        />
      )}

      <div className={`relative bg-white flex items-stretch rounded-full border border-neutral-200 shadow-[0_12px_40px_rgba(0,0,0,0.06)] overflow-visible transition-colors z-50 ${active ? 'bg-neutral-100' : 'hover:bg-neutral-50'}`}>
        
        <div 
          onClick={() => setActive("where")}
          className={`flex-1 relative flex flex-col justify-center px-8 py-4 rounded-full cursor-pointer transition flex-shrink-0
            ${active === "where" ? "bg-white shadow-[0_8px_24px_rgba(0,0,0,0.1)] z-10 box-border border border-neutral-200/50" : "hover:bg-neutral-200/50"}
          `}
        >
          <label className="text-xs font-extrabold text-neutral-800 uppercase tracking-widest pointer-events-none mb-1">Destino</label>
          <input 
            type="text" 
            placeholder="¿A dónde vas?"
            className="bg-transparent border-none outline-none text-[16px] font-medium text-neutral-900 placeholder:text-neutral-500 w-full truncate cursor-pointer"
            readOnly
            value={destination}
          />
        </div>

        <div className="self-center w-[1px] h-10 bg-neutral-300/80" />

        <div 
          onClick={() => setActive("when")}
          className={`flex-[1.5] relative flex justify-between items-center px-8 py-4 rounded-full cursor-pointer transition
            ${active === "when" ? "bg-white shadow-[0_8px_24px_rgba(0,0,0,0.1)] z-10 box-border border border-neutral-200/50" : "hover:bg-neutral-200/50"}
          `}
        >
          <div className="flex flex-col flex-1 pointer-events-none">
             <label className="text-xs font-extrabold text-neutral-800 uppercase tracking-widest mb-1">Llegada</label>
             <span className="text-[16px] font-medium text-neutral-900">{checkIn}</span>
          </div>
          <div className="flex flex-col flex-1 pointer-events-none pl-4 border-l border-neutral-200/50">
             <label className="text-xs font-extrabold text-neutral-800 uppercase tracking-widest mb-1">Salida</label>
             <span className="text-[16px] font-medium text-neutral-900">{checkOut}</span>
          </div>
        </div>

        <div className="self-center w-[1px] h-10 bg-neutral-300/80" />

        <div 
          onClick={() => setActive("who")}
          className={`flex-1 relative flex items-center justify-between pl-8 pr-2 py-2 rounded-full cursor-pointer transition
            ${active === "who" ? "bg-white shadow-[0_8px_24px_rgba(0,0,0,0.1)] z-10 box-border border border-neutral-200/50" : "hover:bg-neutral-200/50"}
          `}
        >
          <div className="flex flex-col pointer-events-none mr-6">
            <label className="text-xs font-extrabold text-neutral-800 uppercase tracking-widest mb-1">Huéspedes</label>
            <span className="text-[16px] font-medium text-neutral-900 whitespace-nowrap">
              {totalGuests} {totalGuests === 1 ? 'huésped' : 'huéspedes'}
              {pets > 0 ? `, ${pets} ${pets === 1 ? 'mascota' : 'mascotas'}` : ''}
            </span>
          </div>
          
          <button 
            className={`h-14 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300
              ${active === "who" ? 'bg-emerald-600 w-auto px-8 gap-2 text-white shadow-lg shadow-emerald-600/30' : 'bg-emerald-600 w-14 text-white hover:bg-emerald-700'}
            `}
            onClick={(e) => {
              e.stopPropagation();
              setActive(null);
              if (onSearch) onSearch();
            }}
          >
            <svg className="w-6 h-6 font-bold" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            {active === "who" && <span className="font-bold text-[16px]">Buscar</span>}
          </button>
        </div>

        {active === "where" && <DestinationPopover onSelect={(v) => { setDestination(v); setActive("when"); }} />}
        {active === "when" && <CalendarPopover checkIn={checkIn} checkOut={checkOut} onSelectCheckIn={setCheckIn} onSelectCheckOut={setCheckOut} />}
        {active === "who" && <GuestsPopover adults={adults} setAdults={setAdults} children={children} setChildren={setChildren} pets={pets} setPets={setPets} />}

      </div>
    </div>
  );
}
