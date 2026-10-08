import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GÉOMTL 2027',
  description: 'La conférence géospatiale de référence — 3–5 octobre 2027, Saint-Hyacinthe'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
