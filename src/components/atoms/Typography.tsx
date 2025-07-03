import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Typography Component - Atomic Design Level
 * 
 * Enterprise-ready typography system with:
 * - Semantic HTML elements for accessibility
 * - Consistent spacing and sizing
 * - WCAG 2.1 AA compliant contrast ratios
 * - Mobile-first responsive design
 */

const typographyVariants = cva("", {
  variants: {
    variant: {
      // Headings - Semantic and accessible
      h1: "scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      h5: "scroll-m-20 text-lg font-semibold tracking-tight",
      h6: "scroll-m-20 text-base font-semibold tracking-tight",
      
      // Body text variants
      body: "leading-7 [&:not(:first-child)]:mt-6",
      "body-sm": "text-sm leading-6 [&:not(:first-child)]:mt-4",
      "body-lg": "text-lg leading-8 [&:not(:first-child)]:mt-6",
      
      // Specialized text
      lead: "text-xl text-muted-foreground leading-8",
      subtitle: "text-lg text-muted-foreground leading-7",
      caption: "text-sm text-muted-foreground leading-5",
      overline: "text-xs font-medium uppercase tracking-wider text-muted-foreground",
      
      // Interactive text
      link: "font-medium text-primary underline underline-offset-4 hover:text-primary-hover transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
      
      // Special cases
      blockquote: "mt-6 border-l-2 pl-6 italic border-primary-200",
      code: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
      
      // Lists
      list: "my-6 ml-6 list-disc [&>li]:mt-2",
      "list-ordered": "my-6 ml-6 list-decimal [&>li]:mt-2",
    },
    
    color: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      primary: "text-primary",
      secondary: "text-secondary-foreground",
      destructive: "text-destructive",
      success: "text-success",
      warning: "text-warning-foreground",
      info: "text-info-foreground",
    },
    
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    },
    
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
  },
  
  defaultVariants: {
    variant: "body",
    color: "default",
    align: "left",
    weight: "normal",
  },
});

interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    VariantProps<typeof typographyVariants> {
  as?: React.ElementType;
  children: React.ReactNode;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, color, align, weight, as, children, ...props }, ref) => {
    // Map variants to semantic HTML elements
    const getSemanticElement = () => {
      if (as) return as;
      
      switch (variant) {
        case "h1": return "h1";
        case "h2": return "h2";
        case "h3": return "h3";
        case "h4": return "h4";
        case "h5": return "h5";
        case "h6": return "h6";
        case "lead": return "p";
        case "subtitle": return "p";
        case "body": return "p";
        case "body-sm": return "p";
        case "body-lg": return "p";
        case "caption": return "span";
        case "overline": return "span";
        case "link": return "a";
        case "blockquote": return "blockquote";
        case "code": return "code";
        case "list": return "ul";
        case "list-ordered": return "ol";
        default: return "p";
      }
    };

    const Component = getSemanticElement();

    return (
      <Component
        className={cn(typographyVariants({ variant, color, align, weight, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Typography.displayName = "Typography";

export { Typography, typographyVariants };
export type { TypographyProps };