'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface ParallaxMouseProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export default function ParallaxMouse({ children, className = '', strength = 20 }: ParallaxMouseProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setPosition({ x: x * strength, y: y * strength });
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', stiffness: 50, damping: 20, mass: 0.5 }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
