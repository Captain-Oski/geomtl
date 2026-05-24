'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import { LevelBadge } from '@/components/ui/Badge';
import Badge from '@/components/ui/Badge';
import { workshops, WorkshopLevel } from '@/data/workshops';
import { getDurationString } from '@/lib/utils';
import { cn } from '@/lib/utils';

export default function AteliersPage() {
  const t = useTranslations('workshops');
  const locale = useLocale();
  const [activeLevel, setActiveLevel] = useState<WorkshopLevel | 'all'>('all');

  const levels: Array<{ value: WorkshopLevel | 'all'; labelFr: string; labelEn: string }> = [
    { value: 'all', labelFr: 'Tous les niveaux', labelEn: 'All levels' },
    { value: 'debutant', labelFr: 'Débutant', labelEn: 'Beginner' },
    { value: 'intermediaire', labelFr: 'Intermédiaire', labelEn: 'Intermediate' },
    { value: 'avance', labelFr: 'Avancé', labelEn: 'Advanced' },
  ];

  const filtered = workshops.filter(w => activeLevel === 'all' || w.level === activeLevel);

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
        {/* Level filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {levels.map(({ value, labelFr, labelEn }) => (
            <button
              key={value}
              onClick={() => setActiveLevel(value)}
              className={cn(
                'px-4 py-2 rounded-xl text-sm font-semibold transition-all',
                activeLevel === value
                  ? 'bg-rose-geo/20 text-rose-geo border border-rose-geo/40'
                  : 'glass text-mid-gray hover:text-white border border-white/10'
              )}
            >
              {locale === 'fr' ? labelFr : labelEn}
            </button>
          ))}
        </div>

        {/* Workshop grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((workshop, index) => {
            const title = locale === 'fr' ? workshop.title.fr : workshop.title.en;
            const description = locale === 'fr' ? workshop.description.fr : workshop.description.en;
            const topics = locale === 'fr' ? workshop.topics.fr : workshop.topics.en;
            const spotsPercent = ((workshop.spots - workshop.spotsRemaining) / workshop.spots) * 100;

            return (
              <motion.div
                key={workshop.id}
                className="glass rounded-2xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <LevelBadge level={workshop.level} locale={locale} />
                  <div className="flex items-center gap-3 text-xs text-mid-gray flex-shrink-0">
                    <span>
                      {locale === 'fr' ? `Jour ${workshop.day}` : `Day ${workshop.day}`} · {workshop.time}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 leading-snug">{title}</h3>
                <p className="text-sm text-mid-gray leading-relaxed mb-4 line-clamp-3">
                  {description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {topics.slice(0, 4).map(topic => (
                    <Badge key={topic} variant="blue" size="sm">{topic}</Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-mid-gray mb-3">
                  <span>
                    ⏱ {getDurationString(workshop.duration, locale)} · 👤 {workshop.facilitator}
                  </span>
                  <span className={workshop.spotsRemaining < 5 ? 'text-orange-geo font-semibold' : ''}>
                    {workshop.spotsRemaining} {t('spots')}
                  </span>
                </div>

                {/* Spots bar */}
                <div className="w-full bg-white/5 rounded-full h-1.5 mb-4">
                  <div
                    className="h-1.5 rounded-full bg-gradient-to-r from-rose-geo to-orange-geo"
                    style={{ width: `${spotsPercent}%` }}
                  />
                </div>

                <button className="w-full py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-rose-geo to-orange-geo hover:from-rose-geo-light hover:to-orange-geo-light transition-all">
                  {t('register')}
                </button>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
