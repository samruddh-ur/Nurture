import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "info" | "purple" | "pink" | "soft";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  dot?: boolean;
}

export function Badge({ className, variant = "default", dot, children, ...props }: BadgeProps) {
  const variants: Record<BadgeVariant, string> = {
    default: "bg-[#f5f5f0] text-[#737373]",
    success: "bg-[#f0fdf4] text-[#16a34a]",
    warning: "bg-[#fffbeb] text-[#d97706]",
    danger: "bg-[#fef2f2] text-[#dc2626]",
    info: "bg-[#eff6ff] text-[#2563eb]",
    purple: "bg-[#ede9fe] text-[#7c6af7]",
    pink: "bg-[#fdf2f8] text-[#c026d3]",
    soft: "bg-[#f5f5f0] text-[#1a1a2e]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium",
        variants[variant],
        className
      )}
      {...props}
    >
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-current flex-shrink-0" />
      )}
      {children}
    </span>
  );
}
