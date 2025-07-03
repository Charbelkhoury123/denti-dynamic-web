import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Grid Component - Atomic Design Level
 * 
 * Enterprise-ready grid system with:
 * - Mobile-first responsive columns
 * - Consistent gap spacing
 * - Auto-fit and auto-fill options
 * - Accessibility support
 */

const gridVariants = cva("grid", {
  variants: {
    cols: {
      1: "grid-cols-1",
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
      5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
      6: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
      12: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-12",
      
      // Auto-responsive options
      "auto-fit": "grid-cols-[repeat(auto-fit,_minmax(280px,_1fr))]",
      "auto-fill": "grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))]",
      
      // Fixed responsive breakpoints
      "sm-2": "grid-cols-1 sm:grid-cols-2",
      "md-3": "grid-cols-1 md:grid-cols-3",
      "lg-4": "grid-cols-1 lg:grid-cols-4",
      "xl-5": "grid-cols-1 xl:grid-cols-5",
    },
    
    gap: {
      none: "gap-0",
      xs: "gap-2", // 8px
      sm: "gap-3", // 12px
      md: "gap-4", // 16px
      lg: "gap-6", // 24px
      xl: "gap-8", // 32px
      "2xl": "gap-12", // 48px
      
      // Responsive gaps
      "responsive-sm": "gap-2 sm:gap-4",
      "responsive-md": "gap-3 sm:gap-4 lg:gap-6",
      "responsive-lg": "gap-4 sm:gap-6 lg:gap-8",
    },
    
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    },
    
    justify: {
      start: "justify-items-start",
      center: "justify-items-center",
      end: "justify-items-end",
      stretch: "justify-items-stretch",
    },
  },
  
  defaultVariants: {
    cols: 1,
    gap: "md",
    align: "stretch",
    justify: "stretch",
  },
});

interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {
  as?: React.ElementType;
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols, gap, align, justify, as: Component = "div", ...props }, ref) => {
    return (
      <Component
        className={cn(gridVariants({ cols, gap, align, justify, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Grid.displayName = "Grid";

export { Grid, gridVariants };
export type { GridProps };