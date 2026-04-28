"use client";

import { RoomInfoForm } from "@/features/rooms/components/info/RoomInfoForm/RoomInfoForm";
import { mockRoomService } from "@/features/rooms/services/mockRoomService";
import { useRouter } from "next/navigation";

export default function NewRoomPage() {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    try {
      await mockRoomService.createRoom(data);
      // For now, redirecting back to dashboard since rooms list might not exist yet
      router.push("/admin/dashboard");
    } catch (error) {
      console.error("Failed to create room:", error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <RoomInfoForm onSubmit={handleSubmit} />
    </main>
  );
}
