import { EnvelopeSimple } from '@phosphor-icons/react/dist/ssr/EnvelopeSimple';
import { EVENT_CONFIG } from '@/data/config';
import { cn } from '@/lib/utils';

const STYLES = {
  // Sur fond clair, à côté de boutons pleins encre
  contour: 'border-2 border-geo-ink text-geo-ink hover:bg-geo-ink hover:text-geo-cream',
  // Dans le pied de page, toujours noir
  pied: 'border border-geo-papier text-geo-papier hover:border-white hover:text-white',
  plein: 'bg-gradient-geo-2027 text-geo-noir hover:opacity-90',
};

export default function BoutonInfolettre({
  locale,
  variante = 'contour',
  className,
}: {
  locale: string;
  variante?: keyof typeof STYLES;
  className?: string;
}) {
  const fr = locale === 'fr';
  // Sans formulaire d'inscription en ligne, le bouton ouvre un courriel prérempli.
  const href =
    EVENT_CONFIG.newsletterUrl ??
    `mailto:${EVENT_CONFIG.email}?subject=${encodeURIComponent(
      fr ? 'Inscription à l\'infolettre GÉOMTL' : 'GÉOMTL newsletter subscription'
    )}&body=${encodeURIComponent(
      fr
        ? 'Bonjour,\n\nJe souhaite recevoir l\'infolettre de GÉOMTL à cette adresse.\n\nMerci!'
        : 'Hello,\n\nI would like to receive the GÉOMTL newsletter at this address.\n\nThank you!'
    )}`;

  return (
    <a
      href={href}
      {...(EVENT_CONFIG.newsletterUrl && { target: '_blank', rel: 'noopener noreferrer' })}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors',
        STYLES[variante],
        className
      )}
    >
      <EnvelopeSimple size={18} weight="light" aria-hidden="true" />
      {fr ? 'S\'abonner à l\'infolettre' : 'Subscribe to the newsletter'}
    </a>
  );
}
