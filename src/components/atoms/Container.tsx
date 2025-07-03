import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Container Component - Atomic Design Level
 * 
 * Enterprise-ready container system with:
 * - Mobile-first responsive design
 * - Consistent max-widths and padding
 * - Fluid width options
 * - Accessibility considerations
 */

const containerVariants = cva("w-full mx-auto", {
  variants: {
    size: {
      // Standard container sizes
      sm: "max-w-screen-sm", // 640px
      md: "max-w-screen-md", // 768px
      lg: "max-w-screen-lg", // 1024px
      xl: "max-w-screen-xl", // 1280px
      "2xl": "max-w-screen-2xl", // 1536px
      
      // Content-specific sizes
      prose: "max-w-prose", // ~65ch for optimal reading
      "3xl": "max-w-3xl", // 768px
      "4xl": "max-w-4xl", // 896px
      "5xl": "max-w-5xl", // 1024px
      "6xl": "max-w-6xl", // 1152px
      "7xl": "max-w-7xl", // 1280px
      
      // Full width options
      full: "max-w-full",
      none: "max-w-none",
    },
    
    padding: {
      none: "",
      xs: "px-2 sm:px-4", // 8px mobile, 16px tablet+
      sm: "px-4 sm:px-6", // 16px mobile, 24px tablet+
      md: "px-4 sm:px-6 lg:px-8", // 16px mobile, 24px tablet, 32px desktop
      lg: "px-6 sm:px-8 lg:px-12", // 24px mobile, 32px tablet, 48px desktop
      xl: "px-8 sm:px-12 lg:px-16", // 32px mobile, 48px tablet, 64px desktop
    },
    
    verticalPadding: {
      none: "",
      xs: "py-2 sm:py-4", // 8px mobile, 16px tablet+
      sm: "py-4 sm:py-6", // 16px mobile, 24px tablet+
      md: "py-6 sm:py-8 lg:py-12", // 24px mobile, 32px tablet, 48px desktop
      lg: "py-8 sm:py-12 lg:py-16", // 32px mobile, 48px tablet, 64px desktop
      xl: "py-12 sm:py-16 lg:py-24", // 48px mobile, 64px tablet, 96px desktop
    },
  },
  
  defaultVariants: {
    size: "xl",
    padding: "md",
    verticalPadding: "none",
  },
});

interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  as?: React.ElementType;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, padding, verticalPadding, as: Component = "div", ...props }, ref) => {
    return (
      <Component
        className={cn(containerVariants({ size, padding, verticalPadding, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Container.displayName = "Container";

export { Container, containerVariants };
export type { ContainerProps };