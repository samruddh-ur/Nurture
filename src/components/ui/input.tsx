import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, leftIcon, rightElement, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-[#1a1a2e]">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 text-[#a0a0b8] pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full h-11 rounded-xl bg-[#f5f5f0] border border-transparent px-3.5 text-sm text-[#1a1a2e] placeholder:text-[#a0a0b8]",
              "transition-all duration-150",
              "focus:outline-none focus:bg-white focus:border-[#7c6af7] focus:ring-2 focus:ring-[#7c6af7]/15",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              error && "border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-200",
              leftIcon && "pl-10",
              rightElement && "pr-10",
              className
            )}
            {...props}
          />
          {rightElement && (
            <div className="absolute right-3 text-[#a0a0b8]">
              {rightElement}
            </div>
          )}
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
        {hint && !error && <p className="text-xs text-[#a0a0b8]">{hint}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";
