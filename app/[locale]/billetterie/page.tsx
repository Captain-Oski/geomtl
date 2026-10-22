import { getTranslations, setRequestLocale } from 'next-intl/server';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import type { Metadata } from 'next';
import { Check } from '@phosphor-icons/react/dist/ssr/Check';
import { EVENT_CONFIG } from '@/data/config';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return { title: locale === 'fr' ? 'Billetterie' : 'Tickets' };
}

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }];
}

export default async function BilletteriePage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'tickets' });

  const fr = locale === 'fr';
  const prix = (montant: number) => (fr ? `${montant} $` : `$${montant}`);
  const COURRIEL_INSCRIPTION = EVENT_CONFIG.courriels.inscription;

  // Tarifs et forfaits validés par le comité (JD, octobre 2026). Seul le
  // forfait 2 jours a un tarif régulier connu après le 15 août.
  const forfaits: { id: string; nom: string; detail: string; anticipe: number; regulier?: number; inclus: string[] }[] = [
    {
      id: 'deux-jours',
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
    },
    {
      id: 'jour-4',
      nom: fr ? 'Forfait 1 jour' : '1-day package',
      detail: fr ? 'Lundi 4 octobre 2027' : 'Monday, October 4, 2027',
      anticipe: 495,
      inclus: fr ? [
        'Conférences, vitrines technologiques et ateliers',
        'Salon des exposants',
        'Midi-conférence',
        'Soirée réseautage du 4 octobre, avec bouchées dînatoires'
      ] : [
        'Conferences, technology showcases and workshops',
        'Exhibition hall',
        'Lunch talk',
        'Networking evening on October 4, with hearty hors d\'oeuvres'
      ]
    },
    {
      id: 'jour-5',
      nom: fr ? 'Forfait 1 jour' : '1-day package',
      detail: fr ? 'Mardi 5 octobre 2027' : 'Tuesday, October 5, 2027',
      anticipe: 400,
      inclus: fr ? [
        'Conférences, vitrines technologiques et ateliers',
        'Salon des exposants',
        'Midi-conférence'
      ] : [
        'Conferences, technology showcases and workshops',
        'Exhibition hall',
        'Lunch talk'
      ]
    },
    {
      id: 'etudiant',
      nom: fr ? 'Forfait Étudiant' : 'Student package',
      detail: fr ? 'Étudiants inscrits à temps plein' : 'Full-time students',
      anticipe: 95,
      inclus: fr ? [
        'Conférences, vitrines technologiques et ateliers',
        'Salon des exposants'
      ] : [
        'Conferences, technology showcases and workshops',
        'Exhibition hall'
      ]
    }
  ];

  const lienCourriel = (
    <a href={`mailto:${COURRIEL_INSCRIPTION}`} className="font-semibold text-geo-teal-dark hover:underline">
      {COURRIEL_INSCRIPTION}
    </a>
  );

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
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {forfaits.map((forfait) => (
            <div key={forfait.id} className="relative glass-2027 rounded-2xl p-6 flex flex-col border-t-2 border-geo-teal-dark/40">
              {forfait.regulier && (
                <span className="absolute -top-3 left-6 rounded-full bg-gradient-geo-2027 px-3 py-1 text-xs font-bold text-geo-noir whitespace-nowrap">
                  {fr ? 'Économisez' : 'Save'} {prix(forfait.regulier - forfait.anticipe)}
                </span>
              )}
              <h3 className="text-xl font-bold text-geo-ink">{forfait.nom}</h3>
              <p className="text-sm text-geo-ink-soft mt-1">{forfait.detail}</p>

              {/* Hauteur fixe : les listes « Inclus » restent alignées d'une carte à l'autre */}
              <div className="mt-6 sm:min-h-[6.5rem]">
                <p className="text-4xl font-black text-geo-ink">{prix(forfait.anticipe)}</p>
                <p className="mt-1 text-xs text-geo-ink-soft">
                  {fr ? 'Tarif jusqu\'au 15 août, 23 h 45' : 'Rate until August 15, 11:45 pm'}
                </p>
                {forfait.regulier && (
                  <p className="mt-1 text-sm text-geo-ink-soft">
                    {fr ? 'Tarif régulier : ' : 'Regular rate: '}
                    <span className="font-semibold text-geo-ink">{prix(forfait.regulier)}</span>
                  </p>
                )}
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
          ))}
        </div>

        <div className="glass-2027 rounded-2xl p-6 sm:p-8 mt-10 max-w-3xl mx-auto">
          <h3 className="text-lg font-bold text-geo-ink mb-4">{fr ? 'À savoir' : 'Good to know'}</h3>
          <ul className="space-y-3 text-sm text-geo-ink-soft leading-relaxed list-disc pl-5 marker:text-geo-teal-dark">
            <li>{fr ? 'Les montants affichés n\'incluent pas les frais et taxes applicables.' : 'Prices shown do not include applicable fees and taxes.'}</li>
            <li>{fr ? 'Aucun échange et aucun remboursement.' : 'No exchanges and no refunds.'}</li>
            <li>
              {fr
                ? 'Un rabais de 100,00 $ applicable seulement sur le forfait 2 jours est offert aux membres de l\'ACSG. Écrivez-nous à l\'adresse '
                : 'ACSG members get a $100.00 discount, applicable only to the 2-day package. Email us at '}
              {lienCourriel}
              {fr ? ' et nous vous enverrons un code promotionnel.' : ' and we will send you a promo code.'}
            </li>
            <li>
              {fr
                ? 'Le forfait Étudiant est offert uniquement aux étudiants inscrits à temps plein. Preuve d\'études à temps plein obligatoire. Écrivez-nous à l\'adresse '
                : 'The Student package is available only to full-time students. Proof of full-time enrolment is required. Email us at '}
              {lienCourriel}
              {fr ? ' et nous vous enverrons un code promotionnel.' : ' and we will send you a promo code.'}
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
}
