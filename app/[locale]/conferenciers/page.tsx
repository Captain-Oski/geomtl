'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import SpeakerCard from '@/components/speakers/SpeakerCard';
import { speakers } from '@/data/speakers';

export default function ConferenciersPage() {
  const t = useTranslations('speakers');
  const locale = useLocale();
  const [search, setSearch] = useState('');
  const [activeDay, setActiveDay] = useState<1 | 2 | 'all'>('all');

  const filtered = speakers.filter(speaker => {
    const name = speaker.name.toLowerCase();
    const org = speaker.organization.toLowerCase();
    const topics = (locale === 'fr' ? speaker.topics.fr : speaker.topics.en)
      .join(' ').toLowerCase();
    const query = search.toLowerCase();
    const matchesSearch = !search || name.includes(query) || org.includes(query) || topics.includes(query);
    const matchesDay = activeDay === 'all' || speaker.day === activeDay;
    return matchesSearch && matchesDay;
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
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="relative flex-1 max-w-md">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-mid-gray"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
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

          <div className="flex gap-2">
            {(['all', 1, 2] as const).map(day => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activeDay === day
                    ? 'bg-rose-geo/20 text-rose-geo border border-rose-geo/40'
                    : 'glass text-mid-gray hover:text-white border border-white/10'
                }`}
              >
                {day === 'all'
                  ? (locale === 'fr' ? 'Tous' : 'All')
                  : (locale === 'fr' ? `Jour ${day}` : `Day ${day}`)
                }
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-mid-gray mb-6">
          {filtered.length} {locale === 'fr' ? 'conférenciers' : 'speakers'}
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(speaker => (
            <SpeakerCard key={speaker.id} speaker={speaker} locale={locale} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="glass rounded-xl p-12 text-center">
            <p className="text-mid-gray text-lg">{locale === 'fr' ? 'Aucun résultat.' : 'No results.'}</p>
            <button
              onClick={() => { setSearch(''); setActiveDay('all'); }}
              className="mt-4 text-rose-geo text-sm hover:underline"
            >
              {locale === 'fr' ? 'Réinitialiser les filtres' : 'Reset filters'}
            </button>
          </div>
        )}
      </Container>
    </div>
  );
}
