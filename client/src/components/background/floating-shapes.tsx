import { useEffect, useState } from "react";

interface FloatingShape {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
  shape: 'circle' | 'square' | 'triangle' | 'hexagon' | 'blob';
  opacity: number;
  color: string;
}

export function FloatingShapes() {
  const [shapes, setShapes] = useState<FloatingShape[]>([]);

  useEffect(() => {
    const createShapes = () => {
      const newShapes: FloatingShape[] = [];
      const shapeTypes: FloatingShape['shape'][] = ['circle', 'square', 'triangle', 'hexagon', 'blob'];
      const colors = [
        'from-[#FF0080]/40 to-[#FFD6FF]/40',
        'from-[#FFD6FF]/40 to-[#C6ACFF]/40', 
        'from-[#C6ACFF]/40 to-[#FF0080]/40',
        'from-[#FF0080]/30 to-[#FFD6FF]/30',
        'from-[#FFD6FF]/30 to-[#C6ACFF]/30'
      ];

      for (let i = 0; i < 12; i++) {
        newShapes.push({
          id: i,
          size: Math.random() * 150 + 60,
          x: Math.random() * 100,
          y: Math.random() * 100,
          duration: Math.random() * 20 + 15,
          delay: Math.random() * 5,
          shape: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
          opacity: Math.random() * 0.25 + 0.15,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
      setShapes(newShapes);
    };

    createShapes();
  }, []);

  const getShapeElement = (shape: FloatingShape) => {
    const baseClasses = "absolute";
    const sizeStyle = {
      width: `${shape.size}px`,
      height: `${shape.size}px`,
      left: `${shape.x}%`,
      top: `${shape.y}%`,
      animationDuration: `${shape.duration}s`,
      animationDelay: `${shape.delay}s`,
      opacity: shape.opacity,
    };

    switch (shape.shape) {
      case 'circle':
        return (
          <div
            key={shape.id}
            className={`${baseClasses} rounded-full bg-gradient-to-br ${shape.color} animate-float-slow border border-white/20 backdrop-blur-sm`}
            style={sizeStyle}
          />
        );
      case 'square':
        return (
          <div
            key={shape.id}
            className={`${baseClasses} rounded-3xl bg-gradient-to-br ${shape.color} animate-float-reverse border border-white/20 backdrop-blur-sm`}
            style={sizeStyle}
          />
        );
      case 'triangle':
        return (
          <div
            key={shape.id}
            className={`${baseClasses} animate-float border border-white/20 backdrop-blur-sm`}
            style={{
              ...sizeStyle,
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              background: `linear-gradient(135deg, ${shape.color.includes('purple') ? 'rgba(168, 85, 247, 0.4)' : 'rgba(236, 72, 153, 0.4)'}, ${shape.color.includes('pink') ? 'rgba(236, 72, 153, 0.4)' : 'rgba(251, 146, 60, 0.4)'})`,
            }}
          />
        );
      case 'hexagon':
        return (
          <div
            key={shape.id}
            className={`${baseClasses} animate-pulse-slow border border-white/20 backdrop-blur-sm`}
            style={{
              ...sizeStyle,
              clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
              background: `linear-gradient(135deg, ${shape.color.includes('orange') ? 'rgba(251, 146, 60, 0.4)' : 'rgba(168, 85, 247, 0.4)'}, ${shape.color.includes('yellow') ? 'rgba(251, 191, 36, 0.4)' : 'rgba(236, 72, 153, 0.4)'})`,
            }}
          />
        );
      case 'blob':
        return (
          <div
            key={shape.id}
            className={`${baseClasses} animate-morphing bg-gradient-to-br ${shape.color} border border-white/20 backdrop-blur-sm`}
            style={{
              ...sizeStyle,
              borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {shapes.map(getShapeElement)}

      {/* Large gradient orbs matching the image */}
      <div className="absolute top-1/4 left-1/4 w-60 h-60 rounded-full bg-gradient-to-br from-purple-400/30 to-pink-400/30 animate-float-slow border border-white/20 backdrop-blur-sm" />
      <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-gradient-to-br from-pink-400/30 to-orange-400/30 animate-float-reverse border border-white/20 backdrop-blur-sm" />
      <div className="absolute top-1/2 right-1/3 w-36 h-36 rounded-full bg-gradient-to-br from-orange-400/30 to-yellow-400/30 animate-float border border-white/20 backdrop-blur-sm" />
      <div className="absolute top-3/4 left-1/3 w-40 h-40 rounded-full bg-gradient-to-br from-purple-500/25 to-blue-500/25 animate-pulse-slow border border-white/20 backdrop-blur-sm" />

      {/* Additional decorative elements */}
      <div className="absolute top-1/6 right-1/6 w-20 h-20 rounded-full bg-gradient-to-br from-pink-300/40 to-purple-300/40 animate-bounce-slow border border-white/20 backdrop-blur-sm" />
      <div className="absolute bottom-1/4 left-1/6 w-24 h-24 rounded-full bg-gradient-to-br from-orange-300/40 to-yellow-300/40 animate-float-slow border border-white/20 backdrop-blur-sm" />

      {/* Professional 3D Vectors */}
      <div className="vector-3d-audio" />
      <div className="vector-3d-tech" />
      <div className="vector-3d-network" />
      <div className="vector-3d-brain" />
      <div className="vector-3d-database" />
      <div className="vector-3d-chat" />
      <div className="vector-3d-circuit" />
      <div className="vector-3d-data" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
    </div>
  );
}