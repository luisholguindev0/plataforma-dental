import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "premium";
}

export default function GlassPanel({
  children,
  className,
  variant = "default",
}: GlassPanelProps) {
  const variantClasses = {
    default: "glass-panel",
    premium: "glass-panel-premium",
  };

  return (
    <div className={cn(variantClasses[variant], className)}>
      {children}
    </div>
  );
}
