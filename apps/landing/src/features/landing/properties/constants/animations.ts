export const AUTO_INTERVAL = 5500;

export const SLIDE_VARIANTS = {
  enter: (dir: number) => ({ x: dir > 0 ? "55%" : "-55%", opacity: 0, scale: 0.94, filter: "blur(0px)", transition: { type: "spring" as const, duration: 0.72, bounce: 0.08 } }),
  center: { x: "0%", opacity: 1, scale: 1, filter: "blur(0px)", transition: { type: "spring" as const, duration: 0.72, bounce: 0.08 } },
  exit: (dir: number) => ({ x: dir < 0 ? "55%" : "-55%", opacity: 0, scale: 0.94, filter: "blur(8px)", transition: { type: "spring" as const, duration: 0.28, bounce: 0 } }),
};

export const SLIDE_VARIANTS_REDUCED = {
  enter: (_dir: number) => ({ opacity: 0, transition: { duration: 0.2 } }),
  center: { opacity: 1, transition: { duration: 0.2 } },
  exit: (_dir: number) => ({ opacity: 0, transition: { duration: 0.12 } }),
};
