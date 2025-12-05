import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary-500 text-gray-950 shadow-[0_0_18px_rgba(106,91,255,0.45)]",
        secondary:
          "border-transparent bg-gray-800 text-gray-100",
        destructive:
          "border-transparent bg-error-600 text-white",
        outline: "text-gray-100 border-gray-700",
        success: "border-transparent bg-success-600 text-white",
        warning: "border-transparent bg-warning-600 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
