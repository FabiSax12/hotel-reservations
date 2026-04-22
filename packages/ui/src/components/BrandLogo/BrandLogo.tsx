/**
 * @file Brand.tsx — Reusable branding component for displaying the logo/name.
 */

"use client";

interface BrandLogoProps {
  name: string;
  highlight: string;
  onClick?: () => void;
  className?: string;
  highlightClassName?: string;
}

export function BrandLogo({ 
  name, 
  highlight, 
  onClick, 
  className = "text-2xl font-black text-emerald-950 tracking-tighter cursor-pointer select-none",
  highlightClassName = "text-emerald-600"
}: BrandLogoProps) {
  return (
    <div className={className} onClick={onClick}>
      {name}
      <span className={highlightClassName}>{highlight}</span>
    </div>
  );
}
