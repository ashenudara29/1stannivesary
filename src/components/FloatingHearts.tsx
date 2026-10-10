import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

interface FloatingHeartsProps {
  intensity?: 'low' | 'medium' | 'high';
}

export const triggerHeartBurst = (originX: number = 0.5, originY: number = 0.5) => {
  // Romantic heart and star burst
  confetti({
    particleCount: 35,
    spread: 60,
    origin: { x: originX, y: originY },
    colors: ['#F472B6', '#C084FC', '#E879F9', '#DDD6FE', '#FBCFE8', '#FFF1F2'],
    shapes: ['circle'],
    ticks: 180,
    gravity: 0.7,
    scalar: 1.2,
    drift: 0.1,
  });
};

export const FloatingHearts: React.FC<FloatingHeartsProps> = ({ intensity = 'medium' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const count = intensity === 'low' ? 18 : intensity === 'medium' ? 32 : 48;

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      fadeSpeed: number;
      type: 'heart' | 'star' | 'circle';
      color: string;
      rotation: number;
      rotationSpeed: number;
    }

    const colors = [
      'rgba(244, 114, 182, ', // pink
      'rgba(192, 132, 252, ', // purple
      'rgba(232, 121, 249, ', // light pink
      'rgba(237, 233, 254, ', // lavender
    ];

    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 9 + 5,
      speedY: -(Math.random() * 0.4 + 0.2),
      speedX: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.6 + 0.2,
      fadeSpeed: (Math.random() - 0.5) * 0.005,
      type: Math.random() > 0.45 ? 'heart' : Math.random() > 0.5 ? 'star' : 'circle',
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
    }));

    const drawHeart = (x: number, y: number, size: number, color: string, alpha: number, rot: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.fillStyle = `${color}${alpha})`;
      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(0, topCurveHeight);
      // top left curve
      ctx.bezierCurveTo(
        0, 0,
        -size / 2, 0,
        -size / 2, topCurveHeight
      );
      // bottom left curve
      ctx.bezierCurveTo(
        -size / 2, (size + topCurveHeight) / 2,
        0, (size + topCurveHeight) / 1.4,
        0, size
      );
      // bottom right curve
      ctx.bezierCurveTo(
        0, (size + topCurveHeight) / 1.4,
        size / 2, (size + topCurveHeight) / 2,
        size / 2, topCurveHeight
      );
      // top right curve
      ctx.bezierCurveTo(
        size / 2, 0,
        0, 0,
        0, topCurveHeight
      );
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const drawStar = (x: number, y: number, size: number, color: string, alpha: number) => {
      ctx.save();
      ctx.fillStyle = `${color}${alpha})`;
      ctx.beginPath();
      ctx.arc(x, y, size * 0.25, 0, Math.PI * 2);
      ctx.fill();

      // soft glow cross
      ctx.strokeStyle = `${color}${alpha * 0.6})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x - size * 0.6, y);
      ctx.lineTo(x + size * 0.6, y);
      ctx.moveTo(x, y - size * 0.6);
      ctx.lineTo(x, y + size * 0.6);
      ctx.stroke();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;
        p.opacity += p.fadeSpeed;

        if (p.opacity > 0.8 || p.opacity < 0.15) {
          p.fadeSpeed = -p.fadeSpeed;
        }

        // Loop screen
        if (p.y < -20) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 10;
        if (p.x > width + 20) p.x = -10;

        if (p.type === 'heart') {
          drawHeart(p.x, p.y, p.size, p.color, p.opacity, p.rotation);
        } else if (p.type === 'star') {
          drawStar(p.x, p.y, p.size, p.color, p.opacity);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.2, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${p.opacity * 0.7})`;
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full"
    />
  );
};
