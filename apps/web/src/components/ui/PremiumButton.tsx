import { ReactNode, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PremiumButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  isLoading?: boolean;
  fullWidth?: boolean;
}

export default function PremiumButton({
  children,
  variant = "primary",
  isLoading = false,
  fullWidth = false,
  className,
  disabled,
  ...props
}: PremiumButtonProps) {
  const buttonVariant = variant === "primary" ? "default" : variant === "secondary" ? "secondary" : "outline";

  return (
    <Button
      className={cn(
        fullWidth && "w-full",
        className
      )}
      variant={buttonVariant}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 size={18} className="animate-spin" />}
      {children}
    </Button>
  );
}
