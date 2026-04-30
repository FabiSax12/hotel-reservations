"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useI18n } from "@/locales";
import { GALLERY } from "@/features/landing/gallery/constants/styles";
import { EXPO_OUT } from "@/features/landing/constants/animations";

const ITEM = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EXPO_OUT } },
};

export function GalleryHeader() {
  const { t } = useI18n();
  const gallery = t.LANDING.GALLERY;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div className={GALLERY.CONTAINER}>
      <motion.div
        ref={ref}
        className={GALLERY.HEADER}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <motion.span className={GALLERY.EYEBROW} variants={ITEM}>{gallery.EYEBROW}</motion.span>
        <div className={GALLERY.HEADLINE_WRAPPER}>
          <motion.h2
            className={GALLERY.HEADLINE}
            initial={{ y: "100%" }}
            animate={inView ? { y: "0%" } : { y: "100%" }}
            transition={{ duration: 1, delay: 0.15, ease: EXPO_OUT }}
          >
            {gallery.HEADLINE}
          </motion.h2>
        </div>
        <motion.p className={GALLERY.SUBHEADLINE}
          variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2, ease: EXPO_OUT } } }}>
          {gallery.SUBHEADLINE}
        </motion.p>
      </motion.div>
    </div>
  );
}
