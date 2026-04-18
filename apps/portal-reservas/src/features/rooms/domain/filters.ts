import type { Room } from './types';

export const filterRoomsByDestination = (rooms: Room[], destination: string | null): Room[] => {
  if (!destination || destination === 'Todos') {
    return rooms;
  }
  return rooms.filter(r => r.location === destination);
};
