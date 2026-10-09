import { getTranslations, setRequestLocale } from 'next-intl/server';
import ComingSoon from '@/components/ui/ComingSoon';
import type { Metadata } from 'next';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return { title: locale === 'fr' ? 'Programme' : 'Program' };
}

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }];
}

// La grille horaire n'est pas encore annoncée publiquement (lancement
// prévu octobre 2026, RDV Géomatique AGMQ) — aucune donnée maquette
// n'est chargée sur cette page tant que la section n'est pas réactivée
// avec le vrai programme.
export default async function ProgrammePage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'programme' });

  return (
    <ComingSoon
      locale={locale}
      eyebrow={t('eyebrow')}
      title={t('title')}
      message={
        locale === 'fr'
          ? 'La grille horaire complète sera dévoilée prochainement. Restez à l\'affût!'
          : 'The full schedule will be unveiled soon. Stay tuned!'
      }
    />
  );
}
