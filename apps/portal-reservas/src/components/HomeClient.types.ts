import type { Room } from "@/features/rooms";

export interface HomeClientProps {
  /** Rooms fetched on the server (US-DM-07), handed to the client state hook. */
  initialRooms: Room[];
}
