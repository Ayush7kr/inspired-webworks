import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8"
};

export function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
  return (
    <div className={cn(
      "loading-spinner", 
      sizeClasses[size],
      className
    )} />
  );
}

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={cn("skeleton h-4 w-full", className)} />
  );
}

export function CardSkeleton() {
  return (
    <div className="p-6 space-y-3 bg-white rounded-xl border border-border animate-pulse">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-8 w-1/2" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-2/3" />
    </div>
  );
}