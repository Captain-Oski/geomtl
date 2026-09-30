'use client';

import { useSyncExternalStore } from 'react';
import { CLE_THEME } from '@/lib/theme-script';

// Thème du site public : clair (crème, la charte) par défaut, sombre (encre)
// au choix du visiteur via le bouton du Header. Le choix est mémorisé dans
// le navigateur et matérialisé par la classe .dark sur <html>, que lisent
// Tailwind (darkMode: 'class') et les variables --rgb-geo-* de globals.css.
// SCRIPT_THEME (lib/theme-script.ts) le réapplique au chargement.

export type Theme = 'clair' | 'sombre';

const abonnes = new Set<() => void>();

function abonner(rappel: () => void) {
  abonnes.add(rappel);
  return () => {
    abonnes.delete(rappel);
  };
}

function lireTheme(): Theme {
  return document.documentElement.classList.contains('dark') ? 'sombre' : 'clair';
}

// Le serveur ne connaît pas le choix du visiteur : il rend le thème clair,
// puis React se recale sur la classe de <html> juste après l'hydratation.
function themeServeur(): Theme {
  return 'clair';
}

export function useTheme(): Theme {
  return useSyncExternalStore(abonner, lireTheme, themeServeur);
}

export function changerTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'sombre');
  try {
    localStorage.setItem(CLE_THEME, theme);
  } catch {
    // Navigation privée ou stockage bloqué : le thème vaut pour la page seulement.
  }
  abonnes.forEach((rappel) => rappel());
}

// Changer de langue remonte le layout [locale] et React réécrit alors les
// classes de <html>, sans .dark : le Header la repose au montage.
export function reappliquerTheme() {
  let memorise: string | null = null;
  try {
    memorise = localStorage.getItem(CLE_THEME);
  } catch {
    return;
  }
  if (memorise === 'sombre' && lireTheme() !== 'sombre') changerTheme('sombre');
}
