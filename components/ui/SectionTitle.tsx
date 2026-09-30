'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  dark?: boolean;
}

export default function SectionTitle({
  eyebrow,
  title,
  titleAccent,
  subtitle,
  align = 'center',
  className,
  dark = true
}: SectionTitleProps) {
  const alignStyles = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end'
  };

  return (
    <motion.div
      className={cn(
        'flex flex-col gap-3 mb-12',
        alignStyles[align],
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {eyebrow && (
        <span className="text-sm font-semibold tracking-[0.2em] uppercase gradient-text-2027">
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          'text-3xl sm:text-4xl md:text-5xl font-bold leading-tight font-display',
          dark ? 'text-geo-ink' : 'text-geo-ink'
        )}
      >
        {title}
        {titleAccent && (
          <>
            {' '}
            <span className="gradient-text-2027">{titleAccent}</span>
          </>
        )}
      </h2>
      {align === 'center' && (
        <div className="w-16 h-1 bg-gradient-geo-2027 rounded-full mt-1" />
      )}
      {subtitle && (
        <p
          className={cn(
            'text-lg max-w-2xl leading-relaxed',
            dark ? 'text-geo-ink-soft' : 'text-geo-ink/70'
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
