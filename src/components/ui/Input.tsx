import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  unit?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, helperText, error, unit, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold text-[#1B241E] mb-1">
            {label}
          </label>
        )}
        <div className="flex relative rounded">
          <input
            id={inputId}
            ref={ref}
            className={`w-full h-10 px-3 border text-sm bg-white text-[#1B241E] placeholder-[#828E84] transition-colors focus:outline-none focus:border-[#2D5A3C] focus:ring-2 focus:ring-[#2D5A3C]/20 ${
              unit ? "rounded-l" : "rounded"
            } ${
              error
                ? "border-[#F3BEB2] bg-[#FDF0ED] focus:border-[#992615]"
                : "border-[#E2E0D8]"
            } ${className}`}
            {...props}
          />
          {unit && (
            <span className="inline-flex items-center px-3 border border-l-0 border-[#E2E0D8] bg-[#F4F5F2] text-xs font-mono text-[#58635A] rounded-r select-none">
              {unit}
            </span>
          )}
        </div>
        {error && <p className="text-[11px] text-[#992615] mt-1">{error}</p>}
        {helperText && !error && <p className="text-[11px] text-[#58635A] mt-1">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
