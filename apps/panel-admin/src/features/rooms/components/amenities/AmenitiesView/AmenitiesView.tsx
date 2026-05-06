"use client";

import { useRouter } from "next/navigation";
import { ROUTES } from "@/config/routes";
import { DEFAULT_ROOM_ID } from "@/features/rooms/constants/amenities.constants";
import { AmenitiesForm } from "../AmenitiesForm/AmenitiesForm";
import { AMENITIES_VIEW_STYLES as s } from "./AmenitiesView.styles";

export const AmenitiesView = () => {
  const router = useRouter();

  const handleSuccess = () => {
    router.push(ROUTES.ADMIN.DASHBOARD);
  };

  return (
    <main className={s.main}>
      <div
        className={s.background}
        style={{
          backgroundImage: `url('${s.bgImage}')`,
        }}
      />
      <div className={s.overlay} />
      <div className={s.blob} />

      <div className={s.content}>
        <AmenitiesForm roomId={DEFAULT_ROOM_ID} onSuccess={handleSuccess} />
      </div>
    </main>
  );
};
