import { describe, it, expect } from 'vitest';
import { filterRoomsByDestination } from './filters';
import type { Room } from './types';

describe('filterRoomsByDestination', () => {
  const mockRooms = [
    { id: '1', location: 'Monteverde' },
    { id: '2', location: 'La Fortuna' },
    { id: '3', location: 'Monteverde' },
  ] as Room[];

  it('should return all rooms if destination is null', () => {
    const result = filterRoomsByDestination(mockRooms, null);
    expect(result.length).toBe(3);
  });

  it('should return all rooms if destination is Todos', () => {
    const result = filterRoomsByDestination(mockRooms, 'Todos');
    expect(result.length).toBe(3);
  });

  it('should filter rooms by given destination', () => {
    const result = filterRoomsByDestination(mockRooms, 'Monteverde');
    expect(result.length).toBe(2);
    expect(result.every(r => r.location === 'Monteverde')).toBe(true);
  });
});
