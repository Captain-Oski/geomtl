'use client';

import { Camera } from '@phosphor-icons/react/dist/ssr/Camera';
import { MagnifyingGlassPlus } from '@phosphor-icons/react/dist/ssr/MagnifyingGlassPlus';
import { DownloadSimple } from '@phosphor-icons/react/dist/ssr/DownloadSimple';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import { cn } from '@/lib/utils';

type GalleryCategory = 'all' | 'keynotes' | 'workshops' | 'networking' | 'exposition' | 'awards';

const galleryImages = Array.from({ length: 24 }, (_, i) => {
  const categories: GalleryCategory[] = ['keynotes', 'workshops', 'networking', 'exposition', 'awards'];
  const category = categories[i % categories.length];
  const colors = [
    ['#20FEFD', '#01CDA5'],
    ['#01CDA5', '#1BC868'],
    ['#1BC868', '#D0DC00'],
    ['#D0DC00', '#6A8C3A'],
    ['#20FEFD', '#1BC868'],
    ['#6A8C3A', '#01CDA5'],
  ];
  const colorPair = colors[i % colors.length];

  return {
    id: `img-${i + 1}`,
    category,
    gradient: `linear-gradient(135deg, ${colorPair[0]}40 0%, ${colorPair[1]}40 100%)`,
    span: i % 7 === 0 ? 'col-span-2 row-span-2' : ''
  };
});

const categoryLabels: Record<GalleryCategory, { fr: string; en: string }> = {
  all: { fr: 'Toutes', en: 'All' },
  keynotes: { fr: 'Keynotes', en: 'Keynotes' },
  workshops: { fr: 'Ateliers', en: 'Workshops' },
  networking: { fr: 'Réseautage', en: 'Networking' },
  exposition: { fr: 'Exposition', en: 'Exhibition' },
  awards: { fr: 'Prix', en: 'Awards' }
};

export default function GaleriePage() {
  const t = useTranslations('gallery');
  const locale = useLocale();
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all');

  const filtered = galleryImages.filter(
    img => activeCategory === 'all' || img.category === activeCategory
  );

  const categories: GalleryCategory[] = ['all', 'keynotes', 'workshops', 'networking', 'exposition', 'awards'];

  return (
    <div className="min-h-screen bg-geo-cream pt-20">
      <div className="page-header-2027 py-16 sm:py-20">
        <Container>
          <SectionTitle
            eyebrow={t('eyebrow')}
            title={t('title')}
            subtitle={t('subtitle')}
          />
        </Container>
      </div>

      <Container className="py-12">
        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'px-4 py-2 rounded-xl text-sm font-semibold transition-all',
                activeCategory === cat
                  ? 'bg-geo-teal/15 text-geo-teal-dark border border-geo-teal-dark/40'
                  : 'glass-2027 text-geo-ink-soft hover:text-geo-ink border border-geo-ink/10'
              )}
            >
              {locale === 'fr' ? categoryLabels[cat].fr : categoryLabels[cat].en}
            </button>
          ))}
        </div>

        {/* Photo note */}
        <div className="glass-2027 rounded-xl p-4 mb-8 flex items-center gap-3">
          <Camera size={24} weight="light" className="text-geo-ink flex-shrink-0" aria-hidden="true" />
          <p className="text-sm text-geo-ink-soft">
            {locale === 'fr'
              ? 'Photos de l\'édition GÉOMTL 2026. Les photos de 2027 seront disponibles après l\'événement. Crédit : Marie-Claude Beaumont, photographe officielle GÉOMTL.'
              : 'Photos from the GÉOMTL 2026 edition. 2027 photos will be available after the event. Credit: Marie-Claude Beaumont, official GÉOMTL photographer.'}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((img, index) => (
            <motion.div
              key={img.id}
              className={`rounded-xl overflow-hidden cursor-pointer group relative ${img.span}`}
              style={{ minHeight: '160px' }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.03 }}
              whileHover={{ scale: 1.02 }}
            >
              <div
                className="w-full h-full flex items-end justify-start p-3"
                style={{ background: img.gradient, minHeight: '160px' }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-geo-ink/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <MagnifyingGlassPlus size={28} weight="light" className="text-white" aria-hidden="true" />
                </div>
                {/* Category badge */}
                <span className="relative z-10 text-xs px-2 py-0.5 rounded-full glass-2027 border border-white/20 text-white/70">
                  {locale === 'fr' ? categoryLabels[img.category].fr : categoryLabels[img.category].en}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA for official photos */}
        <div className="mt-12 glass-2027 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-geo-ink mb-3">
            {locale === 'fr' ? 'Télécharger les photos officielles' : 'Download Official Photos'}
          </h3>
          <p className="text-geo-ink-soft text-sm mb-6">
            {locale === 'fr'
              ? 'Toutes les photos GÉOMTL 2026 sont disponibles en haute résolution pour les médias et participants. Usage libre sous licence CC BY 4.0.'
              : 'All GÉOMTL 2026 photos are available in high resolution for media and attendees. Free use under CC BY 4.0 license.'}
          </p>
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-geo-noir bg-gradient-geo-2027 hover:opacity-90 transition-all">
            <DownloadSimple size={20} weight="light" aria-hidden="true" />{locale === 'fr' ? 'Télécharger (ZIP)' : 'Download (ZIP)'}
          </button>
        </div>
      </Container>
    </div>
  );
}
