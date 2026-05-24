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
        'glass rounded-xl relative overflow-hidden',
        hover && 'card-hover cursor-pointer',
        gradient && 'gradient-border',
        paddingStyles[padding],
        className
      )}
      {...props}
    >
      {gradient && (
        <div
          className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={{
            background: 'linear-gradient(135deg, rgba(233, 30, 140, 0.05) 0%, rgba(255, 107, 53, 0.05) 100%)'
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
