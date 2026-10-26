import { EnvelopeSimple } from '@phosphor-icons/react/dist/ssr/EnvelopeSimple';
import { lienInfolettre } from '@/lib/infolettre';
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

  return (
    // Page /infolettre, ou courriel prérempli tant que Mailchimp n'est pas configuré
    <a
      href={lienInfolettre(locale)}
      className={cn(
        'inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold transition-colors',
        STYLES[variante],
        className
      )}
    >
      <EnvelopeSimple size={18} weight="light" aria-hidden="true" />
      {fr ? 'S\'abonner à l\'infolettre' : 'Subscribe to the newsletter'}
    </a>
  );
}
