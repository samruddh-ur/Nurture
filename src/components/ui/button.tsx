"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "danger" | "soft";
  size?: "sm" | "md" | "lg" | "icon";
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, children, disabled, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none";

    const variants = {
      primary:
        "bg-[#7c6af7] text-white hover:bg-[#6a58e5] active:scale-95 shadow-sm shadow-[#7c6af7]/20 focus-visible:ring-[#7c6af7]",
      secondary:
        "bg-[#f0fdf4] text-[#166534] hover:bg-[#dcfce7] active:scale-95 focus-visible:ring-green-500",
      ghost:
        "bg-transparent text-[#737373] hover:bg-[#f5f5f0] hover:text-[#1a1a2e] active:scale-95",
      outline:
        "bg-transparent border border-[#e8e8e0] text-[#1a1a2e] hover:bg-[#f5f5f0] active:scale-95",
      danger:
        "bg-red-50 text-red-600 hover:bg-red-100 active:scale-95 focus-visible:ring-red-500",
      soft:
        "bg-[#ede9fe] text-[#7c6af7] hover:bg-[#ddd6fe] active:scale-95 focus-visible:ring-[#7c6af7]",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-6 text-base",
      icon: "h-10 w-10 p-0",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
