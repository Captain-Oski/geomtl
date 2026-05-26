import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GeoMTL 2027',
  description: 'La conférence géospatiale de référence — 14–15 octobre 2027, Montréal'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
