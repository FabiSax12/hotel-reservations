"use client";

import Image from "next/image";
import { useI18n } from "@/locales";
import { GALLERY } from "@/features/landing/gallery/constants/styles";
import { GALLERY_CONFIG } from "@/features/landing/gallery/constants/gallery-config";

type GalleryMobileProps = {
  current: number;
};

export function GalleryMobile({ current }: GalleryMobileProps) {
  const { t } = useI18n();
  const gallery = t.LANDING.GALLERY;

  return (
    <div className={GALLERY.MOBILE_WRAPPER}>
      {GALLERY_CONFIG.map((item, i) => {
        const texts = gallery[item.id];
        return (
          <div
            key={item.id}
            className={GALLERY.MOBILE_CARD}
            style={{ height: "280px" }}
          >
            <div className={GALLERY.MOBILE_CARD_INNER}>
              <Image src={item.imageUrl} alt={item.id} fill className="object-cover" sizes="74vw" />
              <div className={GALLERY.CARD_OVERLAY} style={{ background: item.overlay }} />
              <div
                className={GALLERY.MOBILE_GRADIENT}
                style={{ background: "linear-gradient(to top, oklch(8% 0.03 143 / 0.88), transparent)" }}
              />
              <div className={GALLERY.MOBILE_TEXT_AREA}>
                <div className={GALLERY.MOBILE_ACCENT_LINE} />
                <p className={GALLERY.MOBILE_CARD_TITLE}>{texts.TITLE}</p>
                <p className={GALLERY.MOBILE_CARD_SUBTITLE}>{texts.SUBTITLE}</p>
              </div>
              {i === current && (
                <div className={GALLERY.MOBILE_CARD_DOT} />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
