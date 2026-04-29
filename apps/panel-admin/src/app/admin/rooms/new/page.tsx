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
    <main className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Immersive Nature Background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center scale-105 blur-[5px] transition-opacity duration-1000"
        style={{ 
          backgroundImage: `url('/images/room-bg.jpg')` 
        }}
      />
      {/* Subtle Darkening Overlay for focus */}
      <div className="absolute inset-0 z-0 bg-black/5" />

      {/* Decorative organic blob */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        <RoomInfoForm onSubmit={handleSubmit} />
      </div>
    </main>
  );
}
