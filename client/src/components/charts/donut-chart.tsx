import { useEffect, useRef } from 'react';

interface DonutChartProps {
  title: string;
  data: { type: string; count: number; color: string }[];
  className?: string;
}

export function DonutChart({ title, data, className }: DonutChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 80;
    const innerRadius = 30;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (data.length === 0) return;

    const total = data.reduce((sum, item) => sum + item.count, 0);
    let currentAngle = -Math.PI / 2;

    data.forEach((item) => {
      const sliceAngle = (item.count / total) * 2 * Math.PI;
      
      // Draw outer arc
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
      ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true);
      ctx.closePath();
      ctx.fillStyle = item.color;
      ctx.fill();
      
      currentAngle += sliceAngle;
    });
  }, [data]);

  return (
    <div className="glass-card border-0 p-6 rounded-3xl animate-fade-in" style={{ animationDelay: '0.6s' }}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      </div>
      <div className="chart-container p-4 rounded-xl flex items-center justify-center">
        <canvas 
          ref={canvasRef} 
          width={200} 
          height={200} 
          className="w-auto h-auto"
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: item.color }}
            ></div>
            <span className="text-sm text-muted-foreground capitalize">{item.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
