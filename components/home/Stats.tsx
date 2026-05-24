'use client';

import { useTranslations, useLocale } from 'next-intl';
import StatBlock from '@/components/ui/StatBlock';
import Container from '@/components/ui/Container';
import { EVENT_CONFIG } from '@/data/config';

export default function Stats() {
  const t = useTranslations('home');
  const locale = useLocale();

  const stats = [
    {
      value: EVENT_CONFIG.stats.participants,
      suffix: '+',
      label: t('statsParticipants'),
      accentColor: 'rose'
    },
    {
      value: EVENT_CONFIG.stats.days,
      label: t('statsDays'),
      accentColor: 'orange'
    },
    {
      value: EVENT_CONFIG.stats.speakers,
      suffix: '+',
      label: t('statsSpeakers'),
      accentColor: 'yellow'
    },
    {
      value: EVENT_CONFIG.stats.exhibitors,
      suffix: '+',
      label: t('statsExhibitors'),
      accentColor: 'rose'
    },
  ];

  return (
    <section className="py-20 bg-deep-blue-mid relative overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(233, 30, 140, 0.05) 0%, transparent 70%)'
        }}
      />

      <Container>
        <div className="text-center mb-12">
          <p className="text-sm font-semibold tracking-[0.2em] uppercase gradient-text mb-3">
            GeoMTL 2027
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">{t('statsTitle')}</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass rounded-2xl p-6 text-center gradient-border relative"
            >
              <StatBlock
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                accentColor={stat.accentColor}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
