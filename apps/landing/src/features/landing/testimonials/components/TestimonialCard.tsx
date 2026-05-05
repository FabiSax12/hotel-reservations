import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/features/landing/testimonials/constants/styles";
import { RATING_MAX } from "@/features/landing/testimonials/constants/testimonials-config";
import type { TestimonialItemTexts } from "@/features/landing/testimonials/i18n/testimonialsTexts.type";

interface TestimonialCardProps {
  texts: TestimonialItemTexts;
  rating: number;
}

const getInitials = (name: string): string =>
  name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

export function TestimonialCard({ texts, rating }: TestimonialCardProps) {
  return (
    <article className={TESTIMONIALS.CARD}>
      <span className={TESTIMONIALS.CARD_QUOTE} aria-hidden="true">
        &ldquo;
      </span>

      <p className={TESTIMONIALS.CARD_BODY}>{texts.BODY}</p>

      <footer className={TESTIMONIALS.CARD_FOOTER}>
        <div className={TESTIMONIALS.CARD_AVATAR} aria-hidden="true">
          <span className={TESTIMONIALS.CARD_AVATAR_INITIALS}>
            {getInitials(texts.NAME)}
          </span>
        </div>

        <div className={TESTIMONIALS.CARD_AUTHOR}>
          <span className={TESTIMONIALS.CARD_NAME}>{texts.NAME}</span>
          <span className={TESTIMONIALS.CARD_ORIGIN}>{texts.ORIGIN}</span>
        </div>

        <div className={TESTIMONIALS.STARS} role="img" aria-label={`${rating} out of ${RATING_MAX} stars`}>
          {Array.from({ length: RATING_MAX }, (_, i) => (
            <Star
              key={i}
              className={i < rating ? TESTIMONIALS.STAR_FILLED : TESTIMONIALS.STAR_EMPTY}
              aria-hidden="true"
            />
          ))}
        </div>
      </footer>
    </article>
  );
}
