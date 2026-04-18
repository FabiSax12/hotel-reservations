"use client";

import { useState } from "react";
import { REGIONS_CONFIG } from "../constants/regionsConfig";
import { SEARCH_BAR_UI_CONSTANTS } from "../constants/ui";

const C = SEARCH_BAR_UI_CONSTANTS.DESTINATION;

interface DestinationPopoverProps {
  onSelect: (v: string) => void;
  currentSelection: string;
  variant?: "compact" | "hero";
  hasCalendarExpanded?: boolean;
}

export function DestinationPopover({ onSelect, currentSelection, variant, hasCalendarExpanded }: DestinationPopoverProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [hoverTimer, setHoverTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  const isHero = variant === "hero";
  const positionClasses = (isHero && hasCalendarExpanded) ? "top-[100%] mt-6" : "top-[100%] mt-4";
  const animateClasses = "origin-top slide-in-from-top-4";

  const handleMouseEnter = (name: string) => {
    if (hoverTimer) clearTimeout(hoverTimer);
    const timer = setTimeout(() => setHoveredRegion(name), 400);
    setHoverTimer(timer);
  };

  const handleMouseLeave = () => {
    if (hoverTimer) clearTimeout(hoverTimer);
    const timer = setTimeout(() => setHoveredRegion(null), 200);
    setHoverTimer(timer);
  };

  const hoveredData = REGIONS_CONFIG.find(r => r.name === hoveredRegion);

  return (
    <>
      <div
        className={`absolute left-0 w-[400px] bg-white rounded-3xl shadow-[0_24px_60px_rgba(0,0,0,0.15)] border border-neutral-200 p-6 z-50 animate-in fade-in duration-300 cursor-default text-left ${positionClasses} ${animateClasses}`}
        onMouseLeave={handleMouseLeave}
        onClick={e => e.stopPropagation()}
      >
        <h3 className="text-sm font-bold text-neutral-800 mb-4 uppercase tracking-wider">{C.POPOVER_TITLE}</h3>
        <div className="flex flex-col gap-2">
          {REGIONS_CONFIG.map((region) => (
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
          onMouseEnter={() => { if (hoverTimer) clearTimeout(hoverTimer); }}
          onMouseLeave={handleMouseLeave}
          style={{ height: '260px' }}
        >
          <div className="w-[45%] relative shrink-0 bg-neutral-100 flex flex-col">
             <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${hoveredData.image}')` }} />
             <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-emerald-900/20 to-transparent" />
             <div className="absolute bottom-5 left-5 right-5 text-white z-10">
                <div className="text-[10px] font-black uppercase tracking-widest mb-0.5 text-emerald-300">{C.FROM}</div>
                <div className="text-2xl font-black">${hoveredData.priceFrom} <span className="text-xs font-medium opacity-80">{C.USD_NIGHT}</span></div>
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
