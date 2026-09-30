import Link from 'next/link';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import { Clock } from '@phosphor-icons/react/dist/ssr/Clock';

interface ComingSoonProps {
  locale: string;
  eyebrow: string;
  title: string;
  /** Optionnel : message spécifique à la section. Sinon un texte générique est utilisé. */
  message?: string;
}

/**
 * Placeholder pour les sections pas encore annoncées publiquement
 * (conférenciers, programme, ateliers, exposants, partenaires) — le
 * lancement officiel de ces contenus est prévu en octobre 2026, au
 * RDV Géomatique AGMQ. Aucune donnée maquette n'est importée ici.
 */
export default function ComingSoon({ locale, eyebrow, title, message }: ComingSoonProps) {
  const defaultMessage = locale === 'fr'
    ? 'Cette section sera dévoilée prochainement. Restez à l\'affût — l\'annonce officielle est prévue en octobre 2026, au RDV Géomatique AGMQ.'
    : 'This section will be unveiled soon. Stay tuned — the official announcement is planned for October 2026, at the RDV Géomatique AGMQ.';

  return (
    <div className="min-h-screen bg-geo-cream pt-20">
      <div className="page-header-2027 py-16 sm:py-20">
        <Container>
          <SectionTitle eyebrow={eyebrow} title={title} />
        </Container>
      </div>

      <Container className="py-20">
        <div className="glass-2027 rounded-2xl p-10 sm:p-14 max-w-xl mx-auto text-center">
          <div className="w-14 h-14 rounded-2xl bg-geo-teal/15 border border-geo-teal-dark/25 flex items-center justify-center text-geo-ink mx-auto mb-6">
            <Clock size={28} weight="light" aria-hidden="true" />
          </div>
          <h2 className="text-xl font-bold text-geo-ink mb-3">
            {locale === 'fr' ? 'Bientôt disponible' : 'Coming soon'}
          </h2>
          <p className="text-geo-ink-soft leading-relaxed mb-8">
            {message || defaultMessage}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/${locale}/billetterie`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-geo-noir bg-gradient-geo-2027 hover:opacity-90 transition-all shadow-geo-2027"
            >
              {locale === 'fr' ? 'Réserver ma place' : 'Reserve my spot'}
            </Link>
            <Link
              href={`/${locale}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-geo-ink border border-geo-ink/20 hover:border-geo-ink/40 hover:bg-geo-ink/5 transition-all"
            >
              {locale === 'fr' ? "Retour à l'accueil" : 'Back to home'}
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
