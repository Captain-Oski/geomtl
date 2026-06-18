'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import Badge from '@/components/ui/Badge';
import { exhibitors, EXHIBITOR_SECTORS_FR, EXHIBITOR_SECTORS_EN } from '@/data/exhibitors';
import { cn } from '@/lib/utils';

export default function ExposantsPage() {
  const t = useTranslations('exhibitors');
  const locale = useLocale();
  const [search, setSearch] = useState('');
  const [activeSector, setActiveSector] = useState('all');

  const sectors = locale === 'fr' ? EXHIBITOR_SECTORS_FR : EXHIBITOR_SECTORS_EN;

  const filtered = exhibitors.filter(e => {
    const sectorFr = e.sector.fr.toLowerCase();
    const sectorEn = e.sector.en.toLowerCase();
    const name = e.name.toLowerCase();
    const query = search.toLowerCase();
    const matchesSearch = !search || name.includes(query) || sectorFr.includes(query) || sectorEn.includes(query);
    const matchesSector = activeSector === 'all' ||
      (locale === 'fr' ? sectorFr === activeSector.toLowerCase() : sectorEn === activeSector.toLowerCase());
    return matchesSearch && matchesSector;
  });

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
        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-mid-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 glass rounded-xl text-white placeholder:text-mid-gray text-sm border border-white/10 focus:border-rose-geo/50 focus:outline-none"
            />
          </div>
        </div>

        {/* Sector filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveSector('all')}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
              activeSector === 'all'
                ? 'bg-rose-geo/20 text-rose-geo border border-rose-geo/40'
                : 'glass text-mid-gray hover:text-white border border-white/10'
            )}
          >
            {t('allSectors')}
          </button>
          {sectors.map(sector => (
            <button
              key={sector}
              onClick={() => setActiveSector(sector)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
                activeSector === sector
                  ? 'bg-rose-geo/20 text-rose-geo border border-rose-geo/40'
                  : 'glass text-mid-gray hover:text-white border border-white/10'
              )}
            >
              {sector}
            </button>
          ))}
        </div>

        {/* Plan de la zone exposition */}
        <motion.div
          className="glass rounded-2xl overflow-hidden mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="px-6 pt-6 pb-4 border-b border-white/5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-rose-geo uppercase tracking-widest mb-1">
                {locale === 'fr' ? 'Plan de la salle' : 'Exhibition Floor Plan'}
              </p>
              <h2 className="text-base font-bold text-white">
                {locale === 'fr' ? 'Zone exposition — GeoMTL 2027' : 'Exhibition Zone — GeoMTL 2027'}
              </h2>
            </div>
            <span className="text-xs text-mid-gray glass px-3 py-1.5 rounded-lg border border-white/10">
              {locale === 'fr' ? '26 kiosques' : '26 booths'}
            </span>
          </div>
          <div className="relative w-full bg-white/5 p-4">
            <Image
              src="/kiosques.webp"
              alt={locale === 'fr' ? 'Plan des kiosques GeoMTL 2027' : 'GeoMTL 2027 booth floor plan'}
              width={1540}
              height={700}
              className="w-full h-auto rounded-lg"
              priority
            />
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((exhibitor, index) => (
            <motion.div
              key={exhibitor.id}
              className="glass rounded-2xl p-6 card-hover"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-base font-black text-white"
                  style={{
                    background: `${exhibitor.logoColor}20`,
                    border: `1px solid ${exhibitor.logoColor}40`
                  }}
                >
                  {exhibitor.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-1 glass rounded-lg text-xs font-mono text-mid-gray border border-white/10">
                    {t('booth')} {exhibitor.booth}
                  </span>
                </div>
              </div>

              <h3 className="text-base font-bold text-white mb-1">{exhibitor.name}</h3>
              <Badge variant="blue" size="sm">
                {locale === 'fr' ? exhibitor.sector.fr : exhibitor.sector.en}
              </Badge>
              <p className="text-sm text-mid-gray leading-relaxed mt-3 line-clamp-3">
                {locale === 'fr' ? exhibitor.description.fr : exhibitor.description.en}
              </p>

              <div className="mt-4 pt-4 border-t border-white/5">
                <a
                  href={exhibitor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-rose-geo/80 hover:text-rose-geo transition-colors font-medium"
                >
                  {t('website')} →
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="glass rounded-xl p-12 text-center">
            <p className="text-mid-gray">{locale === 'fr' ? 'Aucun exposant trouvé.' : 'No exhibitors found.'}</p>
          </div>
        )}
      </Container>
    </div>
  );
}
