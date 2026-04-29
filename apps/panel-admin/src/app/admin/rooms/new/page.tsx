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
        className="absolute inset-0 z-0 bg-cover bg-center scale-110 blur-[80px] opacity-40 transition-opacity duration-1000"
        style={{ 
          backgroundImage: `url('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpaperaccess.com%2Ffull%2F1516567.jpg&f=1&nofb=1&ipt=1ccf10cfba0597844e6db6139f9f202f7317a84c8b22d901aa74f2b15a33acc5')` 
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-white/60 via-emerald-50/40 to-mint-50/60" />

      {/* Decorative organic blob */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        <RoomInfoForm onSubmit={handleSubmit} />
      </div>
    </main>
  );
}
