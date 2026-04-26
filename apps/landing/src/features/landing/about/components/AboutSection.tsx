import { ABOUT } from "@/features/landing/about/constants/styles";
import { AboutTextPanel } from "./AboutTextPanel";
import { AboutMosaic } from "./AboutMosaic";
import { AboutStats } from "./AboutStats";

export function AboutSection() {
  return (
    <section className={ABOUT.SECTION}>
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
