import type { Room } from '../domain/types';
import { UI_CONSTANTS } from '../../../shared/constants/ui';

interface RoomCardProps {
  room: Room;
  index: number;
  selectedDest?: string | null;
}

export function RoomCard({ room, index, selectedDest }: RoomCardProps) {
  const isScarce = room.inventory <= 2;
  
  return (
    <div 
      className="group flex flex-col lg:flex-row bg-white rounded-[2rem] overflow-hidden border-2 border-neutral-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(4,120,87,0.12)] hover:border-emerald-200 transition-all duration-500 animate-in fade-in slide-in-from-bottom-8 fill-mode-both"
      style={{ animationDelay: `${index * 150}ms`, animationDuration: '600ms' }}
    >
      {/* Image Grid */}
      <div className="relative w-full lg:w-[400px] h-[300px] lg:h-auto overflow-hidden flex-shrink-0">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
          style={{ backgroundImage: `url('${room.image}')` }}
        />
        
        {/* Urgency Badge overlay */}
        {isScarce && (
          <div className="absolute top-4 left-4 bg-[#7a1313] text-white px-4 py-2 rounded-xl font-bold text-sm shadow-xl flex items-center gap-2 animate-in slide-in-from-top-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {room.inventory === 1 ? UI_CONSTANTS.ROOMS.LAST_ROOM : `${UI_CONSTANTS.ROOMS.ONLY_REMAINING} ${room.inventory} ${UI_CONSTANTS.ROOMS.ROOMS_PLURAL}`}
          </div>
        )}
      </div>

      {/* Room Data */}
      <div className="flex flex-col flex-1 p-8 lg:pr-10">
        
        <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
          <div>
            {/* Selected dest isn't always known if they select "Todos", so show location as context if they searched generally */}
            {(!selectedDest || selectedDest === 'Todos') && (
              <p className="text-emerald-700 font-extrabold uppercase tracking-widest text-xs mb-2">{room.location}</p>
            )}
            <h3 className="text-3xl font-black text-neutral-900 leading-none group-hover:text-emerald-800 transition-colors">{room.title}</h3>
          </div>
        </div>
        
        <div className="flex items-center gap-4 mb-6">
          <span className="px-3 py-1 bg-neutral-100 text-neutral-700 font-bold text-sm rounded-lg border border-neutral-200">
            {room.type} {UI_CONSTANTS.ROOMS.TYPE_LABEL}
          </span>
          <span className="text-neutral-500 font-medium flex items-center gap-1">
            <svg className="w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
            {room.sqft} {UI_CONSTANTS.ROOMS.SQFT_LABEL}
          </span>
        </div>

        <p className="text-lg text-neutral-600 leading-relaxed mb-8 max-w-2xl font-medium">
          {room.description}
        </p>

        {/* Bold Price & Action Tier */}
        <div className="mt-auto flex flex-col sm:flex-row items-end sm:items-center justify-between border-t-2 border-neutral-100 pt-8 gap-6">
          
          {/* Price Block */}
          <div className="flex flex-col">
            <div className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-1">{UI_CONSTANTS.ROOMS.PRICE_LABEL}</div>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black text-emerald-950 tracking-tighter">${room.price}</span>
              <span className="text-lg font-bold text-neutral-500">{UI_CONSTANTS.ROOMS.CURRENCY}</span>
            </div>
            {/* Subdued inventory stat if not scarce enough for badge */}
            {!isScarce && (
              <div className="text-sm font-medium text-emerald-700 mt-2 flex items-center gap-1">
               <span className="w-2 h-2 rounded-full bg-emerald-500 opacity-60"></span> {room.inventory} {UI_CONSTANTS.ROOMS.AVAILABLE_DATES}
              </div>
            )}
          </div>

          {/* Explicit Action block */}
          <button className="w-full sm:w-auto h-16 bg-emerald-950 hover:bg-emerald-900 text-white font-bold text-lg px-8 rounded-xl shadow-[0_8px_20px_rgba(2,44,34,0.3)] transition-all active:scale-[0.98] flex items-center justify-center gap-2">
            {UI_CONSTANTS.ROOMS.SELECT_ACTION}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>

        </div>
      </div>
    </div>
  );
}
