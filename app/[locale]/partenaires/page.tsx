import { getTranslations, setRequestLocale } from 'next-intl/server';
import ComingSoon from '@/components/ui/ComingSoon';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Partenaires' };

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }];
}

// La liste des partenaires confirmés n'est pas encore annoncée publiquement
// (lancement prévu octobre 2026, RDV Géomatique AGMQ) — aucune donnée
// maquette (incluant les noms d'organisations utilisés comme exemples)
// n'est chargée sur cette page tant que la section n'est pas réactivée
// avec les vrais partenaires confirmés.
export default async function PartenairesPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'partners' });

  return (
    <ComingSoon
      locale={locale}
      eyebrow={t('eyebrow')}
      title={t('title')}
      message={
        locale === 'fr'
          ? 'Nos partenaires seront dévoilés prochainement. Restez à l\'affût — l\'annonce officielle est prévue en octobre 2026, au RDV Géomatique AGMQ. Vous représentez une organisation intéressée à s\'associer à GeoMTL 2027?'
          : 'Our partners will be unveiled soon. Stay tuned — the official announcement is planned for October 2026, at the RDV Géomatique AGMQ. Represent an organization interested in partnering with GeoMTL 2027?'
      }
    />
  );
}
