import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 backdrop-blur-md border border-white/10",
  {
    variants: {
      variant: {
        default: "bg-white/10 text-white hover:bg-white/20 hover:scale-105 shadow-lg hover:shadow-xl",
        destructive:
          "bg-red-500/20 text-red-100 hover:bg-red-500/30 border-red-500/20",
        outline:
          "border-white/20 bg-white/5 hover:bg-white/10 text-white hover:scale-105",
        secondary:
          "bg-black/20 text-white hover:bg-black/30 border-black/10",
        ghost: "hover:bg-white/10 text-white hover:scale-105",
        link: "text-white underline-offset-4 hover:underline hover:scale-105",
        glass: "bg-white/5 text-white hover:bg-white/10 border-white/10 hover:border-white/20 hover:scale-105",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 rounded-xl px-4",
        lg: "h-14 rounded-2xl px-10",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
