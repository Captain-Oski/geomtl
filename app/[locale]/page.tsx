import type { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import Stats from '@/components/home/Stats';
import WhyAttend from '@/components/home/WhyAttend';
import HomeCTA from './HomeCTA';

// Themes.tsx reste hors de la page tant que les thématiques 2027 ne sont pas
// définies par l'équipe.
// Conférenciers, programme, ateliers, exposants et partenaires ne sont pas
// encore annoncés publiquement (lancement prévu octobre 2026 au RDV
// Géomatique AGMQ) — FeaturedSpeakers, ProgramPreview et PartnersSection
// restent hors de la page d'accueil tant que ces sections ne sont pas
// réactivées avec de vraies données.
export const metadata: Metadata = {
  title: 'GeoMTL 2027 — La géomatique comme système nerveux du territoire',
  description:
    'La conférence géospatiale de référence du Québec. 4–5 octobre 2027, Centre de congrès de Saint-Hyacinthe.'
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <WhyAttend />
      <HomeCTA />
    </>
  );
}
