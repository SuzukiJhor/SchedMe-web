import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const checkboxVariants = cva(
  `
    peer size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow
    border-input dark:bg-input/30
    focus-visible:ring-[3px] focus-visible:border-ring focus-visible:ring-ring/50
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
    },
    defaultVariants: {
      variant: "primary",
    },
  }
)

export interface CheckboxProps
  extends React.ComponentProps<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {}

export function Checkbox({ className, variant, ...props }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(checkboxVariants({ variant }), className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}
