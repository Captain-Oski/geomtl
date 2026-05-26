import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CookieBanner from '@/components/ui/CookieBanner';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }];
}

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title: {
      default: 'GeoMTL 2027',
      template: '%s | GeoMTL 2027'
    },
    description:
      locale === 'fr'
        ? 'La géomatique comme système nerveux du territoire. 14–15 octobre 2027, Palais des congrès de Montréal.'
        : 'Geomatics as the nervous system of the territory. October 14–15, 2027, Palais des congrès de Montréal.',
    keywords: ['geomatics', 'geospatial', 'GIS', 'conference', 'montreal', 'géomatique', 'SIG'],
    openGraph: {
      title: 'GeoMTL 2027',
      description:
        locale === 'fr'
          ? 'La conférence géospatiale de référence — Montréal, 14–15 octobre 2027'
          : 'The reference geospatial conference — Montreal, October 14–15, 2027',
      siteName: 'GeoMTL 2027',
      locale: locale === 'fr' ? 'fr_CA' : 'en_CA',
      type: 'website'
    }
  };
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const validLocales = ['fr', 'en'];
  if (!validLocales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.variable}>
      <body className="bg-deep-blue text-light-gray antialiased">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
