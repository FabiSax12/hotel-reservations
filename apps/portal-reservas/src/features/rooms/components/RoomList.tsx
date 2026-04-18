import type { Room } from '../domain/types';
import { RoomCard } from './RoomCard';
import { UI_CONSTANTS } from '../../../shared/constants/ui';

interface RoomListProps {
  rooms: Room[];
  selectedDest: string | null;
  searchKey: number;
}

export function RoomList({ rooms, selectedDest, searchKey }: RoomListProps) {
  return (
    <section className="relative w-full max-w-5xl mx-auto px-6 py-16 mt-[180px] animate-in fade-in slide-in-from-bottom-12 duration-700 fill-mode-both">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b-2 border-emerald-900/10">
        <div>
          <div className="text-emerald-600 font-bold tracking-widest uppercase mb-2">{UI_CONSTANTS.ROOMS.REALTIME_AVAIL}</div>
          <h2 className="text-4xl font-black text-emerald-950 tracking-tight">{UI_CONSTANTS.ROOMS.OPTIONS_IN} {selectedDest || UI_CONSTANTS.ROOMS.ALL_DESTINATIONS}</h2>
        </div>
        
        <div className="mt-6 md:mt-0 px-4 py-2 bg-neutral-100 rounded-lg text-neutral-600 font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          {rooms.length} {UI_CONSTANTS.ROOMS.ROOMS_FOUND}
        </div>
      </div>

      <div key={searchKey} className="flex flex-col gap-10">
        {rooms.map((room, index) => (
          <RoomCard 
            key={room.id} 
            room={room} 
            index={index} 
            selectedDest={selectedDest} 
          />
        ))}
      </div>

    </section>
  );
}
