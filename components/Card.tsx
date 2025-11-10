import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`rounded-lg border border-border bg-background p-6 transition-all hover:border-primary/30 hover:shadow-sm ${className}`}>
      {children}
    </div>
  );
}
