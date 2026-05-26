'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';

const themes = [
  {
    icon: '🗂️',
    titleKey: 'dataTitle' as const,
    descKey: 'dataDesc' as const,
    color: '#e91e8c',
    gradient: 'from-rose-geo/20 to-rose-geo/5'
  },
  {
    icon: '🏙️',
    titleKey: 'smartCityTitle' as const,
    descKey: 'smartCityDesc' as const,
    color: '#ff6b35',
    gradient: 'from-orange-geo/20 to-orange-geo/5'
  },
  {
    icon: '🌿',
    titleKey: 'envTitle' as const,
    descKey: 'envDesc' as const,
    color: '#10b981',
    gradient: 'from-emerald-500/20 to-emerald-500/5'
  },
  {
    icon: '🚀',
    titleKey: 'innovTitle' as const,
    descKey: 'innovDesc' as const,
    color: '#ffd60a',
    gradient: 'from-yellow-geo/20 to-yellow-geo/5'
  },
  {
    icon: '🤖',
    titleKey: 'aiTitle' as const,
    descKey: 'aiDesc' as const,
    color: '#5b9bd5',
    gradient: 'from-blue-400/20 to-blue-400/5'
  },
  {
    icon: '🤝',
    titleKey: 'civicTitle' as const,
    descKey: 'civicDesc' as const,
    color: '#e91e8c',
    gradient: 'from-rose-geo/20 to-rose-geo/5'
  }
];

export default function Themes() {
  const t = useTranslations('home');
  const tThemes = useTranslations('themes');

  return (
    <section className="section-spacing bg-deep-blue relative overflow-hidden topo-pattern">
      <Container>
        <SectionTitle
          eyebrow={t('themesEyebrow')}
          title={t('themesTitle')}
          subtitle={t('themesSubtitle')}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {themes.map((theme, index) => (
            <motion.div
              key={theme.titleKey}
              className={`glass rounded-2xl p-6 cursor-default bg-gradient-to-br ${theme.gradient} hover:scale-[1.02] transition-transform duration-200`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: `${theme.color}20`, border: `1px solid ${theme.color}40` }}
                >
                  {theme.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    {tThemes(theme.titleKey)}
                  </h3>
                  <p className="text-sm text-mid-gray leading-relaxed">
                    {tThemes(theme.descKey)}
                  </p>
                </div>
              </div>
              <div
                className="mt-4 h-0.5 rounded-full w-full opacity-30"
                style={{ background: `linear-gradient(90deg, ${theme.color}, transparent)` }}
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
