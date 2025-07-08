import React from "react";
import { cn } from "@/lib/utils";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        "relative flex flex-col h-[100vh] items-center justify-center bg-zinc-50 dark:bg-zinc-900 text-slate-950 transition-bg",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            "aurora-gradient-vars aurora-background dark:aurora-background-dark pointer-events-none absolute -inset-[10px] opacity-50 will-change-transform",
            "after:aurora-after dark:after:aurora-after-dark",
            showRadialGradient && "aurora-mask-radial"
          )}
        ></div>
      </div>
      {children}
    </div>
  );
};