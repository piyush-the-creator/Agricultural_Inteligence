import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  accent?: "none" | "canopy" | "amber" | "danger";
}

export const Card: React.FC<CardProps> = ({
  className = "",
  accent = "none",
  children,
  ...props
}) => {
  const accentClasses = {
    none: "",
    canopy: "border-l-4 border-l-[#2D5A3C]",
    amber: "border-l-4 border-l-[#F5DE9C]",
    danger: "border-l-4 border-l-[#F3BEB2]",
  };

  return (
    <section
      className={`bg-white border border-[#E2E0D8] rounded p-5 shadow-none ${accentClasses[accent]} ${className}`}
      {...props}
    >
      {children}
    </section>
  );
};
