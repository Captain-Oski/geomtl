import Link from 'next/link';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import { awards } from '@/data/awards';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Prix GeoMTL' };

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }];
}

export default async function PrixPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'awards' });

  return (
    <div className="min-h-screen bg-deep-blue pt-20">
      <div className="bg-deep-blue-mid border-b border-white/5 py-16">
        <Container>
          <SectionTitle
            eyebrow={t('eyebrow')}
            title={t('title')}
            subtitle={t('subtitle')}
          />
          <div className="text-center">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-rose-geo to-orange-geo hover:opacity-90 transition-all shadow-geo"
            >
              {t('nominate')} →
            </Link>
          </div>
        </Container>
      </div>

      <Container className="py-12">
        <h2 className="text-2xl font-bold text-white mb-8">
          {t('categories')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {awards.map((award, index) => {
            const title = locale === 'fr' ? award.title.fr : award.title.en;
            const description = locale === 'fr' ? award.description.fr : award.description.en;
            const criteria = locale === 'fr' ? award.criteria.fr : award.criteria.en;

            return (
              <div
                key={award.id}
                className="glass rounded-2xl p-6"
                style={{ borderLeft: `3px solid ${award.color}60` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{award.icon}</span>
                  <h3 className="text-lg font-bold text-white">{title}</h3>
                </div>
                <p className="text-sm text-mid-gray leading-relaxed mb-4">{description}</p>

                <div className="space-y-1.5">
                  <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: award.color }}>
                    {locale === 'fr' ? 'Critères' : 'Criteria'}
                  </p>
                  {criteria.map((criterion, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-mid-gray">
                      <span style={{ color: award.color }} className="mt-0.5">·</span>
                      {criterion}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Past winners placeholder */}
        <div className="glass rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">{t('pastWinners')}</h2>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-mid-gray text-sm">
            <span className="w-2 h-2 rounded-full bg-orange-geo animate-pulse" />
            {locale === 'fr' ? 'Lauréats 2026 à venir' : t('comingSoon')}
          </div>
          <p className="text-mid-gray text-sm mt-4 max-w-lg mx-auto">
            {locale === 'fr'
              ? 'Les lauréats des Prix GeoMTL 2026 seront annoncés prochainement. Restez à l\'écoute!'
              : 'GeoMTL 2026 Award winners will be announced soon. Stay tuned!'}
          </p>
        </div>

        {/* Nomination CTA */}
        <div className="mt-10 glass rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-white mb-3">
            {locale === 'fr' ? 'Vous connaissez un projet exceptionnel?' : 'Know an exceptional project?'}
          </h3>
          <p className="text-mid-gray mb-6 max-w-xl mx-auto">
            {locale === 'fr'
              ? 'Les candidatures sont ouvertes jusqu\'au 1er août 2027. Soumettez une nomination pour honorer l\'excellence dans votre domaine.'
              : 'Nominations are open until August 1, 2027. Submit a nomination to honor excellence in your field.'}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-rose-geo to-orange-geo hover:opacity-90 transition-all"
          >
            {t('nominate')}
          </Link>
        </div>
      </Container>
    </div>
  );
}
