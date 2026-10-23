import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import GlobeDemo from '@/components/demo/GlobeDemo';

// Page de réglage du globe animé : non liée depuis le site et exclue des moteurs de recherche.
export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;

  const {
    locale
  } = params;

  return { title: locale === 'fr' ? 'Démo du globe animé' : 'Animated globe demo', robots: { index: false, follow: false } };
}

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }];
}

export default async function DemoPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;

  const {
    locale
  } = params;

  setRequestLocale(locale);
  return <GlobeDemo />;
}
