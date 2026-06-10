/**
 * @file page.tsx — Root page of the Portal de Reservas application.
 *
 * Server Component: fetches the rooms from the DB (US-DM-07) and composes the
 * HomeClient island, which owns all interactive state. No inline logic per
 * architecture spec: app/ pages only compose.
 */

import { getRooms } from "@/features/rooms/services/roomsService";
import { HomeClient } from "../components/HomeClient";

export default async function HomePage() {
  const rooms = await getRooms();

  return <HomeClient initialRooms={rooms} />;
}
