import { getTranslations, setRequestLocale } from 'next-intl/server';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import type { Metadata } from 'next';
import { Check } from '@phosphor-icons/react/dist/ssr/Check';

export const metadata: Metadata = { title: 'Billetterie' };

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

  const ticketTypes = [
    {
      id: 'early',
      name: t('earlyBird'),
      price: t('earlyBirdPrice'),
      deadline: locale === 'fr' ? 'Jusqu\'au 30 juin 2027' : 'Until June 30, 2027',
      color: '#01CDA5',
      badge: null,
      features: locale === 'fr' ? [
        'Accès aux 2 jours de conférence',
        'Accès à toutes les sessions',
        'Pauses-café et déjeuners inclus',
        'Cocktail de bienvenue',
        'Cocktail de clôture',
        'Accès à l\'app GeoMTL 2027',
        'Accès aux rediffusions post-événement'
      ] : [
        'Access to 2 days of conference',
        'Access to all sessions',
        'Coffee breaks and lunches included',
        'Welcome cocktail',
        'Closing cocktail',
        'Access to GeoMTL 2027 app',
        'Access to post-event replays'
      ]
    },
    {
      id: 'standard',
      name: t('standard'),
      price: t('standardPrice'),
      deadline: locale === 'fr' ? 'Tarif standard' : 'Standard rate',
      color: '#D0DC00',
      badge: t('popular'),
      features: locale === 'fr' ? [
        'Accès aux 2 jours de conférence',
        'Accès à toutes les sessions',
        'Pauses-café et déjeuners inclus',
        'Cocktail de bienvenue',
        'Cocktail de clôture',
        'Accès à l\'app GeoMTL 2027',
        'Accès aux rediffusions post-événement',
        'Certificat de participation'
      ] : [
        'Access to 2 days of conference',
        'Access to all sessions',
        'Coffee breaks and lunches included',
        'Welcome cocktail',
        'Closing cocktail',
        'Access to GeoMTL 2027 app',
        'Access to post-event replays',
        'Certificate of participation'
      ]
    },
    {
      id: 'group',
      name: t('group'),
      price: t('groupPrice'),
      deadline: locale === 'fr' ? 'Pour 5 personnes et plus' : 'For 5 people and more',
      color: '#1BC868',
      badge: null,
      features: locale === 'fr' ? [
        'Tous les avantages du billet standard',
        'Tarif dégressif dès 5 inscriptions',
        'Facturation unique pour l\'organisation',
        'Gestionnaire de compte dédié',
        'Table ronde exclusive (10+ participants)',
        'Visibilité logo dans l\'application'
      ] : [
        'All standard ticket benefits',
        'Discounted rate from 5 registrations',
        'Single billing for the organization',
        'Dedicated account manager',
        'Exclusive round table (10+ participants)',
        'Logo visibility in the app'
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {ticketTypes.map(ticket => (
            <div
              key={ticket.id}
              className="glass-2027 rounded-2xl p-6 relative flex flex-col"
              style={{ borderTop: `2px solid ${ticket.color}60` }}
            >
              {ticket.badge && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-geo-ink"
                  style={{ background: ticket.color }}
                >
                  {ticket.badge}
                </div>
              )}

              <div className="mb-4">
                <h3 className="text-lg font-bold text-geo-ink mb-1">{ticket.name}</h3>
                <p className="text-xs text-geo-ink-soft">{ticket.deadline}</p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-black text-geo-ink">{ticket.price}</span>
                <p className="text-xs text-geo-ink-soft mt-1">{t('taxNote')}</p>
              </div>

              <ul className="space-y-2 flex-1 mb-6">
                {ticket.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-geo-ink-soft">
                    <Check size={14} weight="light" className="mt-1 flex-shrink-0 text-geo-ink" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className="w-full py-3 rounded-xl font-bold text-white bg-geo-ink hover:bg-geo-ink/85 transition-colors"
              >
                {t('buyNow')}
              </button>
            </div>
          ))}
        </div>

        {/* Tax note */}
        <p className="text-center text-xs text-geo-ink-soft mb-8">* {t('taxNote')}</p>

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
            href={`mailto:info@geomtl.ca`}
            className="inline-flex items-center gap-2 text-geo-teal-dark hover:underline text-sm font-semibold"
          >
            info@geomtl.ca
          </a>
        </div>
      </Container>
    </div>
  );
}
