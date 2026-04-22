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
        <svg className={`${S.spinner} w-5 h-5`} fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      
      {!isLoading && icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
      <span>{children}</span>
      {!isLoading && icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
    </button>
  );
}
