import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  gradient?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export default function Card({
  hover = false,
  gradient = false,
  padding = 'md',
  className,
  children,
  ...props
}: CardProps) {
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  return (
    <div
      className={cn(
        'glass-2027 rounded-xl relative overflow-hidden',
        hover && 'card-hover cursor-pointer',
        gradient && 'gradient-border-2027',
        paddingStyles[padding],
        className
      )}
      {...props}
    >
      {gradient && (
        <div
          className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={{
            background: 'linear-gradient(135deg, rgba(1, 205, 165, 0.08) 0%, rgba(208, 220, 0, 0.08) 100%)'
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
