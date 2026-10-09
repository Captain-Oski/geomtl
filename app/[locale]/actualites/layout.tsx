import type { Metadata } from 'next';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return { title: locale === 'fr' ? 'Actualités' : 'News' };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
