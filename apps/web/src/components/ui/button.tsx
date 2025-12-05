import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-60 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-primary-500 via-primary-400 to-secondary-500 text-gray-950 shadow-[0_10px_40px_-12px_rgba(106,91,255,0.55)] hover:scale-[1.01] hover:shadow-[0_18px_50px_-18px_rgba(39,197,255,0.55)] active:translate-y-[1px]",
        destructive:
          "bg-error-600 text-white shadow-sm hover:bg-error-500 hover:shadow-[0_14px_30px_-16px_rgba(239,68,68,0.5)] active:bg-error-700",
        outline:
          "border border-primary-500/70 bg-primary-500/10 text-primary-100 hover:bg-primary-500/16 hover:border-primary-400 active:border-primary-300",
        secondary:
          "bg-gray-800 text-gray-50 border border-gray-700 shadow-sm hover:bg-gray-700 hover:border-gray-600 active:bg-gray-800/90",
        ghost:
          "text-gray-200 hover:bg-gray-800 hover:text-white active:bg-gray-700",
        link: "text-primary-200 underline-offset-4 hover:text-primary-100 hover:underline",
      },
      size: {
        default: "h-11 min-h-[44px] px-6 py-2.5",
        sm: "h-9 min-h-[40px] rounded-md px-4 text-xs",
        lg: "h-12 min-h-[48px] rounded-xl px-8 text-base",
        icon: "h-11 w-11 min-h-[44px] min-w-[44px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
