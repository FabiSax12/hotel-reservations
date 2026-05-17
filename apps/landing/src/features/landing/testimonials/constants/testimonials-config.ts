import type { TestimonialsTexts } from "../i18n/testimonialsTexts.type";

export const RATING_MAX = 5;

export type TestimonialId = keyof Omit<TestimonialsTexts, "EYEBROW" | "HEADLINE" | "SUBHEADLINE">;

export type TestimonialConfig = {
  id: TestimonialId;
  rating: number;
};

export const TESTIMONIALS_CONFIG: TestimonialConfig[] = [
  { id: "T1", rating: 5 },
  { id: "T2", rating: 5 },
  { id: "T3", rating: 5 },
  { id: "T4", rating: 4 },
  { id: "T5", rating: 5 },
  { id: "T6", rating: 5 },
];
