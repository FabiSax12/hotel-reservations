"use client";

import { useRouter } from "next/navigation";
import { ROUTES } from "@/config/routes";
import { AMENITIES_VIEW_STYLES as STYLES } from "../amenities/AmenitiesView/AmenitiesView.styles";
import { GalleryStage } from "./GalleryStage";

interface GalleryViewProps {
  roomId: string;
}

export const GalleryView = ({ roomId }: GalleryViewProps) => {
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
        <GalleryStage roomId={roomId} onSuccess={handleSuccess} />
      </div>
    </main>
  );
};
