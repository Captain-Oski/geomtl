'use client';

import { useLayoutEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Moon } from '@phosphor-icons/react/dist/ssr/Moon';
import { Sun } from '@phosphor-icons/react/dist/ssr/Sun';
import { changerTheme, reappliquerTheme, useTheme } from '@/lib/theme';
import { cn } from '@/lib/utils';

// Bascule clair / sombre : la lune propose le mode sombre, le soleil ramène
// au mode clair.
export default function ThemeToggle({ className }: { className?: string }) {
  const t = useTranslations('nav');
  const sombre = useTheme() === 'sombre';

  // Avant l'affichage, pour éviter un éclair crème au changement de langue
  useLayoutEffect(reappliquerTheme, []);

  return (
    <button
      type="button"
      onClick={() => changerTheme(sombre ? 'clair' : 'sombre')}
      aria-pressed={sombre}
      aria-label={t('darkMode')}
      title={sombre ? t('toLightMode') : t('toDarkMode')}
      className={cn(
        'flex items-center justify-center p-1.5 rounded-lg border border-geo-ink/15 text-geo-ink-soft hover:text-geo-ink hover:border-geo-ink/30 transition-colors',
        className
      )}
    >
      {sombre ? (
        <Sun size={16} weight="light" aria-hidden="true" />
      ) : (
        <Moon size={16} weight="light" aria-hidden="true" />
      )}
    </button>
  );
}
