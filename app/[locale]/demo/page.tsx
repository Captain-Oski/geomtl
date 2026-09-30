import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import GlobeDemo from '@/components/demo/GlobeDemo';

// Page de réglage du globe animé : non liée depuis le site et exclue des moteurs de recherche.
export const metadata: Metadata = {
  title: 'Démo du globe animé',
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }];
}

export default function DemoPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return <GlobeDemo />;
}
