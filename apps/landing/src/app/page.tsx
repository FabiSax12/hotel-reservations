import { ScrollProgress } from "@/features/landing/layout/components/ScrollProgress";
import { LandingNav } from "@/features/landing/layout/components/LandingNav";
import { HeroSection } from "@/features/landing/hero/components/HeroSection";
import { MarqueeBand } from "@/features/landing/layout/components/MarqueeBand";
import { AboutSection } from "@/features/landing/about/components/AboutSection";
import { PropertiesSection } from "@/features/landing/properties/components/PropertiesSection";
import { ServicesSection } from "@/features/landing/services/components/ServicesSection";
import { GallerySection } from "@/features/landing/gallery/components/GallerySection";
import { TestimonialsSection } from "@/features/landing/testimonials/components/TestimonialsSection";
import { LandingFooter } from "@/features/landing/layout/components/LandingFooter";

export default function LandingPage() {
  return (
    <main>
      <ScrollProgress />
      <LandingNav />
      <HeroSection />
      <MarqueeBand />
      <AboutSection />
      <PropertiesSection />
      <ServicesSection />
      <GallerySection />
      <TestimonialsSection />
      <LandingFooter />
    </main>
  );
}
