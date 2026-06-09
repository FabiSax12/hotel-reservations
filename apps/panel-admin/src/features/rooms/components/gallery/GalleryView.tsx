"use client";

import { useRouter } from "next/navigation";
import { ROUTES } from "@/config/routes";
import { DEFAULT_ROOM_ID } from "@/features/rooms/constants/amenities.constants";
import { AMENITIES_VIEW_STYLES as STYLES } from "../amenities/AmenitiesView/AmenitiesView.styles";
import { GalleryStage } from "./GalleryStage";

export const GalleryView = () => {
  const router = useRouter();

  const handleSuccess = () => {
    router.push(ROUTES.ADMIN.DASHBOARD);
  };

  return (
    <main className={STYLES.main}>
      <div
        className={STYLES.background}
        style={{ backgroundImage: `url('${STYLES.bgImage}')` }}
      />
      <div className={STYLES.overlay} />
      <div className={STYLES.blob} />

      <div className={STYLES.content}>
        <GalleryStage roomId={DEFAULT_ROOM_ID} onSuccess={handleSuccess} />
      </div>
    </main>
  );
};
