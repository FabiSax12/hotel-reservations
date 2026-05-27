import type { GalleryTexts } from "@/features/landing/gallery/i18n/galleryTexts.type";

export type GalleryItemId = keyof Omit<
  GalleryTexts,
  "EYEBROW" | "HEADLINE" | "SUBHEADLINE" | "DOT_LABEL"
>;

export type GalleryItem = {
  id: GalleryItemId;
  imageUrl: string;
  overlay: string;
};

export const GALLERY_CONFIG: GalleryItem[] = [
  {
    id: "THERMAL",
    imageUrl: "https://picsum.photos/seed/thermal-springs/400/540",
    overlay: "linear-gradient(155deg, oklch(24% 0.08 45 / 0.55) 0%, oklch(11% 0.03 35 / 0.7) 100%)",
  },
  {
    id: "CANOPY",
    imageUrl: "https://picsum.photos/seed/forest-canopy/400/540",
    overlay:
      "linear-gradient(160deg, oklch(26% 0.09 143 / 0.5) 0%, oklch(11% 0.04 143 / 0.7) 100%)",
  },
  {
    id: "SPA",
    imageUrl: "https://picsum.photos/seed/spa-wellness/400/540",
    overlay:
      "linear-gradient(145deg, oklch(80% 0.025 78 / 0.35) 0%, oklch(55% 0.07 65 / 0.6) 100%)",
  },
  {
    id: "VOLCANO",
    imageUrl: "https://picsum.photos/seed/volcano-crater/400/540",
    overlay: "linear-gradient(170deg, oklch(14% 0.02 25 / 0.5) 0%, oklch(28% 0.1 38 / 0.65) 100%)",
  },
  {
    id: "DINING",
    imageUrl: "https://picsum.photos/seed/outdoor-dining/400/540",
    overlay: "linear-gradient(140deg, oklch(30% 0.07 52 / 0.5) 0%, oklch(14% 0.04 48 / 0.7) 100%)",
  },
  {
    id: "MIST",
    imageUrl: "https://picsum.photos/seed/misty-forest/400/540",
    overlay:
      "linear-gradient(130deg, oklch(70% 0.04 220 / 0.4) 0%, oklch(34% 0.07 200 / 0.65) 100%)",
  },
  {
    id: "SUITE",
    imageUrl: "https://picsum.photos/seed/luxury-suite/400/540",
    overlay:
      "linear-gradient(150deg, oklch(22% 0.06 143 / 0.5) 0%, oklch(10% 0.03 143 / 0.72) 100%)",
  },
];
