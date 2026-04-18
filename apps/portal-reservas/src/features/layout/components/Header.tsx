import { ModernSearchBar } from "@hotel/ui";
import type { SearchParams } from "../../search/domain/types";
import { UI_CONSTANTS } from "../../../shared/constants/ui";

interface HeaderProps {
  hasSearched: boolean;
  searchParams: SearchParams;
  onReset: () => void;
  onSearch: (params: any) => void;
}

export function Header({ hasSearched, searchParams, onReset, onSearch }: HeaderProps) {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-xl border-b border-neutral-200/40">
      <div className="w-full max-w-[1500px] mx-auto px-6 h-24 flex items-center justify-between">
        <div 
          className="text-emerald-950 text-2xl font-serif font-black tracking-tighter cursor-pointer hover:opacity-80 transition" 
          onClick={onReset}
        >
          {UI_CONSTANTS.HEADER.BRAND}<span className="text-emerald-600">{UI_CONSTANTS.HEADER.BRAND_HIGHLIGHT}</span>
        </div>
        
        <div className="flex items-center gap-6 text-sm font-bold text-neutral-600">
          <button className="hover:text-emerald-900 transition-colors">{UI_CONSTANTS.HEADER.HELP}</button>
          <button className="flex items-center gap-3 pl-6 border-l-2 border-neutral-200">
            <div className="text-right hidden md:block">
              <div className="text-neutral-900 leading-none mb-0.5">{UI_CONSTANTS.HEADER.MY_RESERVATIONS}</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100">
              <svg className="w-5 h-5 text-emerald-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </button>
        </div>
      </div>
      
      {/* Pinned Search Bar for State B */}
      {hasSearched && (
        <div className="w-full bg-white pb-6 pt-2 shadow-[0_12px_40px_rgba(0,0,0,0.06)] border-t border-neutral-100 animate-in fade-in slide-in-from-top-4 duration-500 flex justify-center px-6">
          <ModernSearchBar 
            size="compact"
            className="w-full max-w-5xl" 
            onSearch={onSearch} 
            initialState={searchParams}
          />
        </div>
      )}
    </header>
  );
}
