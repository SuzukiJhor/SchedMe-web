import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const checkboxVariants = cva(
  `
    inline-flex items-center justify-center
    shrink-0 rounded-sm border shadow-sm transition-shadow
    dark:bg-neutral-200
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring
    disabled:cursor-not-allowed disabled:opacity-50
    aria-invalid:ring-destructive/20 aria-invalid:border-destructive
  `,
  {
    variants: {
      variant: {
        primary: `
          data-[state=checked]:bg-primary
          data-[state=checked]:border-primary
          data-[state=checked]:text-primary-foreground
        `,
        success: `
          data-[state=checked]:bg-green-600
          data-[state=checked]:border-green-600
          data-[state=checked]:text-white
        `,
        danger: `
          data-[state=checked]:bg-red-600
          data-[state=checked]:border-red-600
          data-[state=checked]:text-white
        `,
        warning: `
          data-[state=checked]:bg-yellow-500
          data-[state=checked]:border-yellow-500
          data-[state=checked]:text-white
        `,
        info: `
          data-[state=checked]:bg-blue-600
          data-[state=checked]:border-blue-600
          data-[state=checked]:text-white
        `,
      },
      size: {
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {}

export const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <CheckboxPrimitive.Root
        ref={ref}
        className={cn(checkboxVariants({ variant, size }), className)}
        {...props}
      >
        <CheckboxPrimitive.Indicator className="grid place-items-center">
          <Check className={cn(size === "sm" ? "w-3 h-3" : size === "lg" ? "w-4 h-4" : "w-3.5 h-3.5")} />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );
  }
);

Checkbox.displayName = "Checkbox";
