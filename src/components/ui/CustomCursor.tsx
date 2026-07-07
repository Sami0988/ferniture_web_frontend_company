'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const glowX = useMotionValue(-100);
  const glowY = useMotionValue(-100);
  const glowXSpring = useSpring(glowX, { damping: 35, stiffness: 200 });
  const glowYSpring = useSpring(glowY, { damping: 35, stiffness: 200 });

  const moveCursor = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX - 12);
    cursorY.set(e.clientY - 12);
    glowX.set(e.clientX - 20);
    glowY.set(e.clientY - 20);
  }, [cursorX, cursorY, glowX, glowY]);

  useEffect(() => {
    // Only show on desktop
    if (window.matchMedia('(pointer: fine)').matches) {
      setIsVisible(true);
      window.addEventListener('mousemove', moveCursor);
      window.addEventListener('mousedown', () => setIsClicking(true));
      window.addEventListener('mouseup', () => setIsClicking(false));

      const handleHoverStart = () => setIsHovering(true);
      const handleHoverEnd = () => setIsHovering(false);

      const interactives = document.querySelectorAll('a, button, [role="button"], input, textarea, select, .filter-chip, details');
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', handleHoverStart);
        el.addEventListener('mouseleave', handleHoverEnd);
      });

      return () => {
        window.removeEventListener('mousemove', moveCursor);
        interactives.forEach((el) => {
          el.removeEventListener('mouseenter', handleHoverStart);
          el.removeEventListener('mouseleave', handleHoverEnd);
        });
      };
    }
  }, [moveCursor]);

  if (!isVisible) return null;

  return (
    <>
      {/* Glow effect */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9998] mix-blend-screen"
        style={{
          x: glowXSpring,
          y: glowYSpring,
          background: 'radial-gradient(circle, rgba(191,155,94,0.3) 0%, transparent 70%)',
          scale: isHovering ? 2.5 : 1,
        }}
        transition={{ scale: { duration: 0.3 } }}
      />
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[9999] border-2 border-gold mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          scale: isClicking ? 0.8 : isHovering ? 0.5 : 1,
          backgroundColor: isHovering ? 'rgba(191,155,94,0.2)' : 'transparent',
        }}
        transition={{ scale: { duration: 0.15 } }}
      />
    </>
  );
}
