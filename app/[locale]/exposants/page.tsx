import { getTranslations, setRequestLocale } from 'next-intl/server';
import ComingSoon from '@/components/ui/ComingSoon';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Exposants' };

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }];
}

// La liste des exposants n'est pas encore annoncée publiquement (lancement
// prévu octobre 2026, RDV Géomatique AGMQ) — aucune donnée maquette
// n'est chargée sur cette page tant que la section n'est pas réactivée
// avec les vrais exposants confirmés.
export default async function ExposantsPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'exhibitors' });

  return (
    <ComingSoon
      locale={locale}
      eyebrow={t('eyebrow')}
      title={t('title')}
      message={
        locale === 'fr'
          ? 'La liste des exposants sera dévoilée prochainement. Restez à l\'affût — l\'annonce officielle est prévue en octobre 2026, au RDV Géomatique AGMQ.'
          : 'The list of exhibitors will be unveiled soon. Stay tuned — the official announcement is planned for October 2026, at the RDV Géomatique AGMQ.'
      }
    />
  );
}
