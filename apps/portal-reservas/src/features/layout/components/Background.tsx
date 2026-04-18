/**
 * @file Background.tsx — Full-viewport background layer.
 *
 * Renders three stacked layers behind all page content:
 *  1. A slightly-blurred nature photograph that sets the resort atmosphere.
 *  2. A semi-transparent white wash that ensures text contrast without
 *     destroying the image beneath.
 *  3. A top-down gradient that grounds the header and central UI elements
 *     by making the upper portion brighter.
 *
 * The wrapper uses `z-[-1]` to sit behind all interactive content and
 * `pointer-events-none` so it never intercepts clicks.
 */

import { BACKGROUND_STYLES as S } from "../../../theme/layout.theme";

export function Background() {
  return (
    <div className={S.wrapper}>
       {/* Layer 1: Blurred nature photograph */}
       <div 
          className={S.image}
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop')",
            filter: "blur(8px)" 
          }}
       />
       {/* Layer 2: Semi-transparent white wash for text contrast */}
       <div className={S.wash} />
       {/* Layer 3: Top-down gradient to brighten the header area */}
       <div className={S.gradient} />
    </div>
  );
}
