import type { Easing } from "framer-motion";

type OrbAnimate = { opacity: number[]; y?: number[]; x?: number[] };
type OrbTransition = { duration: number; repeat: number; ease: Easing; delay?: number };
type OrbStyle = { top: string; left?: string; right?: string };

export type OrbConfig = {
  size: string;
  color: string;
  style: OrbStyle;
  animate: OrbAnimate;
  transition: OrbTransition;
};

export const HERO_ORBS: OrbConfig[] = [
  { size: "w-2 h-2",   color: "bg-gold-500", style: { top: "12%", left: "8%"  }, animate: { opacity: [0.3, 0.9, 0.3],   y: [0, -8, 0]              }, transition: { duration: 3.2, repeat: Infinity, ease: "easeInOut"              } },
  { size: "w-1 h-1",   color: "bg-gold-400", style: { top: "6%",  left: "22%" }, animate: { opacity: [0.15, 0.7, 0.15], y: [0, -5, 0]              }, transition: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 } },
  { size: "w-1.5 h-1.5", color: "bg-gold-300", style: { top: "22%", left: "4%"  }, animate: { opacity: [0.2, 0.8, 0.2],   x: [0, 4, 0], y: [0, -6, 0] }, transition: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.4 } },
  { size: "w-0.5 h-0.5", color: "bg-gold-400", style: { top: "38%", left: "12%" }, animate: { opacity: [0.1, 0.6, 0.1],   y: [0, -4, 0]              }, transition: { duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 2.1 } },
  { size: "w-1 h-1",   color: "bg-gold-500", style: { top: "55%", left: "6%"  }, animate: { opacity: [0.25, 0.75, 0.25], x: [0, 3, 0], y: [0, -7, 0] }, transition: { duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 } },
  { size: "w-1.5 h-1.5", color: "bg-gold-300", style: { top: "72%", left: "18%" }, animate: { opacity: [0.2, 0.65, 0.2],  y: [0, -5, 0]              }, transition: { duration: 6.0, repeat: Infinity, ease: "easeInOut", delay: 1.9 } },
  { size: "w-1 h-1",   color: "bg-gold-400", style: { top: "85%", left: "9%"  }, animate: { opacity: [0.15, 0.55, 0.15], x: [0, -3, 0], y: [0, -4, 0] }, transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2.7 } },
  { size: "w-2 h-2",   color: "bg-gold-500", style: { top: "8%",  left: "42%" }, animate: { opacity: [0.2, 0.85, 0.2],  y: [0, -9, 0]              }, transition: { duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 } },
  { size: "w-0.5 h-0.5", color: "bg-gold-300", style: { top: "30%", left: "36%" }, animate: { opacity: [0.1, 0.5, 0.1],   x: [0, 4, 0]               }, transition: { duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 1.1 } },
  { size: "w-1 h-1",   color: "bg-gold-400", style: { top: "48%", left: "48%" }, animate: { opacity: [0.15, 0.6, 0.15], y: [0, -6, 0]              }, transition: { duration: 4.0, repeat: Infinity, ease: "easeInOut", delay: 3.2 } },
  { size: "w-1.5 h-1.5", color: "bg-gold-500", style: { top: "68%", left: "38%" }, animate: { opacity: [0.2, 0.7, 0.2],   x: [0, -4, 0], y: [0, -5, 0] }, transition: { duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0.9 } },
  { size: "w-1 h-1",   color: "bg-gold-300", style: { top: "88%", left: "44%" }, animate: { opacity: [0.1, 0.5, 0.1],   y: [0, -4, 0]              }, transition: { duration: 5.8, repeat: Infinity, ease: "easeInOut", delay: 2.4 } },
  { size: "w-2 h-2",   color: "bg-gold-400", style: { top: "15%", right: "6%" }, animate: { opacity: [0.25, 0.8, 0.25], y: [0, -8, 0]              }, transition: { duration: 3.9, repeat: Infinity, ease: "easeInOut", delay: 1.6 } },
  { size: "w-1 h-1",   color: "bg-gold-500", style: { top: "32%", right: "4%" }, animate: { opacity: [0.2, 0.75, 0.2],  x: [0, -3, 0], y: [0, -6, 0] }, transition: { duration: 4.7, repeat: Infinity, ease: "easeInOut", delay: 0.4 } },
  { size: "w-0.5 h-0.5", color: "bg-gold-300", style: { top: "62%", right: "8%" }, animate: { opacity: [0.1, 0.55, 0.1], y: [0, -5, 0]              }, transition: { duration: 5.1, repeat: Infinity, ease: "easeInOut", delay: 2.9 } },
  { size: "w-1.5 h-1.5", color: "bg-gold-400", style: { top: "80%", right: "5%" }, animate: { opacity: [0.2, 0.65, 0.2],  x: [0, 3, 0], y: [0, -7, 0] }, transition: { duration: 4.3, repeat: Infinity, ease: "easeInOut", delay: 1.2 } },
];
