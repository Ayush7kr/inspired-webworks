import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  color: "primary" | "warning" | "success" | "secondary";
  icon?: ReactNode;
  chart?: ReactNode;
  className?: string;
}

const colorClasses = {
  primary: "border-primary/20 hover:border-primary/40",
  warning: "border-warning/20 hover:border-warning/40",
  success: "border-success/20 hover:border-success/40",
  secondary: "border-secondary/20 hover:border-secondary/40",
};

const trendColors = {
  up: "text-success",
  down: "text-danger",
};

export default function StatCard({
  title,
  value,
  change,
  trend,
  color,
  icon,
  chart,
  className
}: StatCardProps) {
  return (
    <div className={cn(
      "relative p-6 bg-white rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-medium group animate-fade-in",
      colorClasses[color],
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {icon && (
          <div className="p-2 rounded-lg bg-muted group-hover:scale-110 transition-transform">
            {icon}
          </div>
        )}
      </div>

      {/* Value */}
      <div className="mb-3">
        <p className="text-3xl font-bold text-foreground">{value}</p>
      </div>

      {/* Trend */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          {trend === "up" ? (
            <TrendingUp className="w-4 h-4 text-success" />
          ) : (
            <TrendingDown className="w-4 h-4 text-danger" />
          )}
          <span className={cn("text-sm font-medium", trendColors[trend])}>
            {change}
          </span>
        </div>
        {chart && (
          <div className="flex-shrink-0">
            {chart}
          </div>
        )}
      </div>

      {/* Hover effect */}
      <div className={cn(
        "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300",
        color === "primary" && "bg-primary",
        color === "warning" && "bg-warning",
        color === "success" && "bg-success",
        color === "secondary" && "bg-secondary"
      )} />
    </div>
  );
}