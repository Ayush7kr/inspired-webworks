import { cn } from "@/lib/utils";

interface MiniChartProps {
  data: number[];
  color: "primary" | "warning" | "success" | "secondary";
  type?: "bar" | "line";
}

const colorClasses = {
  primary: "bg-primary",
  warning: "bg-warning", 
  success: "bg-success",
  secondary: "bg-secondary",
};

export default function MiniChart({ data, color, type = "bar" }: MiniChartProps) {
  const maxValue = Math.max(...data);
  
  if (type === "bar") {
    return (
      <div className="flex items-end space-x-1 h-8 w-16">
        {data.map((value, index) => (
          <div
            key={index}
            className={cn(
              "flex-1 rounded-sm transition-all duration-300 hover:scale-110",
              colorClasses[color]
            )}
            style={{
              height: `${(value / maxValue) * 100}%`,
              minHeight: "2px"
            }}
          />
        ))}
      </div>
    );
  }

  // Line chart (simplified)
  return (
    <div className="relative h-8 w-16">
      <svg
        className="w-full h-full"
        viewBox="0 0 64 32"
        preserveAspectRatio="none"
      >
        <polyline
          fill="none"
          stroke={`hsl(var(--${color}))`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={data
            .map((value, index) => {
              const x = (index / (data.length - 1)) * 64;
              const y = 32 - (value / maxValue) * 32;
              return `${x},${y}`;
            })
            .join(" ")}
        />
      </svg>
    </div>
  );
}