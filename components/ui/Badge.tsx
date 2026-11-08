import React from "react";
import { cn } from "@/lib/utils/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "teal" | "warning" | "neutral" | "outline";
  size?: "sm" | "md";
}

export function Badge({
  children,
  className,
  variant = "default",
  size = "md",
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: "bg-surface-card text-slate-300 border border-border-subtle",
    teal: "bg-groww-subtle text-groww border border-groww/20",
    warning: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    neutral: "bg-slate-800 text-slate-300 border border-slate-700",
    outline: "border border-border text-slate-400",
  };

  const sizeStyles = {
    sm: "text-xs px-2 py-0.5 rounded-full font-medium",
    md: "text-xs px-2.5 py-1 rounded-full font-medium",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 transition-colors",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
