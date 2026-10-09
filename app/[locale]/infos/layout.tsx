import type { Metadata } from 'next';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return { title: locale === 'fr' ? 'Infos pratiques' : 'Practical info' };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
