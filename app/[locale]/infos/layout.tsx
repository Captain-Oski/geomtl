import type { Metadata } from 'next';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;

  const {
    locale
  } = params;

  return { title: locale === 'fr' ? 'Infos pratiques' : 'Practical info' };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
