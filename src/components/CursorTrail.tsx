import React, { useEffect, useState } from 'react';

interface TrailPoint {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
}

export const CursorTrail: React.FC = () => {
  const [points, setPoints] = useState<TrailPoint[]>([]);
  const [isEnabled, setIsEnabled] = useState<boolean>(true);

  useEffect(() => {
    // Disable on touch devices or reduced motion
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) {
      setIsEnabled(false);
      return;
    }

    let pointId = 0;
    const handleMouseMove = (e: MouseEvent) => {
      // Create subtle sparkle trailing particle
      pointId++;
      const newPoint: TrailPoint = {
        id: pointId,
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 6 + 4,
        opacity: 0.85,
      };

      setPoints((prev) => [...prev.slice(-12), newPoint]);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Fade interval
    const interval = setInterval(() => {
      setPoints((prev) =>
        prev
          .map((p) => ({ ...p, opacity: p.opacity - 0.08, size: Math.max(0, p.size - 0.3) }))
          .filter((p) => p.opacity > 0)
      );
    }, 45);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  if (!isEnabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {points.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full -translate-x-1/2 -translate-y-1/2 transition-opacity"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: '#E9D5FF',
            boxShadow: '0 0 10px #C084FC, 0 0 16px #F472B6',
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
};
