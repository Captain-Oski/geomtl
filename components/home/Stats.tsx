'use client';

import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import { EVENT_CONFIG } from '@/data/config';

export default function Stats() {
  const t = useTranslations('home');

  // Les quatre chiffres de la maquette du studio, ceux que l'événement
  // affichait les autres années.
  const stats = [
    { value: `${EVENT_CONFIG.stats.participants}+`, label: t('statsParticipants') },
    { value: String(EVENT_CONFIG.stats.days), label: t('statsDays') },
    { value: `${EVENT_CONFIG.stats.speakers}+`, label: t('statsSpeakers') },
    { value: `${EVENT_CONFIG.stats.exhibitors}+`, label: t('statsExhibitors') },
  ];

  return (
    <section className="py-16 lg:py-20 bg-geo-cream-dark">
      <Container>
        <div className="text-center mb-10">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-geo-ink-soft mb-2">GÉOMTL 2027</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-geo-ink font-display">{t('statsTitle')}</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl bg-gradient-geo-2027 px-6 py-8 text-center">
              <div className="text-4xl sm:text-5xl font-bold text-geo-noir font-display tabular-nums">{stat.value}</div>
              <div className="mt-2 text-xs font-semibold uppercase tracking-wider text-geo-noir">{stat.label}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
