/**
 * @file RoomsViewport.types.ts — Props for the RoomsViewport component.
 *
 * RoomsViewport is the consumer of RoomDetailContext that renders the page
 * chrome (header, hero, room list) and reflows it when the detail panel opens.
 * It receives the same display props as RoomsInnerPage, minus the values that
 * only feed the RoomsContext value (hasDates, prioritizedRoomId).
 */

import type { RoomsInnerPageProps } from "./RoomsInnerPage.types";

export type RoomsViewportProps = Omit<RoomsInnerPageProps, "hasDates" | "prioritizedRoomId">;
