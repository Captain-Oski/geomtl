'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface StatBlockProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  className?: string;
  accentColor?: string;
}

export default function StatBlock({
  value,
  suffix = '',
  prefix = '',
  label,
  className,
  accentColor = 'rose'
}: StatBlockProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const start = 0;
          const end = value;
          const duration = 2000;
          const startTime = performance.now();

          const update = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplayValue(Math.round(start + (end - start) * eased));
            if (progress < 1) {
              requestAnimationFrame(update);
            }
          };

          requestAnimationFrame(update);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  const accentColors: Record<string, string> = {
    rose: 'from-geo-teal to-geo-lime',
    orange: 'from-geo-lime-dark to-geo-lime',
    yellow: 'from-geo-teal-dark to-geo-teal',
    blue: 'from-blue-400 to-blue-600'
  };

  return (
    <motion.div
      ref={ref}
      className={cn('flex flex-col items-center text-center', className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <span
        className={cn(
          'text-5xl sm:text-6xl font-bold bg-gradient-to-r bg-clip-text text-transparent',
          accentColors[accentColor] || accentColors.rose
        )}
      >
        {prefix}{displayValue.toLocaleString('fr-CA')}{suffix}
      </span>
      <span className="mt-2 text-geo-ink-soft text-base font-medium uppercase tracking-wider">
        {label}
      </span>
    </motion.div>
  );
}
