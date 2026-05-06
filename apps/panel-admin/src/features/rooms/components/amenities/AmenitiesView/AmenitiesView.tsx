"use client";

import { AmenitiesForm } from "../AmenitiesForm/AmenitiesForm";
import { NEW_ROOM_VIEW_STYLES } from "@/features/rooms/components/create/NewRoomView/NewRoomView.styles";
import { DEFAULT_ROOM_ID } from "@/features/rooms/constants/amenities.constants";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/config/routes";

export const AmenitiesView = () => {
  const router = useRouter();

  const handleSuccess = () => {
    // For now, redirect to dashboard or next step when available
    router.push(ROUTES.ADMIN.DASHBOARD);
  };

  return (
    <main className={NEW_ROOM_VIEW_STYLES.main}>
      <div 
        className={NEW_ROOM_VIEW_STYLES.background}
        style={{ 
          backgroundImage: `url('${NEW_ROOM_VIEW_STYLES.bgImage}')` 
        }}
      />
      <div className={NEW_ROOM_VIEW_STYLES.overlay} />
      <div className={NEW_ROOM_VIEW_STYLES.blob} />
      
      <div className={`${NEW_ROOM_VIEW_STYLES.content} max-w-3xl mx-auto`}>
        <div className="bg-white/50 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
          <AmenitiesForm roomId={DEFAULT_ROOM_ID} onSuccess={handleSuccess} />
        </div>
      </div>
    </main>
  );
};
