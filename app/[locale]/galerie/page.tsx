'use client';

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
    ['#e91e8c', '#ff6b35'],
    ['#ff6b35', '#ffd60a'],
    ['#0a1628', '#1a4a8a'],
    ['#ffd60a', '#ff6b35'],
    ['#1a4a8a', '#e91e8c'],
    ['#e91e8c', '#9333ea'],
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
    <div className="min-h-screen bg-deep-blue pt-20">
      <div className="bg-deep-blue-mid border-b border-white/5 py-16">
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
                  ? 'bg-rose-geo/20 text-rose-geo border border-rose-geo/40'
                  : 'glass text-mid-gray hover:text-white border border-white/10'
              )}
            >
              {locale === 'fr' ? categoryLabels[cat].fr : categoryLabels[cat].en}
            </button>
          ))}
        </div>

        {/* Photo note */}
        <div className="glass rounded-xl p-4 mb-8 flex items-center gap-3">
          <span className="text-2xl">📸</span>
          <p className="text-sm text-mid-gray">
            {locale === 'fr'
              ? 'Photos de l\'édition GeoMTL 2026. Les photos de 2027 seront disponibles après l\'événement. Crédit : Marie-Claude Beaumont, photographe officielle GeoMTL.'
              : 'Photos from the GeoMTL 2026 edition. 2027 photos will be available after the event. Credit: Marie-Claude Beaumont, official GeoMTL photographer.'}
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
                <div className="absolute inset-0 bg-deep-blue/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <span className="text-white text-2xl">🔍</span>
                </div>
                {/* Category badge */}
                <span className="relative z-10 text-xs px-2 py-0.5 rounded-full glass border border-white/20 text-white/70">
                  {locale === 'fr' ? categoryLabels[img.category].fr : categoryLabels[img.category].en}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA for official photos */}
        <div className="mt-12 glass rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-white mb-3">
            {locale === 'fr' ? 'Télécharger les photos officielles' : 'Download Official Photos'}
          </h3>
          <p className="text-mid-gray text-sm mb-6">
            {locale === 'fr'
              ? 'Toutes les photos GeoMTL 2026 sont disponibles en haute résolution pour les médias et participants. Usage libre sous licence CC BY 4.0.'
              : 'All GeoMTL 2026 photos are available in high resolution for media and attendees. Free use under CC BY 4.0 license.'}
          </p>
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-rose-geo to-orange-geo hover:opacity-90 transition-all">
            📥 {locale === 'fr' ? 'Télécharger (ZIP)' : 'Download (ZIP)'}
          </button>
        </div>
      </Container>
    </div>
  );
}
