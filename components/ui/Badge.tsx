import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

type BadgeVariant = 'rose' | 'orange' | 'yellow' | 'blue' | 'green' | 'gray';
type BadgeSize = 'sm' | 'md';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
}

export default function Badge({
  variant = 'rose',
  size = 'sm',
  className,
  children,
  ...props
}: BadgeProps) {
  const variantStyles: Record<BadgeVariant, string> = {
    rose: 'badge-rose',
    orange: 'badge-orange',
    yellow: 'badge-yellow',
    blue: 'badge-blue',
    green: 'badge-green',
    gray: 'bg-white/5 text-mid-gray border border-white/10'
  };

  const sizeStyles: Record<BadgeSize, string> = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export function SessionTypeBadge({ type, locale }: { type: string; locale: string }) {
  const labels: Record<string, { fr: string; en: string; variant: BadgeVariant }> = {
    keynote: { fr: 'Keynote', en: 'Keynote', variant: 'rose' },
    conference: { fr: 'Conférence', en: 'Conference', variant: 'blue' },
    panel: { fr: 'Panel', en: 'Panel', variant: 'orange' },
    workshop: { fr: 'Atelier', en: 'Workshop', variant: 'green' },
    networking: { fr: 'Réseautage', en: 'Networking', variant: 'gray' },
    demo: { fr: 'Démo', en: 'Demo', variant: 'yellow' },
    awards: { fr: 'Prix', en: 'Awards', variant: 'rose' }
  };

  const config = labels[type] || { fr: type, en: type, variant: 'gray' as BadgeVariant };

  return (
    <Badge variant={config.variant} size="sm">
      {locale === 'en' ? config.en : config.fr}
    </Badge>
  );
}

export function LevelBadge({ level, locale }: { level: string; locale: string }) {
  const labels: Record<string, { fr: string; en: string; variant: BadgeVariant }> = {
    debutant: { fr: 'Débutant', en: 'Beginner', variant: 'green' },
    intermediaire: { fr: 'Intermédiaire', en: 'Intermediate', variant: 'yellow' },
    avance: { fr: 'Avancé', en: 'Advanced', variant: 'rose' }
  };

  const config = labels[level] || { fr: level, en: level, variant: 'gray' as BadgeVariant };

  return (
    <Badge variant={config.variant} size="sm">
      {locale === 'en' ? config.en : config.fr}
    </Badge>
  );
}

export function PartnerLevelBadge({ level, locale }: { level: string; locale: string }) {
  const labels: Record<string, { fr: string; en: string; variant: BadgeVariant }> = {
    presentateur: { fr: 'Présentateur', en: 'Presenting', variant: 'rose' },
    platine: { fr: 'Platine', en: 'Platinum', variant: 'yellow' },
    or: { fr: 'Or', en: 'Gold', variant: 'orange' },
    argent: { fr: 'Argent', en: 'Silver', variant: 'blue' },
    communaute: { fr: 'Communauté', en: 'Community', variant: 'green' }
  };

  const config = labels[level] || { fr: level, en: level, variant: 'gray' as BadgeVariant };

  return (
    <Badge variant={config.variant} size="md">
      {locale === 'en' ? config.en : config.fr}
    </Badge>
  );
}
