import { getTranslations, setRequestLocale } from 'next-intl/server';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import type { Metadata } from 'next';
import { Check } from '@phosphor-icons/react/dist/ssr/Check';
import NotesBillets from '@/components/billetterie/NotesBillets';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;

  const {
    locale
  } = params;

  return { title: locale === 'fr' ? 'Billetterie' : 'Tickets' };
}

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }];
}

export default async function BilletteriePage(
  props: {
    params: Promise<{ locale: string }>;
  }
) {
  const params = await props.params;

  const {
    locale
  } = params;

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'tickets' });

  const fr = locale === 'fr';
  const prix = (montant: number) => (fr ? `${montant} $` : `$${montant}`);

  // Seul forfait en vente, validé par le comité (JD, octobre 2026)
  const forfait = {
    nom: fr ? 'Forfait 2 jours' : '2-day package',
    detail: fr ? '4 et 5 octobre 2027' : 'October 4 and 5, 2027',
    anticipe: 795,
    regulier: 895,
    inclus: fr ? [
      'Conférences, vitrines technologiques et ateliers',
      'Salon des exposants',
      'Midis-conférences',
      'Soirée réseautage du 4 octobre, avec bouchées dînatoires'
    ] : [
      'Conferences, technology showcases and workshops',
      'Exhibition hall',
      'Lunch talks',
      'Networking evening on October 4, with hearty hors d\'oeuvres'
    ]
  };

  return (
    <div className="min-h-screen bg-geo-cream pt-20">
      <div className="page-header-2027 py-16 sm:py-20">
        <Container>
          <SectionTitle
            eyebrow={t('eyebrow')}
            title={t('title')}
            subtitle={t('subtitle')}
          />
        </Container>
      </div>

      <Container className="py-12">
        <div className="relative glass-2027 rounded-2xl p-6 flex flex-col border-t-2 border-geo-teal-dark/40 max-w-sm mx-auto">
          <span className="absolute -top-3 left-6 rounded-full bg-gradient-geo-2027 px-3 py-1 text-xs font-bold text-geo-noir whitespace-nowrap">
            {fr ? 'Économisez' : 'Save'} {prix(forfait.regulier - forfait.anticipe)}
          </span>
          <h3 className="text-xl font-bold text-geo-ink">{forfait.nom}</h3>
          <p className="text-sm text-geo-ink-soft mt-1">{forfait.detail}</p>

          <div className="mt-6">
            <p className="text-4xl font-black text-geo-ink">{prix(forfait.anticipe)}</p>
            <p className="mt-1 text-xs text-geo-ink-soft">
              {fr ? 'Tarif jusqu\'au 15 août, 23 h 45' : 'Rate until August 15, 11:45 pm'}
            </p>
            <p className="mt-1 text-sm text-geo-ink-soft">
              {fr ? 'Tarif régulier : ' : 'Regular rate: '}
              <span className="font-semibold text-geo-ink">{prix(forfait.regulier)}</span>
            </p>
          </div>

          <p className="text-xs font-semibold uppercase tracking-wider text-geo-ink-soft mt-6 mb-3">{t('includes')}</p>
          <ul className="space-y-2 mb-8 flex-1">
            {forfait.inclus.map((element) => (
              <li key={element} className="flex items-start gap-2 text-sm text-geo-ink-soft">
                <Check size={14} weight="light" className="mt-1 flex-shrink-0 text-geo-ink" aria-hidden="true" />
                {element}
              </li>
            ))}
          </ul>

          <button
            className="w-full py-3 rounded-xl font-bold text-geo-cream bg-geo-ink hover:bg-geo-ink/85 transition-colors"
          >
            {t('buyNow')}
          </button>
        </div>

        <div className="glass-2027 rounded-2xl p-6 sm:p-8 mt-10 max-w-3xl mx-auto">
          <h3 className="text-lg font-bold text-geo-ink mb-4">{fr ? 'À savoir' : 'Good to know'}</h3>
          <NotesBillets fr={fr} />
        </div>
      </Container>
    </div>
  );
}
