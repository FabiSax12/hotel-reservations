"use client";

import Image from "next/image";
import { useI18n } from "@/locales";
import { GALLERY_CONFIG } from "@/features/landing/gallery/constants/gallery-config";

type GalleryMobileProps = {
  current: number;
};

export function GalleryMobile({ current }: GalleryMobileProps) {
  const { t } = useI18n();
  const gallery = t.LANDING.GALLERY;

  return (
    <div className="lg:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 scrollbar-none mt-2">
      {GALLERY_CONFIG.map((item, i) => {
        const texts = gallery[item.id];
        return (
          <div
            key={item.id}
            className="snap-start shrink-0 w-[74vw] rounded-xl overflow-hidden"
            style={{ height: "280px" }}
          >
            <div className="w-full h-full relative">
              <Image src={item.imageUrl} alt={item.id} fill className="object-cover" sizes="74vw" />
              <div className="absolute inset-0" style={{ background: item.overlay }} />
              <div
                className="absolute inset-x-0 bottom-0 h-2/5"
                style={{ background: "linear-gradient(to top, oklch(8% 0.03 143 / 0.88), transparent)" }}
              />
              <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col">
                <div className="w-5 h-px bg-gold-500/60 mb-3" />
                <p className="font-serif text-stone-50 text-lg leading-tight">{texts.TITLE}</p>
                <p className="font-sans text-stone-300/70 text-[10px] tracking-[0.2em] uppercase mt-1">
                  {texts.SUBTITLE}
                </p>
              </div>
              {i === current && (
                <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-gold-500" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
