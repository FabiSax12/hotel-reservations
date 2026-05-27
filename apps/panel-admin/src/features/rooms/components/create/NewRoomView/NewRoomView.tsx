"use client";

import { useRouter } from "next/navigation";
import { ROUTES } from "@/config/routes";
import { RoomInfoForm } from "@/features/rooms/components/info/RoomInfoForm/RoomInfoForm";
import { createRoomAction } from "@/features/rooms/services/roomActions";
import { NEW_ROOM_VIEW_STYLES } from "./NewRoomView.styles";

export const NewRoomView = () => {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    try {
      const { error } = await createRoomAction(data);
      if (error) throw new Error(error);

      router.push(ROUTES.ADMIN.DASHBOARD);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className={NEW_ROOM_VIEW_STYLES.main}>
      <div
        className={NEW_ROOM_VIEW_STYLES.background}
        style={{
          backgroundImage: `url('${NEW_ROOM_VIEW_STYLES.bgImage}')`,
        }}
      />
      <div className={NEW_ROOM_VIEW_STYLES.overlay} />

      <div className={NEW_ROOM_VIEW_STYLES.blob} />

      <div className={NEW_ROOM_VIEW_STYLES.content}>
        <RoomInfoForm onSubmit={handleSubmit} />
      </div>
    </main>
  );
};
