'use client';

import { useCallback, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  size: number;
  rotation: number;
  rotationSpeed: number;
}

const COLORS = ['#BF9B5E', '#8B6914', '#D4A843', '#F5E6C8', '#FFFFFF', '#FFD700'];

export default function useConfetti() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const createConfetti = useCallback((x?: number, y?: number) => {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-[10000]';
    document.body.appendChild(canvas);
    canvasRef.current = canvas;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const centerX = x || canvas.width / 2;
    const centerY = y || canvas.height / 2;

    const particles: Particle[] = [];
    const particleCount = 150;

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount;
      const velocity = 4 + Math.random() * 8;
      particles.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * velocity + (Math.random() - 0.5) * 4,
        vy: Math.sin(angle) * velocity - Math.random() * 6,
        life: 1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 4 + Math.random() * 6,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 15,
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let aliveCount = 0;
      particles.forEach((p) => {
        if (p.life <= 0) return;
        aliveCount++;

        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15; // gravity
        p.vx *= 0.99;
        p.life -= 0.012;
        p.rotation += p.rotationSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;

        // Draw rectangle confetti
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        ctx.restore();
      });

      if (aliveCount > 0) {
        animationId = requestAnimationFrame(animate);
      } else {
        canvas.remove();
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      canvas.remove();
    };
  }, []);

  return createConfetti;
}
