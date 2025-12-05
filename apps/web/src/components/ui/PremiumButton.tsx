import { ReactNode, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

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
  const baseClasses = "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none";
  
  const variants = {
    primary: "btn-premium text-white",
    secondary: "bg-[var(--luxury-gray-100)] text-[var(--luxury-gray-900)] hover:bg-[var(--luxury-gray-200)] border border-[var(--luxury-gray-200)]",
    outline: "bg-transparent text-[var(--gold-primary)] border-2 border-[var(--gold-primary)] hover:bg-[var(--gold-primary)] hover:text-white",
  };

  return (
    <button
      className={cn(
        baseClasses,
        variants[variant],
        fullWidth && "w-full",
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 size={18} className="animate-spin" />}
      {children}
    </button>
  );
}
