"use client";

import { useRouter } from "next/navigation";
import { ROUTES } from "@/config/routes";
import { DEFAULT_ROOM_ID } from "@/features/rooms/constants/amenities.constants";
import { AmenitiesForm } from "../AmenitiesForm/AmenitiesForm";
import { AMENITIES_VIEW_STYLES as STYLES } from "./AmenitiesView.styles";

export const AmenitiesView = () => {
  const router = useRouter();

  const handleSuccess = () => {
    router.push(ROUTES.ADMIN.DASHBOARD);
  };

  return (
    <main className={STYLES.main}>
      <div
        className={STYLES.background}
        style={{
          backgroundImage: `url('${STYLES.bgImage}')`,
        }}
      />
      <div className={STYLES.overlay} />
      <div className={STYLES.blob} />

      <div className={STYLES.content}>
        <AmenitiesForm roomId={DEFAULT_ROOM_ID} onSuccess={handleSuccess} />
      </div>
    </main>
  );
};
