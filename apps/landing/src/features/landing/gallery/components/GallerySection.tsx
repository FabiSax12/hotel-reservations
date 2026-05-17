"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { AUTO_INTERVAL } from "@/features/landing/gallery/constants/carousel";
import { GALLERY_CONFIG } from "@/features/landing/gallery/constants/gallery-config";
import { GALLERY } from "@/features/landing/gallery/constants/styles";
import { GalleryCarousel } from "./GalleryCarousel";
import { GalleryControls } from "./GalleryControls";
import { GalleryHeader } from "./GalleryHeader";
import { GalleryMobile } from "./GalleryMobile";

export function GallerySection() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion() ?? false;
  const total = GALLERY_CONFIG.length;

  useEffect(() => {
    if (prefersReducedMotion || isHovered) return;
    const timer = setInterval(() => setCurrent((c) => (c + 1) % total), AUTO_INTERVAL);
    return () => clearInterval(timer);
  }, [isHovered, prefersReducedMotion, total]);

  return (
    <section className={GALLERY.SECTION}>
      <GalleryHeader />
      <GalleryCarousel current={current} onSelect={setCurrent} onHoverChange={setIsHovered} />
      <GalleryMobile current={current} />
      <GalleryControls
        current={current}
        total={total}
        isHovered={isHovered}
        prefersReducedMotion={prefersReducedMotion}
        autoInterval={AUTO_INTERVAL}
        onSelect={setCurrent}
      />
    </section>
  );
}
