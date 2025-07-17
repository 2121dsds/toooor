
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  isLoading: boolean;
  onComplete: () => void;
}

export function LoadingScreen({ isLoading, onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(onComplete, 500);
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 150);

      return () => clearInterval(interval);
    }
  }, [isLoading, onComplete]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#FF0080] via-[#FFD6FF] to-[#C6ACFF] dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
      
      {/* 3D Floating Elements */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-slow opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          >
            <div className="w-4 h-4 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full blur-sm"></div>
          </div>
        ))}
      </div>

      {/* Main Loading Content */}
      <div className="relative z-10 text-center space-y-8">
        {/* 3D Logo */}
        <div className="relative">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[#A259FF] to-[#FF66C4] rounded-3xl flex items-center justify-center shadow-2xl animate-pulse">
            <div className="w-12 h-12 bg-white/20 rounded-2xl backdrop-blur-sm animate-spin-slow">
              <div className="w-full h-full bg-gradient-to-br from-white/40 to-transparent rounded-2xl"></div>
            </div>
          </div>
                      <div className="absolute -inset-4 bg-gradient-to-br from-[#A259FF]/20 to-[#FF66C4]/20 rounded-full blur-xl animate-pulse"></div>
        </div>

        {/* Loading Text */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-fade-in">
            Loading Experience
          </h1>
          <p className="text-muted-foreground animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Preparing your dashboard...
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-80 mx-auto space-y-2">
          <div className="glass-card h-2 bg-white/10 dark:bg-black/10 rounded-full overflow-hidden backdrop-blur-sm">
            <div 
                              className="h-full bg-gradient-to-r from-[#A259FF] to-[#FF66C4] rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            {Math.round(progress)}%
          </div>
        </div>

        {/* Loading Animation */}
        <div className="flex items-center justify-center space-x-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
                              className="w-3 h-3 bg-gradient-to-br from-[#A259FF] to-[#FF66C4] rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
