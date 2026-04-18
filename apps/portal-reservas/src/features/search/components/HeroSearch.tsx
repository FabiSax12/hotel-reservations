import { ModernSearchBar } from "@hotel/ui";
import { UI_CONSTANTS } from "../../../shared/constants/ui";

interface HeroSearchProps {
  onSearch: (params: any) => void;
  heroCalendarActive: boolean;
  setHeroCalendarActive: (active: boolean) => void;
}

export function HeroSearch({ onSearch, heroCalendarActive, setHeroCalendarActive }: HeroSearchProps) {
  return (
    <section className="relative w-full h-screen flex flex-col items-center px-6 pt-[24vh] pb-8 animate-in fade-in duration-500">
       <div className="w-full max-w-[1150px] mx-auto flex flex-col items-center text-center z-10">
        
        <div 
          className="w-full flex flex-col items-center min-h-0 pointer-events-none"
          style={{
            transition: "opacity 300ms ease, transform 400ms cubic-bezier(0.22, 1, 0.36, 1)",
            opacity: heroCalendarActive ? 0 : 1,
            transform: heroCalendarActive ? 'translateY(-20px)' : 'translateY(0)',
          }}
        >
            <h1 className="text-6xl md:text-8xl font-serif font-black text-emerald-950 tracking-tighter leading-[0.9] mb-6 pt-4 pointer-events-auto">
              {UI_CONSTANTS.HERO.TITLE}
            </h1>
            <p className="text-xl md:text-2xl text-neutral-600 font-medium max-w-3xl pointer-events-auto">
              {UI_CONSTANTS.HERO.SUBTITLE}
            </p>
        </div>
        
        <div 
          className="w-full flex justify-center relative z-20"
          style={{
            transition: "transform 800ms cubic-bezier(0.22, 1, 0.36, 1)",
            transform: heroCalendarActive ? 'translateY(-200px)' : 'translateY(48px)',
          }}
        >
          <ModernSearchBar 
            size="hero" 
            onSearch={onSearch} 
            className="w-full max-w-[1150px]"
            onHeroCalendarOpen={() => setHeroCalendarActive(true)}
          />
        </div>

      </div>
    </section>
  );
}
