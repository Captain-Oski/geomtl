'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import AgendaItemComponent from '@/components/agenda/AgendaItem';
import { agendaItems, SessionType } from '@/data/agenda';
import { cn } from '@/lib/utils';

export default function ProgrammePage() {
  const t = useTranslations('programme');
  const locale = useLocale();
  const [activeDay, setActiveDay] = useState<0 | 1 | 2>(0);
  const [activeType, setActiveType] = useState<SessionType | 'all'>('all');

  const types: Array<{ value: SessionType | 'all'; labelFr: string; labelEn: string }> = [
    { value: 'all', labelFr: 'Tout', labelEn: 'All' },
    { value: 'keynote', labelFr: 'Keynote', labelEn: 'Keynote' },
    { value: 'conference', labelFr: 'Conférence', labelEn: 'Conference' },
    { value: 'panel', labelFr: 'Panel', labelEn: 'Panel' },
    { value: 'workshop', labelFr: 'Atelier', labelEn: 'Workshop' },
    { value: 'demo', labelFr: 'Démo', labelEn: 'Demo' },
    { value: 'networking', labelFr: 'Réseautage', labelEn: 'Networking' },
    { value: 'awards', labelFr: 'Prix', labelEn: 'Awards' },
  ];

  const filtered = agendaItems.filter(item => {
    if (item.day !== activeDay) return false;
    if (activeType !== 'all' && item.type !== activeType) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-deep-blue pt-20">
      {/* Header */}
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
        {/* Day tabs */}
        <div className="flex flex-wrap gap-2 mb-6 p-1 glass rounded-xl w-fit">
          {([0, 1, 2] as const).map((day) => {
            const label = locale === 'fr'
              ? day === 0 ? 'Soirée — Dim. 3 oct.' : `Jour ${day} — ${day === 1 ? 'Lun. 4 oct.' : 'Mar. 5 oct.'}`
              : day === 0 ? 'Evening — Sun. Oct. 3' : `Day ${day} — ${day === 1 ? 'Mon. Oct. 4' : 'Tue. Oct. 5'}`;
            return (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={cn(
                  'px-5 py-2.5 rounded-lg text-sm font-semibold transition-all',
                  activeDay === day
                    ? 'bg-gradient-to-r from-rose-geo to-orange-geo text-white shadow-geo'
                    : 'text-mid-gray hover:text-white'
                )}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Type filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {types.map(({ value, labelFr, labelEn }) => (
            <button
              key={value}
              onClick={() => setActiveType(value)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
                activeType === value
                  ? 'bg-rose-geo/20 text-rose-geo border border-rose-geo/40'
                  : 'glass text-mid-gray hover:text-white border border-white/10'
              )}
            >
              {locale === 'fr' ? labelFr : labelEn}
            </button>
          ))}
        </div>

        {/* Agenda items */}
        <div>
          <h2 className="text-xl font-bold text-white mb-6">
            {locale === 'fr'
              ? activeDay === 0 ? 'Dimanche 3 octobre 2027 — Soirée d\'ouverture' : activeDay === 1 ? 'Lundi 4 octobre 2027' : 'Mardi 5 octobre 2027'
              : activeDay === 0 ? 'Sunday, October 3, 2027 — Opening Evening' : activeDay === 1 ? 'Monday, October 4, 2027' : 'Tuesday, October 5, 2027'
            }
          </h2>

          {filtered.length === 0 ? (
            <div className="glass rounded-xl p-12 text-center">
              <p className="text-mid-gray">{locale === 'fr' ? 'Aucune session pour ces filtres.' : 'No sessions for these filters.'}</p>
            </div>
          ) : (
            <div className="space-y-0">
              {filtered.map(item => (
                <AgendaItemComponent key={item.id} item={item} locale={locale} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
