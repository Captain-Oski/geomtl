import Link from 'next/link';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import PartnerLogo from '@/components/partners/PartnerLogo';
import { partners, PARTNER_LEVELS_ORDER, getPartnersByLevel } from '@/data/partners';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Partenaires' };

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }];
}

export default async function PartenairesPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'partners' });

  const levelLabels: Record<string, { fr: string; en: string }> = {
    presentateur: { fr: 'Partenaire présentateur', en: 'Presenting Partner' },
    platine: { fr: 'Partenaires platine', en: 'Platinum Partners' },
    or: { fr: 'Partenaires or', en: 'Gold Partners' },
    argent: { fr: 'Partenaires argent', en: 'Silver Partners' },
    communaute: { fr: 'Partenaires communauté', en: 'Community Partners' }
  };

  return (
    <div className="min-h-screen bg-deep-blue pt-20">
      <div className="bg-deep-blue-mid border-b border-white/5 py-16">
        <Container>
          <SectionTitle
            eyebrow={t('eyebrow')}
            title={t('title')}
            subtitle={t('subtitle')}
          />
        </Container>
      </div>

      <Container className="py-12">
        {PARTNER_LEVELS_ORDER.map(level => {
          const levelPartners = getPartnersByLevel(level);
          if (levelPartners.length === 0) return null;
          const label = labelForLevel(level, locale);

          return (
            <div key={level} className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-2xl font-bold text-white">{label}</h2>
                <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
              </div>

              <div className={`grid gap-4 ${
                level === 'presentateur' ? 'grid-cols-1 max-w-lg' :
                level === 'platine' ? 'grid-cols-1 sm:grid-cols-2' :
                level === 'or' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' :
                'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              }`}>
                {levelPartners.map(partner => (
                  <div key={partner.id} className="glass rounded-2xl p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className={`rounded-xl flex items-center justify-center font-black text-white flex-shrink-0 ${
                          level === 'presentateur' ? 'w-16 h-16 text-xl' :
                          level === 'platine' ? 'w-14 h-14 text-lg' : 'w-10 h-10 text-sm'
                        }`}
                        style={{ background: `${partner.logoColor}20`, border: `1px solid ${partner.logoColor}40` }}
                      >
                        {partner.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-white">{partner.name}</p>
                        <p className="text-xs text-mid-gray">
                          {locale === 'fr' ? partner.sector.fr : partner.sector.en}
                        </p>
                      </div>
                    </div>
                    {(level === 'presentateur' || level === 'platine') && (
                      <p className="text-sm text-mid-gray leading-relaxed">
                        {locale === 'fr' ? partner.description.fr : partner.description.en}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* CTA */}
        <div className="glass rounded-2xl p-8 text-center mt-8">
          <h3 className="text-2xl font-bold text-white mb-3">
            {locale === 'fr' ? 'Devenez partenaire de GeoMTL 2027' : 'Become a GeoMTL 2027 Partner'}
          </h3>
          <p className="text-mid-gray mb-6">
            {locale === 'fr'
              ? 'Positionnez votre organisation au cœur de la communauté géospatiale canadienne.'
              : 'Position your organization at the heart of the Canadian geospatial community.'}
          </p>
          <Link
            href={`/${locale}/devenir-partenaire`}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-rose-geo to-orange-geo hover:from-rose-geo-light hover:to-orange-geo-light transition-all shadow-geo"
          >
            {t('becomePartner')}
          </Link>
        </div>
      </Container>
    </div>
  );
}

function labelForLevel(level: string, locale: string): string {
  const labels: Record<string, { fr: string; en: string }> = {
    presentateur: { fr: 'Partenaire présentateur', en: 'Presenting Partner' },
    platine: { fr: 'Partenaires platine', en: 'Platinum Partners' },
    or: { fr: 'Partenaires or', en: 'Gold Partners' },
    argent: { fr: 'Partenaires argent', en: 'Silver Partners' },
    communaute: { fr: 'Partenaires communauté', en: 'Community Partners' }
  };
  return locale === 'en' ? labels[level]?.en : labels[level]?.fr;
}
