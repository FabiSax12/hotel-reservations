## Design Context

### Users
Travelers and tourists looking for high-quality hotel accommodations in semi-rural, scenic areas of Costa Rica. They are planning trips that balance nature exploration with premium hospitality and expect a trustworthy, modern booking experience.

### Brand Personality
Natural, scenic, professional, trustworthy, and premium. The tone is deeply connected to Costa Rican nature while maintaining the sharp, efficient reliability of a world-class hospitality service.

### Aesthetic Direction
Modern and immersive, heavily utilizing high-quality photography of Costa Rican scenery. UI elements should feel organic but highly polished—avoiding "old system" clunkiness. The color palette should lean into natural, earthy greens, warm wood tones, and crisp white/neutral surfaces for high legibility, avoiding generic tech-brand colors.

### Design Principles
1. **Progressive Disclosure**: Keep the initial view clean. Complex inputs (calendars, guest counters) only appear when the user interacts with them.
2. **Immersive Framing**: Use edge-to-edge photography and soft atmospheric shadows to make the scenery the star.
3. **Intentional Interactions**: Use micro-animations and feedback (active:scale-95) to make the UI feel alive.
4. **Professionalism**: Despite the natural theme, inputs and forms must feel incredibly crisp, responsive, and robust, cementing trust.

## Style Profile: "Natural Premium"

### Color Palette (OKLCH)
- **Primary**: Emerald (`oklch(62.04% 0.195 224.67)`) for actions and highlights.
- **Surface**: Crisp White/Translucent (`bg-white/90 backdrop-blur-xl`) for content containers.
- **Accents**: Natural earth tones (Warm woods, misty greens) derived from photography.

### Typography
- **Headings**: `Instrument Sans` with `font-black` and tight tracking.
- **Labels**: All-caps, `font-black`, wide tracking (`tracking-widest`), small size (`text-[11px]`).
- **Body**: Clean, high-legibility sans-serif with generous leading.

### Component DNA
- **Radius**: `2xl` (1rem) for major containers, `xl` for inputs and buttons.
- **Shadows**: Deep, soft shadows (`shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]`) to create depth without clutter.
- **Borders**: Thin, low-contrast borders (`border-white/20` or `border-neutral-200/60`).

### Interactive Patterns
- **Buttons**: Full-width, high-contrast, uppercase labels.
- **Scale Feedback**: `active:scale-[0.98]` on all interactive surfaces.
- **Transitions**: `transition-all duration-300` with ease-in-out timing.

## Implementation Guidelines
- **Theme Segregation**: Always keep Tailwind class strings in a `*.theme.ts` file within the feature directory.
- **Visual Weight**: Use the 60-30-10 rule. Neutrals dominate, Emerald accents provide the focus.
- **Immersive Backgrounds**: Use high-quality, blurred/washed photography as the canvas for authentication and landing pages.
