'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import { Brain } from '@phosphor-icons/react/dist/ssr/Brain';
import { Cube } from '@phosphor-icons/react/dist/ssr/Cube';
import { Leaf } from '@phosphor-icons/react/dist/ssr/Leaf';
import { UsersThree } from '@phosphor-icons/react/dist/ssr/UsersThree';

const themes = [
  {
    Icon: Brain,
    titleKey: 'aiTitle' as const,
    descKey: 'aiDesc' as const,
    color: '#20FEFD',
    gradient: 'from-geo-cyan/20 to-geo-cyan/5'
  },
  {
    Icon: Cube,
    titleKey: 'twinTitle' as const,
    descKey: 'twinDesc' as const,
    color: '#01CDA5',
    gradient: 'from-geo-teal/20 to-geo-teal/5'
  },
  {
    Icon: Leaf,
    titleKey: 'envTitle' as const,
    descKey: 'envDesc' as const,
    color: '#1BC868',
    gradient: 'from-geo-green/20 to-geo-green/5'
  },
  {
    Icon: UsersThree,
    titleKey: 'aicoTitle' as const,
    descKey: 'aicoDesc' as const,
    color: '#D0DC00',
    gradient: 'from-geo-lime/20 to-geo-lime/5'
  }
];

export default function Themes() {
  const t = useTranslations('home');
  const tThemes = useTranslations('themes');

  return (
    <section className="section-spacing bg-geo-cream relative overflow-hidden topo-pattern">
      <Container>
        <SectionTitle
          eyebrow={t('themesEyebrow')}
          title={t('themesTitle')}
          subtitle={t('themesSubtitle')}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {themes.map((theme, index) => (
            <motion.div
              key={theme.titleKey}
              className={`glass-2027 rounded-2xl p-6 cursor-default bg-gradient-to-br ${theme.gradient} hover:scale-[1.02] transition-transform duration-200`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-geo-cream border border-geo-ink/10 text-geo-ink">
                  <theme.Icon size={26} weight="light" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-geo-ink mb-1">
                    {tThemes(theme.titleKey)}
                  </h3>
                  <p className="text-sm text-geo-ink-soft leading-relaxed">
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
