"use client";

import { useRouter } from "next/navigation";
import { ROUTES } from "@/config/routes";
import { DEFAULT_ROOM_ID } from "@/features/rooms/constants/amenities.constants";
import { CheckInCheckOutForm } from "./CheckInCheckOut";
import { AMENITIES_VIEW_STYLES as STYLES } from "../amenities/AmenitiesView/AmenitiesView.styles";

export const CheckInCheckOutView = () => {
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
        <CheckInCheckOutForm roomId={DEFAULT_ROOM_ID} onSuccess={handleSuccess} />
      </div>
    </main>
  );
};
