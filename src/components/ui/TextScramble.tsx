'use client';

import { useEffect, useRef, useState } from 'react';

interface TextScrambleProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}

const CHARS = '!<>-_\\/[]{}—=+*^?#________';

export default function TextScramble({ text, className = '', speed = 30, delay = 0 }: TextScrambleProps) {
  const [displayText, setDisplayText] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let iteration = 0;
    const maxIterations = text.length;

    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((char, index) => {
              if (index < iteration) return text[index];
              if (char === ' ') return ' ';
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join('')
        );

        if (iteration >= maxIterations) {
          clearInterval(interval);
        }

        iteration += 1 / 2;
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [hasStarted, text, speed, delay]);

  return (
    <span ref={ref} className={className}>
      {displayText || text.split('').map(() => ' ').join('')}
    </span>
  );
}
