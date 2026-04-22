/**
 * @file Button.tsx — A flexible, reusable button component.
 */

"use client";

import { ReactNode } from "react";
import { BUTTON_STYLES as S } from "./Button.theme";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: keyof typeof S.variants;
  size?: keyof typeof S.sizes;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

export function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled = false,
  className = "",
  type = "button",
  icon,
  iconPosition = "right",
}: ButtonProps) {
  const variantClass = S.variants[variant];
  const sizeClass = S.sizes[size];
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${S.base} ${variantClass} ${sizeClass} ${className}`}
    >
      {isLoading && (
        <svg 
          className={S.spinner} 
          fill="none" 
          viewBox={S.icons.spinner.viewBox}
        >
          <circle 
            className="opacity-25" 
            cx={S.icons.spinner.circle.cx} 
            cy={S.icons.spinner.circle.cy} 
            r={S.icons.spinner.circle.r} 
            stroke="currentColor" 
            strokeWidth={S.icons.spinner.circle.strokeWidth}
          />
          <path className="opacity-75" fill="currentColor" d={S.icons.spinner.path} />
        </svg>
      )}
      
      {!isLoading && icon && iconPosition === "left" && <span className={S.iconLeft}>{icon}</span>}
      <span>{children}</span>
      {!isLoading && icon && iconPosition === "right" && <span className={S.iconRight}>{icon}</span>}
    </button>
  );
}
