import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressProps {
  value: number;
  max?: number;
  color?: "purple" | "green" | "blue" | "pink" | "amber";
  size?: "xs" | "sm" | "md";
  showLabel?: boolean;
  className?: string;
}

const colors = {
  purple: "bg-[#7c6af7]",
  green: "bg-[#22c55e]",
  blue: "bg-[#3b82f6]",
  pink: "bg-[#ec4899]",
  amber: "bg-[#f59e0b]",
};

const sizes = {
  xs: "h-1",
  sm: "h-1.5",
  md: "h-2",
};

export function Progress({ value, max = 100, color = "purple", size = "sm", showLabel, className }: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn("flex-1 bg-[#f0f0ea] rounded-full overflow-hidden", sizes[size])}>
        <div
          className={cn("h-full rounded-full transition-all duration-500", colors[color])}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs text-[#737373] w-8 text-right">{Math.round(pct)}%</span>
      )}
    </div>
  );
}
