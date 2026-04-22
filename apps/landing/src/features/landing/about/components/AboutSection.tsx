"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform, useMotionTemplate, useReducedMotion } from "framer-motion";
import { useI18n } from "@/locales";
import { ABOUT } from "@/features/landing/about/constants/styles";
import { EXPO_OUT } from "@/features/landing/constants/animations";

const REVEAL = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EXPO_OUT } },
};

const STAGGER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const MOSAIC_ITEM = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.1, ease: EXPO_OUT } },
};

type StatDisplay = { prefix: string; num: number; suffix: string };

function parseStatValue(value: string): StatDisplay {
  const match = value.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return { prefix: "", num: 0, suffix: value };
  return { prefix: match[1], num: parseFloat(match[2]), suffix: match[3] };
}

function AnimatedStatValue({
  value,
  isInView,
}: {
  value: string;
  isInView: boolean;
}) {
  const { prefix, num, suffix } = parseStatValue(value);
  const [display, setDisplay] = useState(0);
  const isDecimal = num % 1 !== 0;
  const prefersReducedMotion = useReducedMotion() ?? false;

  useEffect(() => {
    if (prefersReducedMotion) { setDisplay(num); return; }
    if (!isInView) return;
    const duration = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplay(eased * num);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, num, prefersReducedMotion]);

  const formatted = isDecimal ? display.toFixed(1) : Math.round(display).toString();

  return (
    <span>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

export function AboutSection() {
  const { t } = useI18n();
  const about = t.LANDING.ABOUT;

  const textRef = useRef<HTMLDivElement>(null);
  const mosaicRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const textInView = useInView(textRef, { once: true, margin: "-80px" });
  const mosaicInView = useInView(mosaicRef, { once: true, margin: "-80px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });

  const { scrollYProgress } = useScroll({
    target: mosaicRef,
    offset: ["start end", "end start"],
  });

  const panel1Y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const panel2Y = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const panel3Y = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  const panel1Transform = useMotionTemplate`translateY(${panel1Y}) scale(1.12)`;
  const panel2Transform = useMotionTemplate`translateY(${panel2Y}) scale(1.1)`;
  const panel3Transform = useMotionTemplate`translateY(${panel3Y}) scale(1.1)`;

  const stats = [
    about.STATS.SUITES,
    about.STATS.YEARS,
    about.STATS.GUESTS,
    about.STATS.RATING,
  ];

  return (
    <section className={ABOUT.SECTION}>
      <div className={ABOUT.CONTAINER}>
        <div className={ABOUT.GRID}>
          <motion.div
            ref={textRef}
            variants={STAGGER}
            initial="hidden"
            animate={textInView ? "visible" : "hidden"}
            className="flex flex-col"
          >
            <motion.span className={ABOUT.EYEBROW} variants={REVEAL}>
              {about.EYEBROW}
            </motion.span>
            <div className="overflow-hidden mb-8">
              <motion.h2
                className={ABOUT.HEADLINE.replace("mb-8", "")}
                initial={{ y: "100%" }}
                animate={textInView ? { y: "0%" } : { y: "100%" }}
                transition={{ duration: 1, delay: 0.1, ease: EXPO_OUT }}
              >
                {about.HEADLINE}
              </motion.h2>
            </div>
            <motion.p className={ABOUT.BODY} variants={REVEAL}>
              {about.BODY}
            </motion.p>
            <motion.blockquote className={ABOUT.QUOTE_WRAPPER} variants={REVEAL}>
              <p className={ABOUT.QUOTE}>&ldquo;{about.QUOTE}&rdquo;</p>
              <cite className={ABOUT.QUOTE_ATTR}>{about.QUOTE_ATTRIBUTION}</cite>
            </motion.blockquote>
          </motion.div>

          <motion.div
            ref={mosaicRef}
            variants={STAGGER}
            initial="hidden"
            animate={mosaicInView ? "visible" : "hidden"}
            className={ABOUT.MOSAIC}
          >
            <motion.div
              variants={MOSAIC_ITEM}
              className={`${ABOUT.MOSAIC_ITEM} ${ABOUT.MOSAIC_TALL} row-span-2 overflow-hidden`}
              style={{ minHeight: "480px" }}
            >
              <motion.div
                className="w-full h-full relative"
                style={{ transform: panel1Transform }}
              >
                <Image
                  src="https://picsum.photos/seed/about-forest/480/720"
                  alt="ALTAVERDE forest"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(170deg, oklch(28% 0.07 143 / 0.5) 0%, oklch(11% 0.04 143 / 0.65) 100%)",
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse 80% 60% at 40% 30%, oklch(35% 0.08 143 / 0.5), transparent)",
                  }}
                />
              </motion.div>
            </motion.div>

            <motion.div
              variants={MOSAIC_ITEM}
              className={`${ABOUT.MOSAIC_ITEM} overflow-hidden`}
              style={{ minHeight: "228px" }}
            >
              <motion.div className="w-full h-full relative" style={{ transform: panel2Transform }}>
                <Image
                  src="https://picsum.photos/seed/about-warm/480/340"
                  alt="ALTAVERDE nature"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(140deg, oklch(67% 0.15 68 / 0.35) 0%, oklch(16% 0.05 143 / 0.6) 100%)",
                  }}
                />
              </motion.div>
            </motion.div>

            <motion.div
              variants={MOSAIC_ITEM}
              className={`${ABOUT.MOSAIC_ITEM} overflow-hidden`}
              style={{ minHeight: "228px" }}
            >
              <motion.div className="w-full h-full relative" style={{ transform: panel3Transform }}>
                <Image
                  src="https://picsum.photos/seed/about-stone/480/340"
                  alt="ALTAVERDE property"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(200deg, oklch(94% 0.015 75 / 0.3) 0%, oklch(70% 0.03 75 / 0.5) 100%)",
                  }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          ref={statsRef}
          className={ABOUT.STATS}
          initial="hidden"
          animate={statsInView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.LABEL}
              className={ABOUT.STAT_ITEM}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EXPO_OUT } },
              }}
            >
              <p className={ABOUT.STAT_VALUE}>
                <AnimatedStatValue value={stat.VALUE} isInView={statsInView} />
              </p>
              <p className={ABOUT.STAT_LABEL}>{stat.LABEL}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
