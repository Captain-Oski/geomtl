import type { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import Stats from '@/components/home/Stats';
import Themes from '@/components/home/Themes';
import FeaturedSpeakers from '@/components/home/FeaturedSpeakers';
import WhyAttend from '@/components/home/WhyAttend';
import PartnersSection from '@/components/home/PartnersSection';
import ProgramPreview from '@/components/home/ProgramPreview';
import HomeCTA from './HomeCTA';

export const metadata: Metadata = {
  title: 'GeoMTL 2027 — La géomatique comme système nerveux du territoire',
  description:
    'La conférence géospatiale de référence du Québec. 3–5 octobre 2027, Centre de congrès de Saint-Hyacinthe. 350 participants, 60+ conférenciers, 26 exposants.'
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Themes />
      <FeaturedSpeakers />
      <ProgramPreview />
      <WhyAttend />
      <PartnersSection />
      <HomeCTA />
    </>
  );
}
