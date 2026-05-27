import { ABOUT } from "@/features/landing/about/constants/styles";
import { AboutMosaic } from "./AboutMosaic";
import { AboutStats } from "./AboutStats";
import { AboutTextPanel } from "./AboutTextPanel";

export function AboutSection() {
  return (
    <section id="about" className={ABOUT.SECTION}>
      <div className={ABOUT.CONTAINER}>
        <div className={ABOUT.GRID}>
          <AboutTextPanel />
          <AboutMosaic />
        </div>
        <AboutStats />
      </div>
    </section>
  );
}
