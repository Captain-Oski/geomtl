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
  const periodeAnticipe = fr ? 'Jusqu\'au 30 juin 2027' : 'Until June 30, 2027';
  const periodeStandard = fr ? 'À partir du 1er juillet 2027' : 'From July 1, 2027';

  const passes = [
    {
      id: 'jour',
      nom: fr ? 'Passe 1 jour' : 'One-day pass',
      detail: fr ? 'Le 4 ou le 5 octobre 2027, au choix' : 'October 4 or 5, 2027, your choice',
      anticipe: 220,
      standard: 250,
      avantages: fr ? [
        'Accès à 1 jour de conférence',
        'Accès à toutes les sessions de la journée',
        'Pause-café et déjeuner de la journée',
        'Accès à l\'app GÉOMTL 2027',
        'Certificat de participation'
      ] : [
        'Access to 1 day of conference',
        'Access to all sessions that day',
        'Coffee break and lunch that day',
        'Access to GÉOMTL 2027 app',
        'Certificate of participation'
      ]
    },
    {
      id: 'complete',
      nom: fr ? 'Passe complète' : 'Full pass',
      detail: fr ? EVENT_CONFIG.dates.fr : EVENT_CONFIG.dates.en,
      anticipe: 425,
      standard: 495,
      avantages: fr ? [
        'Accès aux 2 jours de conférence',
        'Accès à toutes les sessions',
        'Pauses-café et déjeuners inclus',
        'Accès à la soirée réseautage',
        'Accès à l\'app GÉOMTL 2027',
        'Certificat de participation'
      ] : [
        'Access to 2 days of conference',
        'Access to all sessions',
        'Coffee breaks and lunches included',
        'Networking evening access',
        'Access to GÉOMTL 2027 app',
        'Certificate of participation'
      ]
    }
  ];

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {passes.map((passe) => (
            <div key={passe.id} className="glass-2027 rounded-2xl p-6 sm:p-8 flex flex-col border-t-2 border-geo-teal-dark/40">
              <h3 className="text-xl font-bold text-geo-ink">{passe.nom}</h3>
              <p className="text-sm text-geo-ink-soft mt-1">{passe.detail}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <div className="relative rounded-xl border-2 border-geo-teal-dark bg-geo-teal/10 p-5">
                  <span className="absolute -top-3 left-5 rounded-full bg-gradient-geo-2027 px-3 py-1 text-xs font-bold text-geo-noir whitespace-nowrap">
                    {fr ? 'Économisez' : 'Save'} {prix(passe.standard - passe.anticipe)}
                  </span>
                  <p className="text-sm font-bold text-geo-ink">{t('earlyBird')}</p>
                  <p className="text-xs text-geo-ink-soft">{periodeAnticipe}</p>
                  <p className="mt-3 text-4xl font-black text-geo-ink">{prix(passe.anticipe)}</p>
                </div>
                <div className="rounded-xl border border-geo-ink/15 p-5">
                  <p className="text-sm font-semibold text-geo-ink-soft">{t('standard')}</p>
                  <p className="text-xs text-geo-ink-soft">{periodeStandard}</p>
                  <p className="mt-3 text-3xl font-bold text-geo-ink-soft">{prix(passe.standard)}</p>
                </div>
              </div>

              <p className="text-xs font-semibold uppercase tracking-wider text-geo-ink-soft mt-8 mb-3">{t('includes')}</p>
              <ul className="space-y-2 mb-8 flex-1">
                {passe.avantages.map((avantage) => (
                  <li key={avantage} className="flex items-start gap-2 text-sm text-geo-ink-soft">
                    <Check size={14} weight="light" className="mt-1 flex-shrink-0 text-geo-ink" aria-hidden="true" />
                    {avantage}
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
        <p className="text-center text-xs text-geo-ink-soft mt-4 mb-10">{t('taxNote')}</p>

        {/* Student/nonprofit note */}
        <div className="glass-2027 rounded-2xl p-6 text-center max-w-2xl mx-auto">
          <h3 className="text-lg font-bold text-geo-ink mb-3">
            {locale === 'fr' ? 'Tarifs étudiants et organismes sans but lucratif' : 'Student and Non-profit Rates'}
          </h3>
          <p className="text-geo-ink-soft text-sm mb-4">
            {locale === 'fr'
              ? 'Des tarifs préférentiels sont disponibles pour les étudiants (195 $) et les OSBL (295 $). Contactez-nous pour obtenir un code de réduction.'
              : 'Preferential rates are available for students ($195) and non-profits ($295). Contact us to get a discount code.'}
          </p>
          <a
            href={`mailto:info@geomtl.com`}
            className="inline-flex items-center gap-2 text-geo-teal-dark hover:underline text-sm font-semibold"
          >
            info@geomtl.com
          </a>
        </div>
      </Container>
    </div>
  );
}
