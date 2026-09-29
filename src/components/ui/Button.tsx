import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "destructive";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", isLoading = false, disabled, children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium font-sans rounded transition-colors touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5A3C] focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none";

    const variantStyles = {
      primary: "bg-[#2D5A3C] text-white hover:bg-[#244730] active:bg-[#1E3B27] border-0",
      secondary: "bg-white text-[#1B241E] border border-[#E2E0D8] hover:bg-[#F4F5F2] active:bg-[#EAEBE7]",
      tertiary: "bg-transparent text-[#58635A] hover:text-[#1B241E] hover:underline border-0",
      destructive: "bg-white text-[#992615] border border-[#F3BEB2] hover:bg-[#FDF0ED] active:bg-[#FBE3DE]",
    };

    const sizeStyles = {
      sm: "h-8 px-2.5 text-xs",
      md: "h-9 sm:h-[38px] px-3.5 text-xs sm:text-[13px]",
      lg: "h-11 px-5 text-sm",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-3.5 w-3.5 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        <span className={isLoading ? "opacity-50" : ""}>{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";
