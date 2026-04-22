import type { PropertiesTexts } from "@/features/landing/properties/i18n/propertiesTexts.type";

export type PropertyId = keyof Pick<PropertiesTexts, "ARENAL" | "MONTEVERDE">;

export type PropertyVisual = {
  gradient: string;
  accentColor: string;
  rings: string;
  imageUrl: string;
};

export type PropertyConfig = {
  id: PropertyId;
  visual: PropertyVisual;
};

export const PROPERTIES_CONFIG: readonly PropertyConfig[] = Object.freeze([
  {
    id: "ARENAL",
    visual: {
      gradient:
        "linear-gradient(135deg, oklch(22% 0.07 55 / 0.55) 0%, oklch(18% 0.06 100 / 0.45) 40%, oklch(14% 0.05 143 / 0.55) 75%, oklch(11% 0.04 143 / 0.7) 100%)",
      accentColor: "oklch(67% 0.15 68)",
      rings: "oklch(67% 0.15 68 / 0.12)",
      imageUrl: "https://picsum.photos/seed/arenal-volcano/800/600",
    },
  },
  {
    id: "MONTEVERDE",
    visual: {
      gradient:
        "linear-gradient(135deg, oklch(25% 0.04 220 / 0.5) 0%, oklch(20% 0.06 175 / 0.45) 45%, oklch(15% 0.06 143 / 0.55) 75%, oklch(11% 0.04 143 / 0.7) 100%)",
      accentColor: "oklch(64% 0.09 143)",
      rings: "oklch(64% 0.09 143 / 0.15)",
      imageUrl: "https://picsum.photos/seed/monteverde-cloud/800/600",
    },
  },
] as const);
