import { useEffect, useRef } from 'react';

interface LineChartProps {
  title: string;
  data: { date: string; count: number }[];
  className?: string;
}

export function LineChart({ title, data, className }: LineChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    if (data.length === 0) return;

    // Find max value for scaling
    const maxValue = Math.max(...data.map(d => d.count));
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;

    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0.1)');

    // Draw line
    ctx.strokeStyle = '#3B82F6';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    data.forEach((point, index) => {
      const x = padding + (index * chartWidth) / (data.length - 1);
      const y = padding + chartHeight - (point.count / maxValue) * chartHeight;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Fill area under curve
    ctx.lineTo(width - padding, height - padding);
    ctx.lineTo(padding, height - padding);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw data points
    ctx.fillStyle = '#3B82F6';
    data.forEach((point, index) => {
      const x = padding + (index * chartWidth) / (data.length - 1);
      const y = padding + chartHeight - (point.count / maxValue) * chartHeight;
      
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();
    });

    // Draw Y axis labels (numbers)
    ctx.font = '12px Cairo, sans-serif';
    ctx.fillStyle = '#a088c9'; // لون فاتح متناسق مع الثيم
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    const steps = 5;
    for (let i = 0; i <= steps; i++) {
      const value = Math.round((maxValue / steps) * i);
      const y = padding + chartHeight - (value / maxValue) * chartHeight;
      ctx.fillText(value.toString(), padding - 8, y);
    }

    // Draw X axis labels (dates)
    ctx.font = '12px Cairo, sans-serif';
    ctx.fillStyle = '#a088c9'; // لون فاتح متناسق مع الثيم
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    data.forEach((point, index) => {
      const x = padding + (index * chartWidth) / (data.length - 1);
      ctx.fillText(point.date, x, height - padding + 8);
    });
  }, [data]);

  return (
    <div className="glass-card border-0 p-6 rounded-3xl animate-fade-in" style={{ animationDelay: '0.5s' }}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      </div>
      <div className="chart-container p-4 rounded-xl">
        <canvas 
          ref={canvasRef} 
          width={400} 
          height={200} 
          className="w-full h-auto"
        />
      </div>
              <div className="flex justify-between text-sm text-muted-foreground mt-4">
        {data.map((point, index) => (
          <span key={index}>
            {new Date(point.date).toLocaleDateString('en-US', { weekday: 'short' })}
          </span>
        ))}
      </div>
    </div>
  );
}
