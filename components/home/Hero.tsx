'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { EVENT_CONFIG } from '@/data/config';
import GeoMTLLogo from '@/components/ui/GeoMTLLogo';
import GlobeTrame from '@/components/home/GlobeTrame';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr/ArrowRight';

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const t = useTranslations('home');
  const locale = useLocale();
  const tagline = locale === 'fr' ? EVENT_CONFIG.tagline.fr : EVENT_CONFIG.tagline.en;
  const dates = locale === 'fr' ? EVENT_CONFIG.dates.fr : EVENT_CONFIG.dates.en;
  const venue = locale === 'fr' ? EVENT_CONFIG.venue.fr : EVENT_CONFIG.venue.en;

  return (
    <section className="relative overflow-hidden bg-geo-cream">
      {/* Visuel de la charte : globe en trame de points (Studio Le Séisme), animé */}
      <GlobeTrame className="absolute inset-x-0 bottom-0 top-56 sm:top-0 w-full h-[calc(100%-14rem)] sm:h-full pointer-events-none select-none" />

      <motion.div
        className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 lg:pt-28 pb-12 lg:pb-16 min-h-[88svh] flex flex-col"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.15 }}
      >
        <motion.div variants={itemVariants} className="flex items-start justify-between gap-6">
          <div className="flex flex-col md:flex-row gap-3 md:gap-16 text-geo-ink font-semibold text-base sm:text-lg leading-snug">
            <p>
              {dates}
              <br />
              {venue}
            </p>
            <p className="max-w-xs">{tagline}</p>
          </div>
          <span className="flex-shrink-0 rounded-md bg-geo-ink px-3 py-1 font-display text-xl sm:text-2xl lg:text-3xl font-bold text-geo-cream">
            2027
          </span>
        </motion.div>

        <div className="mt-auto pt-16">
          <h1 className="sr-only">GeoMTL 2027</h1>
          <motion.div variants={itemVariants}>
            <GeoMTLLogo showYear={false} className="w-full h-auto text-geo-ink" />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-8 lg:mt-10 flex flex-col sm:flex-row gap-3 justify-center items-center"
          >
            <Link
              href={`/${locale}/billetterie`}
              className="group inline-flex items-center gap-2 rounded-lg bg-geo-ink px-6 py-3 text-sm sm:text-base font-semibold text-white hover:bg-geo-ink/85 transition-colors"
            >
              {t('heroCta1')}
              <ArrowRight size={18} weight="light" className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link
              href={`/${locale}/devenir-partenaire`}
              className="inline-flex items-center rounded-lg bg-geo-ink px-6 py-3 text-sm sm:text-base font-semibold text-white hover:bg-geo-ink/85 transition-colors"
            >
              {t('heroCta2')}
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
