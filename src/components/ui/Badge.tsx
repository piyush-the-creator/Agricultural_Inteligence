import React from "react";

export type BadgeVariant = "optimal" | "moderate" | "danger" | "neutral";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: "sm" | "md";
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  className = "",
  variant = "neutral",
  size = "md",
  dot = false,
  children,
  ...props
}) => {
  const variantStyles = {
    optimal: "bg-[#EBF5EE] text-[#1E5E2E] border-[#BCE3C5]",
    moderate: "bg-[#FFF9EB] text-[#875A00] border-[#F5DE9C]",
    danger: "bg-[#FDF0ED] text-[#992615] border-[#F3BEB2]",
    neutral: "bg-[#F2F4F3] text-[#2C3830] border-[#D3D8D5]",
  };

  const dotColors = {
    optimal: "bg-[#1E5E2E]",
    moderate: "bg-[#875A00]",
    danger: "bg-[#992615]",
    neutral: "bg-[#58635A]",
  };

  const sizeStyles = {
    sm: "text-[10px] px-1.5 py-0.5",
    md: "text-[11px] px-2 py-0.5",
  };

  return (
    <span
      className={`inline-flex items-center font-mono font-medium rounded border ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full mr-1.5 ${dotColors[variant]}`}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
};
