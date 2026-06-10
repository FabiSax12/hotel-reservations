import { forbidden } from "next/navigation";
import { Suspense } from "react";
import { RoomsListView } from "@/features/rooms/components/list/RoomsListView/RoomsListView";
import { getRooms } from "@/features/rooms/services/getRooms";
import { AuthenticationRequiredError, PermissionDeniedError } from "@/shared/auth/errors";

export default async function RoomsPage() {
  try {
    const roomsPromise = getRooms();

    return (
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center min-h-96">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-700" />
          </div>
        }
      >
        <RoomsListView rooms={roomsPromise} />
      </Suspense>
    );
  } catch (error) {
    if (error instanceof AuthenticationRequiredError || error instanceof PermissionDeniedError) {
      forbidden();
    }

    throw error;
  }
}
