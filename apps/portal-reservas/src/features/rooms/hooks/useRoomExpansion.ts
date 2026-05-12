/**
 * @file useRoomExpansion.ts — Card expansion state manager.
 *
 * Reads `expandedRoomId` and `setExpandedRoomId` from RoomsContext.
 * Provides `isExpanded`, `handleExpand`, and `handleCollapse` to each RoomCard,
 * enforcing the "only one card open at a time" constraint via the shared context.
 */

"use client";

import { useRoomsContext } from "../context/RoomsContext";

export interface RoomExpansionControls {
  /** Whether this specific room's expansion panel is currently open. */
  isExpanded: boolean;
  /** Opens this room's panel (closes any previously open panel). */
  handleExpand: () => void;
  /** Closes this room's panel. */
  handleCollapse: () => void;
  /** Toggles the expansion state. */
  handleToggle: () => void;
}

/**
 * @param roomId - The stable ID of the room this hook is bound to.
 */
export function useRoomExpansion(roomId: string): RoomExpansionControls {
  const { expandedRoomId, setExpandedRoomId } = useRoomsContext();

  const isExpanded = expandedRoomId === roomId;

  const handleExpand = () => setExpandedRoomId(roomId);
  const handleCollapse = () => setExpandedRoomId(null);
  const handleToggle = () => setExpandedRoomId(isExpanded ? null : roomId);

  return { isExpanded, handleExpand, handleCollapse, handleToggle };
}
