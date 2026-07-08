import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 rounded-full font-bold",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-br from-[#2F7FD1] to-[#2E86DE] text-white shadow-[0_8px_20px_rgba(47,127,209,0.28)] hover:from-[#1F6FC0] hover:to-[#2F7FD1] hover:-translate-y-[2px] hover:shadow-[0_12px_28px_rgba(47,127,209,0.34)] active:translate-y-0 active:shadow-[0_4px_12px_rgba(47,127,209,0.2)]",
        secondary:
          "bg-white text-[#00275F] border border-[#00275F]/[0.16] shadow-[0_4px_12px_rgba(0,39,95,0.08)] hover:bg-[#EAF5FF] hover:border-[#2F7FD1]/[0.35] hover:-translate-y-[1px] hover:shadow-[0_8px_18px_rgba(0,39,95,0.12)]",
        outline:
          "bg-[rgba(255,255,255,0.72)] text-[#00275F] border border-[#00275F]/[0.12] shadow-sm hover:bg-[#EAF5FF] hover:border-[#2F7FD1]/[0.28] hover:-translate-y-[1px]",
        ghost: 
          "hover:bg-[#EAF5FF] hover:text-[#00275F] text-muted-foreground",
        destructive:
          "bg-white text-[#D9534F] border border-[#D9534F]/[0.32] hover:bg-red-50",
        link: 
          "text-[#2F7FD1] underline-offset-4 hover:underline hover:text-[#00275F] bg-transparent !shadow-none !p-0 !h-auto",
        adminPrimary:
          "bg-gradient-to-br from-[#2F7FD1] to-[#2E86DE] text-white shadow-sm hover:opacity-90 active:scale-95",
        adminSecondary:
          "bg-white text-[#00275F] border border-[#00275F]/[0.16] hover:bg-gray-50",
      },
      size: {
        default: "h-[42px] px-[24px]",
        sm: "h-[36px] px-[16px] text-xs",
        lg: "h-[50px] px-[32px] text-base",
        icon: "h-10 w-10",
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
