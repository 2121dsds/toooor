import { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  delay?: number;
  iconColor?: string;
}

export function MetricCard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  delay = 0,
  iconColor = "from-primary to-blue-600"
}: MetricCardProps) {
  return (
    <div 
      className="glass-card border-0 p-6 rounded-3xl" 
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${iconColor} rounded-xl flex items-center justify-center animate-float`}>
          <Icon className="w-6 h-6 text-foreground" />
        </div>
        <span className="text-2xl font-bold text-foreground animate-glow">
          {value}
        </span>
      </div>
              <h3 className="text-muted-foreground font-medium">{title}</h3>
      {trend && (
        <div className={`mt-2 text-sm flex items-center ${
          trend.isPositive ? 'text-green-500' : 'text-red-500'
        }`}>
          {trend.isPositive ? (
            <TrendingUp className="w-4 h-4 mr-1" />
          ) : (
            <TrendingDown className="w-4 h-4 mr-1" />
          )}
          {Math.abs(trend.value)}% from yesterday
        </div>
      )}
    </div>
  );
}
