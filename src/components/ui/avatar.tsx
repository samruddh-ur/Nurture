import * as React from "react";
import { cn, getInitials } from "@/lib/utils";

interface AvatarProps {
  name?: string;
  src?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color?: string;
  className?: string;
}

const sizes = {
  xs: "h-6 w-6 text-xs",
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

const colors = [
  "from-purple-400 to-indigo-500",
  "from-pink-400 to-rose-500",
  "from-teal-400 to-cyan-500",
  "from-amber-400 to-orange-500",
  "from-green-400 to-emerald-500",
  "from-blue-400 to-violet-500",
];

function getColor(name?: string): string {
  if (!name) return colors[0];
  const idx = name.charCodeAt(0) % colors.length;
  return colors[idx];
}

export function Avatar({ name, src, size = "md", className }: AvatarProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={name || "avatar"}
        className={cn("rounded-full object-cover flex-shrink-0", sizes[size], className)}
      />
    );
  }

  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center font-semibold text-white bg-gradient-to-br flex-shrink-0",
        getColor(name),
        sizes[size],
        className
      )}
    >
      {getInitials(name || "U")}
    </div>
  );
}
