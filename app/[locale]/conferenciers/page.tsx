import { getTranslations, setRequestLocale } from 'next-intl/server';
import ComingSoon from '@/components/ui/ComingSoon';
import type { Metadata } from 'next';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return { title: locale === 'fr' ? 'Conférenciers' : 'Speakers' };
}

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }];
}

// La liste des conférenciers n'est pas encore annoncée publiquement
// (lancement prévu octobre 2026, RDV Géomatique AGMQ) — aucune donnée
// maquette n'est chargée sur cette page tant que la section n'est pas
// réactivée avec de vraies confirmations.
export default async function ConferenciersPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'speakers' });

  return (
    <ComingSoon
      locale={locale}
      eyebrow={t('eyebrow')}
      title={t('title')}
      message={
        locale === 'fr'
          ? 'Notre programmation de conférenciers sera annoncée prochainement. Restez à l\'affût!'
          : 'Our speaker lineup will be announced soon. Stay tuned!'
      }
    />
  );
}
