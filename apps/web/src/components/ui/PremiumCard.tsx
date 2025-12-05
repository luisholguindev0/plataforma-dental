import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PremiumCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function PremiumCard({
  children,
  className,
  hover = true,
  onClick,
}: PremiumCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "premium-card",
        hover && "cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}
